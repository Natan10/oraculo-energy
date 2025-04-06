import { client } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { UserInformationBills } from "../dtos/user-information-bill";

type Props = {
  clientNumber: string | null;
  start: string | null;
  end: string | null;
  months: string[] | null;
};

export function useGetUserInformation({
  clientNumber,
  start,
  end,
  months,
}: Props) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "user-information",
      {
        clientNumber,
        start,
        end,
        months,
      },
    ],
    queryFn: async () => {
      if (!clientNumber) return;

      const urlSearch = new URLSearchParams();

      if (start) urlSearch.set("start", start);
      if (end) urlSearch.set("end", end);
      if (months) months.map((month) => urlSearch.append("month", month));

      const res = await client.get<{ data: UserInformationBills }>(
        `/users/${clientNumber}?${urlSearch.toString()}`
      );

      const { data } = res;
      return data.data;
    },
    enabled: !!clientNumber,
    gcTime: 0,
    staleTime: 0,
  });

  useEffect(() => {
    if (isError)
      toast.error(`Erro ao carregar informações do cliente: ${clientNumber}.`);
  }, [isError]);

  return { userDataInformation: data, isLoading };
}
