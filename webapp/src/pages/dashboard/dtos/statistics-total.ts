export interface StatisticsTotal {
  year: string;
  compensatedEnergy: number;
  economyGD: number;
  electricityConsumption: number;
  totalValueWithoutGD: number;
}

export interface StatisticsEnergyResult {
  year: string;
  month: string;
  meanCompensatedEnergy: number;
  meanElectricityConsumption: number;
}

export interface StatisticsFinanceResult {
  year: string;
  month: string;
  totalValueWithoutGD: number;
  economyGD: number;
}
