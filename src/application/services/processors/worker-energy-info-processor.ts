import { ProcessFileService } from "../process-file-service.js";
import { IInformationProcessor } from "../process-information.js";
import { RawUserEnergyBillDto } from "../raw-energy-bill-dto.js";
import { CommonInfoProcessor } from "./common-info-processor.js";

export class WorknerEnergyInfoProcessor
  extends CommonInfoProcessor
  implements IInformationProcessor<RawUserEnergyBillDto>
{
  constructor(private readonly processFileService: ProcessFileService) {
    super();
  }

  async process({ bucket, key }: { bucket?: string; key?: string }) {
    if (!bucket || !key) return [];

    const content = await this.processFileService.getFileFromS3({
      bucket,
      key,
    });
    const fileContent = this.mapTo(content, "");
    return [fileContent];
  }
}
