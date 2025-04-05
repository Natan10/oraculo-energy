import { BatteryLow, CircleDollarSign, Plug, Zap } from "lucide-react";
import { useGetStatistics } from "../hooks/use-get-statistics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/format-currency";
import { LoadCards } from "./load-cards";

export function ResumeCardSection({
  startYear,
  endYear,
}: {
  startYear: Date;
  endYear: Date | null;
}) {
  const { data, isLoading } = useGetStatistics(startYear, endYear);

  return (
    <div className="mt-6">
      {data && (
        <div className="flex items-center gap-1">
          <Zap className="text-secondary-green" size={20} />
          <p className="font-semibold text-xs md:text-sm">
            Aqui estão algumas variaveis sumarizadas para facilitar o
            entendimento
          </p>
        </div>
      )}

      {!isLoading && !data && (
        <div className="inline-flex text-primary-black items-center gap-1 bg-primary-yellow rounded p-3">
          <BatteryLow className="text-red-500" size={20} />
          <p className="font-semibold text-xs md:text-sm">
            Sem dados disponíveis para essa data. Selecione outro ano para
            consultar mais dados.
          </p>
        </div>
      )}

      {isLoading && <LoadCards />}
      {!isLoading && data && (
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Energia Total Consumida
              </CardTitle>
              <Plug />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data.electricityConsumption}
              </div>
              <p className="text-xs text-muted-foreground">Valor em KWh</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Energia Compensada
              </CardTitle>
              <Plug />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.compensatedEnergy}</div>
              <p className="text-xs text-muted-foreground">Valor em KWh</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Valor total sem GD
              </CardTitle>
              <CircleDollarSign />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(data.totalValueWithoutGD)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Economia GD</CardTitle>
              <CircleDollarSign />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(data.economyGD)}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
