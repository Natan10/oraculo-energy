import { client } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

interface UserBasicInfo {
  id: string;
  clientNumber: string;
  installNumber: string;
}

export function useGetUsers() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await client.get<UserBasicInfo[]>("/users");
      return res.data;
    },
  });

  useEffect(() => {
    if (isError) toast.error("Erro ao carregar usuários, tente novamente!");
  }, [isError]);

  return { users: data, isLoading };
}
