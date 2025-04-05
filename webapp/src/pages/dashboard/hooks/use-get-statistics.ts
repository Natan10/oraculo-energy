import { useEffect } from "react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

import {
  StatisticsEnergyResult,
  StatisticsTotal,
} from "../dtos/statistics-total";
import { client } from "@/lib/axios";

export function useGetStatistics(startYear: Date, endYear: Date | null) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["statistics-total", startYear, endYear],
    queryFn: async () => {
      const start = startYear.getFullYear();
      const end = endYear ? endYear.getFullYear() : undefined;

      const response = await client.get<StatisticsTotal[]>(
        `/statistics/total`,
        {
          params: {
            startYear: start,
            endYear: end,
          },
        }
      );
      const { data } = response;

      if (data.length > 0) return data[0];
      return null;
    },
  });

  useEffect(() => {
    if (isError) toast.error("Erro ao carregar informações, tente novamente!");
  }, [isError]);

  return { data, isLoading };
}

export function useGetEnergyResultsByYear(
  startYear: Date,
  endYear: Date | null
) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["result-of-energy", startYear, endYear],
    queryFn: async () => {
      const start = startYear.getFullYear();
      const end = endYear ? endYear.getFullYear() : undefined;
      const result = await client.get<StatisticsEnergyResult[]>(
        `/statistics/energy-results`,
        {
          params: {
            startYear: start,
            endYear: end,
          },
        }
      );
      const { data } = result;
      return data;
    },
  });

  useEffect(() => {
    if (isError) toast.error("Erro ao carregar informações, tente novamente!");
  }, [isError]);

  return { energyResults: data, isLoadingEnergyResults: isLoading };
}

export function useGetFinanceResultsByYear(
  startYear: Date,
  endYear: Date | null
) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["result-finance", startYear, endYear],
    queryFn: async () => {
      const start = startYear.getFullYear();
      const end = endYear ? endYear.getFullYear() : undefined;

      const result = await client.get<StatisticsEnergyResult[]>(
        `/statistics/finance-results`,
        {
          params: {
            startYear: start,
            endYear: end,
          },
        }
      );
      const { data } = result;
      return data;
    },
  });

  useEffect(() => {
    if (isError) toast.error("Erro ao carregar informações, tente novamente!");
  }, [isError]);

  return { financeResults: data, isLoadingFinanceResults: isLoading };
}
