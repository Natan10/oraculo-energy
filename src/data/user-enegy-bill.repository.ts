import { PrismaClient, UserInformationBill } from "@prisma/client";
import { UserEnergyBill } from "../domain/user-energy-bill.js";

interface IUserEnergyBillRepository {
  create: (record: UserEnergyBill) => Promise<void>;
  createMany: (record: UserEnergyBill[]) => Promise<void>;
}

export class UserEnergyBillRepository implements IUserEnergyBillRepository {
  constructor(private readonly client: PrismaClient) {}

  async create(record: UserEnergyBill) {
    const payload = this.mapDomainToData(record);

    await this.client.userInformationBill.create({
      data: payload,
    });
  }

  async createMany(records: UserEnergyBill[]) {
    await this.client.userInformationBill.createMany({
      data: records.map(this.mapDomainToData),
    });
  }

  mapDomainToData(data: UserEnergyBill) {
    const payload = data.returnValues();

    return {
      installNumber: payload.installNumber,
      clientNumber: payload.clientNumber,
      month: payload.month,
      year: payload.year,
      economyGD: payload.economyGD,
      compensatedEnergy: payload.compensatedEnergy,
      electricityConsumption: payload.electricityConsumption,
      totalValueWithoutGD: payload.totalValueWithoutGD,
      electricityICMSQuantity: payload.electricityICMS?.quantity,
      electricityICMSValue: payload.electricityICMS?.value,
      electricityQuantity: payload.electricity?.quantity,
      electricityValue: payload.electricity?.value,
      publicContrib: payload.publicContrib,
      filePath: payload.filePath,
    };
  }
}
