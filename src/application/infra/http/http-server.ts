import express from "express";
import cors from "cors";
import { router } from "./routes.js";

import "dotenv/config";

export async function runApplication(port: number) {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(router);

  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
}
