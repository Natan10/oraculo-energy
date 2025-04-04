import { prisma } from "../../lib/prisma.js";
import { Pagination } from "./dtos/pagination.js";
import { UserBillFileDto } from "./dtos/user-bill-file.js";
import { UserEnergyBillDto } from "./dtos/user-energy-bill.js";

type FilterOptions = {
  clientNumber?: string;
  installNumber?: string;
  year?: string;
  page: number;
  pageSize: number;
};

async function filterBillsByOptions(
  options: FilterOptions
): Promise<Pagination<UserEnergyBillDto>> {
  const { page, pageSize, clientNumber, installNumber, year } = options;

  const total = await prisma.userInformationBill.count();
  const records = await prisma.userInformationBill.findMany({
    where: {
      year: year,
      installNumber: installNumber,
      clientNumber: clientNumber,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const hasNextPage = page * pageSize < total;

  const data = await Promise.all(
    records.map(async (e) => {
      const userFiles = e.clientNumber
        ? await getUserBills(e.clientNumber)
        : [];

      return {
        id: e.id,
        clientNumber: e.clientNumber,
        installNumber: e.installNumber,
        compensatedEnergy: e.compensatedEnergy,
        economyGD: e.economyGD,
        electricityConsumption: e.electricityConsumption,
        electricityICMSQuantity: e.electricityICMSQuantity,
        electricityICMSValue: e.electricityICMSValue,
        electricityQuantity: e.electricityQuantity,
        electricityValue: e.electricityValue,
        totalValueWithoutGD: e.totalValueWithoutGD,
        month: e.month,
        year: e.year,
        publicContrib: e.publicContrib,
        files: userFiles,
      } as UserEnergyBillDto;
    })
  );

  return {
    data,
    hasNextPage,
    page: options.page,
    pageSize: options.pageSize,
    totalItems: total,
  };
}

async function getUserBills(clientNumber: string) {
  const records = await prisma.userInformationBill.findMany({
    where: {
      clientNumber,
    },
    select: {
      clientNumber: true,
      filePath: true,
      month: true,
      year: true,
    },
  });

  return records as UserBillFileDto[];
}

export { getUserBills, filterBillsByOptions };
