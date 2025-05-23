import { ProcessFileService } from "../process-file-service.js";
import { IInformationProcessor } from "../process-information.js";
import { RawUserEnergyBillDto } from "../raw-energy-bill-dto.js";
import { CommonInfoProcessor } from "./common-info-processor.js";

class UserEnergyBillProcessor
  extends CommonInfoProcessor
  implements IInformationProcessor<RawUserEnergyBillDto>
{
  constructor(private readonly processFileService: ProcessFileService) {
    super();
  }

  async process({ bucket, key }: { bucket?: string; key?: string }) {
    const paths = this.processFileService.getPaths();
    const rawObjects: RawUserEnergyBillDto[] = [];

    for (const path of paths) {
      const content = await this.processFileService.readFile(path);
      rawObjects.push(this.mapTo(content, path));
    }

    return rawObjects;
  }
}

export { UserEnergyBillProcessor };
