import { prisma } from "../../lib/prisma.js";

async function getEnergyResultsByYear(year: string) {
  const results = await prisma.userInformationBill.findMany({
    where: {
      year,
    },
    select: {
      compensatedEnergy: true,
      electricityConsumption: true,
    },
  });

  return results;
}

async function getFinanceResultsByYear(year: string) {
  const results = await prisma.userInformationBill.findMany({
    where: {
      year,
    },
    select: {
      totalValueWithoutGD: true,
      economyGD: true,
    },
  });

  return results;
}

async function getCumulativeTotalByYear(year: string) {
  const results = await prisma.userInformationBill.groupBy({
    by: "year",
    where: {
      year,
    },
    _sum: {
      electricityConsumption: true, // Kwh
      compensatedEnergy: true, // Kwh
      economyGD: true, // R$
      totalValueWithoutGD: true, // R$
    },
  });

  return results.map((result) => {
    const {
      compensatedEnergy,
      economyGD,
      electricityConsumption,
      totalValueWithoutGD,
    } = result._sum;

    return {
      year: result.year,
      compensatedEnergy,
      economyGD,
      electricityConsumption,
      totalValueWithoutGD,
    };
  });
}

export {
  getEnergyResultsByYear,
  getFinanceResultsByYear,
  getCumulativeTotalByYear,
};
