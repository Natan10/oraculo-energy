import path from "path";
import { fileURLToPath } from "url";
import { describe, it, expect } from "@jest/globals";

import { ProcessFileService } from "../src/application/services/process-file-service.js";
import { UserEnergyBillProcessor } from "../src/application/services/processors/raw-energy-info-processor.js";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const BASE_PATH = path.join(__dirname, "./faturas");

function factory() {
  const processFileService = new ProcessFileService(BASE_PATH);
  const energyProcessor = new UserEnergyBillProcessor(processFileService);
  return { energyProcessor };
}

describe("UserEnergyBillProcessor", () => {
  it("Should be able to collect pdf informations", async () => {
    const { energyProcessor } = factory();
    const content = await energyProcessor.process({});
    expect(content).toStrictEqual(RawUserEnergyBillDto);
  });
});

// mock
const RawUserEnergyBillDto = [
  {
    electricity: {
      quantity: 100,
      value: 95.52,
    },
    electricityGD: {
      quantity: 2300,
      value: -1120.85,
    },
    electricityICMS: {
      quantity: 2300,
      value: 1172.31,
    },
    filePath:
      "C:\\Users\\ACT\\Documents\\Estudo\\node\\energy-bill-extractor\\tests\\faturas\\Instalação_3001422762\\3001422762-01-2024.pdf",
    installNumber: "3001422762",
    numberClient: "7202210726",
    publicContrib: 40.45,
    referenceMonth: "JAN/2024",
  },
];
