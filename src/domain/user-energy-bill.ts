type UserEnergyBillParams = {
  clientNumber: string | null;
  installNumber: string | null;
  referenceMonth: string | null;
  electricity: { quantity: number; value: number } | null;
  electricityICMS: { quantity: number; value: number } | null;
  electricityGD: { quantity: number; value: number } | null;
  publicContrib: number | null;
  filePath: string;
};

export class UserEnergyBill {
  #clientNumber: string | null = null;
  #installNumber: string | null = null;
  #month: string | null = null;
  #year: string | null = null;
  #electricity: { quantity: number; value: number } | null = null;
  #electricityICMS: { quantity: number; value: number } | null = null;
  #electricityGD: { quantity: number; value: number } | null = null;
  #publicContrib: number | null = null;

  #electricityConsumption: number;
  #compensatedEnergy: number;
  #totalValueWithoutGD: number;
  #economyGD: number;

  #filePath: string;

  constructor(params: UserEnergyBillParams) {
    this.#clientNumber = params.clientNumber;
    this.#installNumber = params.installNumber;
    this.#publicContrib = params.publicContrib;
    this.#filePath = params.filePath;

    if (params.referenceMonth) {
      const [month, year] = this.#extractInfoFromReferenceMonth(
        params.referenceMonth
      );
      this.#month = month;
      this.#year = year;
    }

    this.#electricity = params.electricity;
    this.#electricityGD = params.electricityGD;
    this.#electricityICMS = params.electricityICMS;

    this.#electricityConsumption = this.#calcTotalConsumption();
    this.#compensatedEnergy = this.#electricityGD?.quantity ?? 0; // kwh
    this.#economyGD = this.#electricityGD?.value ?? 0; // R$
    this.#totalValueWithoutGD = this.#calcTotalValue();
  }

  #extractInfoFromReferenceMonth(value: string) {
    return value.split("/");
  }

  #calcTotalConsumption() {
    return (
      (this.#electricity?.quantity ?? 0) +
      (this.#electricityICMS?.quantity ?? 0)
    );
  }

  #calcTotalValue() {
    return (
      (this.#electricity?.value ?? 0) +
      (this.#electricityICMS?.value ?? 0) +
      (this.#publicContrib ?? 0)
    );
  }

  returnValues() {
    return {
      clientNumber: this.#clientNumber,
      installNumber: this.#installNumber,
      month: this.#month,
      year: this.#year,
      publicContrib: this.#publicContrib,
      electricity: this.#electricity,
      electricityICMS: this.#electricityICMS,
      electricityConsumption: this.#electricityConsumption,
      compensatedEnergy: this.#compensatedEnergy,
      totalValueWithoutGD: this.#totalValueWithoutGD,
      economyGD: this.#economyGD,
      filePath: this.#filePath,
    };
  }
}
