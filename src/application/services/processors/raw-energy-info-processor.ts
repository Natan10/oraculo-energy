import { ProcessFileService } from "../process-file-service.js";
import { IInformationProcessor } from "../process-information.js";

interface RawUserEnergyBillDto {
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

class UserEnergyBillProcessor
  implements IInformationProcessor<RawUserEnergyBillDto>
{
  constructor(private readonly processFileService: ProcessFileService) {}

  async process() {
    const paths = this.processFileService.getPaths();
    const rawObjects: RawUserEnergyBillDto[] = [];

    for (const path of paths) {
      const content = await this.processFileService.readFile(path);
      rawObjects.push(this.#mapTo(content, path));
    }

    return rawObjects;
  }

  #mapTo(content: string[], path: string) {
    const referenceMonth = this.#getReferenceMonth(content);
    const numberClient = this.#getNumberOfClient(content);
    const installNumber = this.#getInstalationNumber(content);
    const electricity = this.#getElectricityEnergy(content);
    const electricityICMS = this.#getElectricityICMS(content);
    const publicContrib = this.#getPublicContribution(content);
    const electricityGD = this.#getEnergyGD(content);

    const payload: RawUserEnergyBillDto = {
      electricity,
      referenceMonth,
      electricityGD,
      electricityICMS,
      numberClient,
      installNumber,
      publicContrib,
      filePath: path,
    };

    return payload;
  }

  #getReferenceMonth(content: string[]) {
    const regex = /Referente a/i;
    const indexTitle = content.findIndex((i) => regex.test(i));

    if (indexTitle < 0) return null;

    const value = content[indexTitle + 1];

    const sanitizedValue = this.#sanitizeSimple(value);
    const [referenceMonth] = sanitizedValue.split("*");

    return referenceMonth;
  }

  #getNumberOfClient(content: string[]) {
    const regex = /Nº DO CLIENTE/i;
    const indexTitle = content.findIndex((i) => regex.test(i));

    if (indexTitle < 0) return null;

    const value = content[indexTitle + 1];

    const sanitizedValue = this.#sanitizeSimple(value);
    const [numberOfClient] = sanitizedValue.split("*");

    return numberOfClient;
  }

  #getInstalationNumber(content: string[]) {
    const regex = /Nº DA INSTALAÇÃO/i;
    const indexTitle = content.findIndex((i) => regex.test(i));

    if (indexTitle < 0) return null;

    const value = content[indexTitle + 1];

    const sanitizedValue = this.#sanitizeSimple(value);
    const [, installNumber] = sanitizedValue.split("*");

    return installNumber;
  }

  #getElectricityEnergy(content: string[]) {
    const regex = /Energia Elétrica/i;
    const line = content.find((i) => regex.test(i));

    if (!line) return null;

    const sanitizedValue = this.#sanitizeMultiple(line);
    const [, , quantity, , value] = sanitizedValue.split("*");

    return {
      quantity: Number(this.#clearValue(quantity)),
      value: Number(this.#clearValue(value)),
    };
  }

  #getElectricityICMS(content: string[]) {
    const regex = /Energia SCEE s\/ ICMS/i;

    const line = content.find((i) => regex.test(i));

    if (!line) return null;

    const sanitizedValue = this.#sanitizeMultiple(line);
    const [, , , , quantity, , value] = sanitizedValue.split("*");

    return {
      quantity: Number(this.#clearValue(quantity)),
      value: Number(this.#clearValue(value)),
    };
  }

  #getEnergyGD(content: string[]) {
    const regex = /Energia compensada/i;
    const line = content.find((i) => regex.test(i));

    if (!line) return null;

    const sanitizedValue = this.#sanitizeMultiple(line);
    const [, , , , quantity, , value] = sanitizedValue.split("*");
    return {
      quantity: Number(this.#clearValue(quantity)),
      value: Number(this.#clearValue(value)),
    };
  }

  #getPublicContribution(content: string[]) {
    const regex = /Contrib Ilum Publica Municipal/i;
    const line = content.find((i) => regex.test(i));

    if (!line) return null;

    const sanitizedValue = this.#sanitizeSimple(line);
    const [, , , , value] = sanitizedValue.split("*");
    return Number(this.#clearValue(value));
  }

  #clearValue(value: string) {
    return value.replace(/\./g, "").replace(",", ".");
  }

  #sanitizeSimple(value: string) {
    return value.trim().replace(/\s+/g, "*");
  }

  #sanitizeMultiple(value: string) {
    const newValue = value.trim().replace(/\s+/g, "*");
    return newValue;
  }
}

export { UserEnergyBillProcessor };
