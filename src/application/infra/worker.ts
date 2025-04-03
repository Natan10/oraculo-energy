import path from "path";
import { __dirname, __filename } from "../index.js";

import "dotenv/config";

import { ProcessFileService } from "../services/process-file-service.js";
import { UserEnergyBillProcessor } from "../services/processors/raw-energy-info-processor.js";
import { UserEnergyBillRepository } from "../../data/user-enegy-bill.repository.js";
import { UserEnergyBill } from "../../domain/user-energy-bill.js";
import { prisma } from "../../lib/prisma.js";
import { logger } from "../../lib/logger.js";

const BASE_PATH = path.join(__dirname, "./../faturas");

async function saveInformationsOnDatabase() {
  const userInformationBillRepository = new UserEnergyBillRepository(prisma);
  const processFileService = new ProcessFileService(BASE_PATH);
  const energyProcessor = new UserEnergyBillProcessor(processFileService);

  const results = await energyProcessor.process();

  logger.info(null, "processed files");

  const records = results.map((result) => {
    const data = new UserEnergyBill({
      electricity: result.electricity,
      electricityGD: result.electricityGD,
      electricityICMS: result.electricityICMS,
      clientNumber: result.numberClient,
      installNumber: result.installNumber,
      publicContrib: result.publicContrib,
      referenceMonth: result.referenceMonth,
      filePath: result.filePath,
    });

    return data;
  });

  try {
    logger.info(null, "starting save records on database");
    await userInformationBillRepository.createMany(records);
    logger.info(null, "records saved successfully");
  } catch (err) {
    console.error(err);
    logger.error(null, "error to save records on database");
  }
}

await saveInformationsOnDatabase();
