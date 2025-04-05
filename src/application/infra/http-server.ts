import express from "express";
import cors from "cors";

import "dotenv/config";

import { router } from "./http-routes.js";

/* 
TODO: Config inicial ✅
TODO: Config Prisma ✅
TODO: Config Docker

TODO: Business Rules
  - Ler Arquivos ✅
  - Ler PDF ✅
  - Extrair Info ✅
  - Criar Classes ✅

TODO: Worker pulling AWS Sqs

TODO: Refact do codigo
*/

export async function runApplication(port: number) {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(router);

  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
}
