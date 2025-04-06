export interface UserInformationBill {
  id: string;
  clientNumber: string;
  installNumber: string;
  month: string; // "JAN", "FEB", etc.
  monthNumber: number; // 1–12
  year: string; // could also be number if you prefer
  electricityConsumption: number;
  totalValueWithoutGD: number;
  economyGD: number;
  compensatedEnergy: number;
  electricityValue: number;
  electricityQuantity: number;
  electricityICMSValue: number;
  electricityICMSQuantity: number;
  publicContrib: number;
  filePath: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO dat
}

export interface UserInformationBills {
  [year: string]: UserInformationBill[];
}
