import { Job, Queue, Worker } from "bullmq";
import { pollMessagesJob } from "./job.js";

import "dotenv/config";

const QUEUE_NAME = "bills";
const connection = {
  host: "localhost",
  port: 6379,
};

const workerQueue = new Queue(QUEUE_NAME, {
  connection: connection,
});

await workerQueue.add(
  "save-bills",
  {},
  {
    repeat: {
      every: 10000,
    },
  }
);

const saveBillsWorker = new Worker(
  QUEUE_NAME,
  async (job: Job) => {
    if (job.name === "save-bills") {
      await pollMessagesJob(job);
    }
  },
  {
    connection: connection,
  }
);
