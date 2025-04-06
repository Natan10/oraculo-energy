import { Job } from "bullmq";
import { logger } from "../../../lib/logger.js";
import {
  DeleteMessageCommand,
  ReceiveMessageCommand,
} from "@aws-sdk/client-sqs";

import { sqsClient } from "../../../lib/aws.js";
import { ProcessFileService } from "../../services/process-file-service.js";
import { WorknerEnergyInfoProcessor } from "../../services/processors/worker-energy-info-processor.js";
import { UserEnergyBillRepository } from "../../../data/user-enegy-bill.repository.js";
import { prisma } from "../../../lib/prisma.js";
import { UserEnergyBill } from "../../../domain/user-energy-bill.js";

async function pollMessagesJob(job: Job) {
  logger.info(`[start pooling job]: id:${job.id} timestamp: ${job.timestamp}`);
  try {
    const command = new ReceiveMessageCommand({
      QueueUrl: process.env.AWS_SQS_URL,
      MaxNumberOfMessages: 10,
      WaitTimeSeconds: 20,
      MessageAttributeNames: ["All"],
    });

    const response = await sqsClient.send(command);

    if (response.Messages) {
      const processFileService = new ProcessFileService("");
      const workerProcessor = new WorknerEnergyInfoProcessor(
        processFileService
      );
      const userInformationBillRepository = new UserEnergyBillRepository(
        prisma
      );

      const promises = response.Messages.map(async (message) => {
        if (!message.Body) {
          logger.info(`[ended job]: id:${job.id} timestamp: ${job.timestamp}`);
          return;
        }

        const payload = parseMessage(message.Body);
        const [fileData] = await workerProcessor.process({
          bucket: payload.bucket,
          key: payload.fileName,
        });

        const data = new UserEnergyBill({
          electricity: fileData.electricity,
          electricityGD: fileData.electricityGD,
          electricityICMS: fileData.electricityICMS,
          clientNumber: fileData.numberClient,
          installNumber: fileData.installNumber,
          publicContrib: fileData.publicContrib,
          referenceMonth: fileData.referenceMonth,
          filePath: payload.path,
        });

        await userInformationBillRepository.create(data);
        if (message.ReceiptHandle) await removeMessage(message.ReceiptHandle);
      });

      await Promise.allSettled(promises);
    }
    logger.info(`end pooling job: ${Date.now()}`);
  } catch (e: any) {
    console.error(e);
    logger.error(`error pooling job: ${e.message} `);
  }
}

async function removeMessage(receiptHandler: string) {
  const command = new DeleteMessageCommand({
    QueueUrl: process.env.AWS_SQS_URL,
    ReceiptHandle: receiptHandler,
  });
  await sqsClient.send(command);
}

function parseMessage(payload: string) {
  const messagePayload = JSON.parse(payload) as {
    bucket: string;
    fileName: string;
    path: string;
  };

  return messagePayload;
}

export { pollMessagesJob };
