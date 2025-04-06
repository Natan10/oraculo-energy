import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/ui/data-table";
import { BillTable } from "../dtos/bills-table";
import { Button } from "@/components/ui/button";

export function Table({
  setClientNumber,
  data,
}: {
  data: BillTable[];
  setClientNumber: (clientNumber: string) => void;
}) {
  const columns: ColumnDef<BillTable>[] = [
    {
      accessorKey: "clientNumber",
      header: "Nº do Cliente",
    },
    {
      accessorKey: "installNumber",
      header: "Nº da Instalação",
    },
    {
      accessorKey: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const record = row.original;
        return (
          <Button
            className="cursor-pointer"
            onClick={() => setClientNumber(record.clientNumber)}
          >
            Ver detalhes
          </Button>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
