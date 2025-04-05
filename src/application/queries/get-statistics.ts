import { prisma } from "../../lib/prisma.js";
import { mapMonth, monthMapping } from "../../utils/month-maping.js";

async function getEnergyResultsByYear(startYear: string, endYear?: string) {
  const results = await prisma.userInformationBill.groupBy({
    by: ["monthNumber"],
    where: {
      year: {
        gte: startYear,
        lte: endYear || startYear,
      },
    },
    _avg: {
      compensatedEnergy: true,
      electricityConsumption: true,
    },
    orderBy: {
      monthNumber: "asc",
    },
  });

  return results.map((result) => {
    const month = mapMonth(result.monthNumber ?? -1);

    return {
      year: startYear,
      month: month,
      meanCompensatedEnergy: result._avg.compensatedEnergy,
      meanElectricityConsumption: result._avg.electricityConsumption,
    };
  });
}

async function getFinanceResultsByYear(startYear: string, endYear?: string) {
  const results = await prisma.userInformationBill.groupBy({
    by: ["monthNumber"],
    where: {
      year: {
        gte: startYear,
        lte: endYear || startYear,
      },
    },
    _avg: {
      totalValueWithoutGD: true,
      economyGD: true,
    },
    orderBy: {
      monthNumber: "asc",
    },
  });

  return results.map((result) => {
    const month = mapMonth(result.monthNumber ?? -1);

    return {
      month: month,
      totalValueWithoutGD: result._avg.totalValueWithoutGD,
      economyGD: result._avg.economyGD,
    };
  });
}

async function getCumulativeTotalByYear(startYear: string, endYear?: string) {
  const results = await prisma.userInformationBill.groupBy({
    by: "year",
    where: {
      year: {
        gte: startYear,
        lte: endYear,
      },
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
