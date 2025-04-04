import { UserBillFileDto } from "./user-bill-file.js";

export type UserEnergyBillDto = {
  id: string;
  clientNumber: string;
  installNumber: string;
  month: string;
  year: string;
  electricityConsumption: number;
  totalValueWithoutGD: number;
  economyGD: number;
  compensatedEnergy: number;
  electricityValue: number;
  electricityQuantity: number;
  electricityICMSValue: number;
  electricityICMSQuantity: number;
  publicContrib: number;
  files: UserBillFileDto[];
};
