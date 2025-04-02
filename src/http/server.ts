import express from "express";
import cors from "cors";
import pdf from "pdf-parse-debugging-disabled";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import "dotenv/config";
import { ProcessFileService } from "../services/process-file-service.js";
import { EnergyBillProcessor } from "../services/processors/raw-energy-info-processor.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* 
TODO: Config inicial ✅
TODO: Config Prisma ✅
TODO: Config Docker

TODO: Business Rules
  - Ler Arquivos ✅
  - Ler PDF ✅
  - Extrair Info ✅
  - Criar Classes

TODO: Refact do codigo
*/

const BASE_PATH = path.join(__dirname, "../faturas");

const processFileService = new ProcessFileService(BASE_PATH);
const energyProcessor = new EnergyBillProcessor(processFileService);

const result = await energyProcessor.process();

console.log(result);

/*
  Nº DO CLIENTE
  Referente a  - Mes de referencia
  Energia Elétrica - Quantidade(KWH) e Valor(R$)
  Energia SCEE s/ ICMS - Quantidade(KWH) e Valor(R$)
  Energia compensada GD I - Quantidade(KWH) e Valor(R$)
  Contrib Ilum Publica Municipal - Valor(R$)
*/

/** SERVER */
// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors());
// app.use(express.json());

// app.get("/hello", (_, res) => {
//   return res.json({ message: "hello" });
// });

// app.listen(PORT, () => {
//   console.log(`server running on port ${PORT}`);
// });
