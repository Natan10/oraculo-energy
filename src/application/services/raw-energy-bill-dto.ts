export interface RawUserEnergyBillDto {
  numberClient: string | null;
  installNumber: string | null;
  referenceMonth: string | null;
  electricity: {
    quantity: number;
    value: number;
  } | null; // Energia eletrica
  electricityICMS: {
    quantity: number;
    value: number;
  } | null; // Energia SCEEE s/ICMS
  electricityGD: {
    quantity: number;
    value: number;
  } | null; // Energia compensada GD
  publicContrib: number | null; // Iluminacao publica
  filePath: string;
}
