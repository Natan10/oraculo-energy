import { prisma } from "../../lib/prisma.js";
import { monthMapping } from "../../utils/month-maping.js";

async function getAllUsers() {
  const records = await prisma.userInformationBill.findMany({
    distinct: ["clientNumber", "installNumber"],
    select: {
      id: true,
      clientNumber: true,
      installNumber: true,
    },
    orderBy: {
      year: "desc",
    },
  });

  return records;
}

async function getUserBills({
  clientNumber,
  startYear,
  endYear,
  months,
}: {
  clientNumber: string;
  startYear?: string;
  endYear?: string;
  months?: number[];
}) {
  const allMonths = Object.values(monthMapping);

  const records = await prisma.userInformationBill.findMany({
    where: {
      clientNumber,
      year: {
        gte: startYear,
        lte: endYear,
      },
      monthNumber: {
        in: months || allMonths,
      },
    },
    orderBy: {
      year: "desc",
    },
  });

  return records.reduce((acc: any, item) => {
    const key = item.year;
    if (!acc[key!]) acc[key!] = [];
    acc[key!].push(item);
    return acc;
  }, {});
}

export { getUserBills, getAllUsers };
