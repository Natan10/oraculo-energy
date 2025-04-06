import { DollarSign, Zap } from "lucide-react";

import { InfoContent } from "@/components/info-content";
import { formatCurrency } from "@/utils/format-currency";
import { UserInformationBill } from "../dtos/user-information-bill";
import { Separator } from "@/components/ui/separator";

export function InfoSectionByMonth({ data }: { data: UserInformationBill }) {
  return (
    <div className="">
      <div className="py-3 grid grid-cols-3 md:grid-cols-6 gap-3">
        <InfoContent title="Mês" value={`${data.month}`} />
        <InfoContent
          title="Consumo"
          icon={<Zap size={12} className="text-primary-yellow" />}
          value={`${data.electricityConsumption} KWh`}
        />

        <InfoContent
          title="Energia Compensada"
          icon={<Zap size={12} className="text-primary-yellow" />}
          value={`${data.compensatedEnergy} KWh`}
        />

        <InfoContent
          title="Valor total sem GD"
          icon={<DollarSign size={12} className="text-primary-green" />}
          value={`${formatCurrency(data.totalValueWithoutGD)}`}
        />

        <InfoContent
          title="Economia GD"
          icon={<DollarSign size={12} className="text-primary-green" />}
          value={`${formatCurrency(data.economyGD)}`}
        />

        <InfoContent
          title="Contribuição Pública"
          icon={<DollarSign size={12} className="text-primary-green" />}
          value={`${formatCurrency(data.publicContrib)}`}
        />
      </div>
    </div>
  );
}

export function InfoSectionMonthContainer({
  data,
}: {
  data: UserInformationBill[];
}) {
  return (
    <div className="py-3">
      <h2 className="text-base md:text-lg font-mono font-semibold">
        Informativos
      </h2>
      {data.map((info, index) => (
        <>
          <InfoSectionByMonth key={info.id} data={info} />
          {index < data.length - 1 && <Separator className="h-1 w-full" />}
        </>
      ))}
    </div>
  );
}
