import { describe, it, expect } from "@jest/globals";

import { UserEnergyBill } from "../src/domain/user-energy-bill.js";

describe("UserEnergyBill", () => {
  it("Should be to calculate aggregate values", async () => {
    const [data] = rawUserEnergyBillDto;

    const userEnergyBill = new UserEnergyBill({
      electricity: data.electricity,
      electricityGD: data.electricityGD,
      electricityICMS: data.electricityICMS,
      clientNumber: data.numberClient,
      installNumber: data.installNumber,
      publicContrib: data.publicContrib,
      referenceMonth: data.referenceMonth,
      filePath: data.filePath,
    });

    const {
      electricityConsumption,
      compensatedEnergy,
      economyGD,
      totalValueWithoutGD,
    } = userEnergyBill.returnValues();

    expect(electricityConsumption).toEqual(2400);
    expect(totalValueWithoutGD).toEqual(1308.28);
    expect(compensatedEnergy).toEqual(2300);
    expect(economyGD).toEqual(1120.85);
  });
});

// mock
const rawUserEnergyBillDto = [
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
