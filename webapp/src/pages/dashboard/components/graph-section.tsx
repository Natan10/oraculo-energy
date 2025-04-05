import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  useGetEnergyResultsByYear,
  useGetFinanceResultsByYear,
} from "../hooks/use-get-statistics";
import { GraphLoad } from "./graph-load";

export function GraphSection({
  startYear,
  endYear,
}: {
  startYear: Date;
  endYear: Date | null;
}) {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <EnergyGraph startYear={startYear} endYear={endYear} />
      <FinanceGraph startYear={startYear} endYear={endYear} />
    </div>
  );
}

function EnergyGraph({
  startYear,
  endYear,
}: {
  startYear: Date;
  endYear: Date | null;
}) {
  const { energyResults, isLoadingEnergyResults } = useGetEnergyResultsByYear(
    startYear,
    endYear
  );

  const resultOfEneryConfig = {
    meanCompensatedEnergy: {
      label: "Energia Compensada",
      color: "#00a896",
    },
    meanElectricityConsumption: {
      label: "Consumo",
      color: "#02c39b",
    },
  } satisfies ChartConfig;

  return (
    <>
      {energyResults && energyResults.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Consumo de Energia Elétrica x Energía Compensada (KWh)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={resultOfEneryConfig}
              className="h-[300px] w-full"
            >
              <BarChart accessibilityLayer data={energyResults}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                  dataKey="meanCompensatedEnergy"
                  fill="var(--primary-green)"
                  radius={4}
                />
                <Bar
                  dataKey="meanElectricityConsumption"
                  fill="var(--secondary-green)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      {isLoadingEnergyResults && <GraphLoad />}
    </>
  );
}

function FinanceGraph({
  startYear,
  endYear,
}: {
  startYear: Date;
  endYear: Date | null;
}) {
  const { financeResults, isLoadingFinanceResults } =
    useGetFinanceResultsByYear(startYear, endYear);

  const financeConfig = {
    totalValueWithoutGD: {
      label: "ValorSemGD",
      color: "var(--chart-1)",
    },
    economyGD: {
      label: "EconomiaGD",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  return (
    <>
      {financeResults && financeResults.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Valor Total sem GD vs Economia GD (R$)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={financeConfig} className="h-[300px] w-full">
              <LineChart
                accessibilityLayer
                data={financeResults}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line
                  dataKey="totalValueWithoutGD"
                  type="monotone"
                  stroke="var(--color-totalValueWithoutGD)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="economyGD"
                  type="monotone"
                  stroke="var(--color-economyGD)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      {isLoadingFinanceResults && <GraphLoad />}
    </>
  );
}
