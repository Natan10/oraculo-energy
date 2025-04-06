import { Link } from "react-router";
import { UserInformationBill } from "../dtos/user-information-bill";
import { FileText } from "lucide-react";

export function Bills({ data }: { data: UserInformationBill[] }) {
  const bills = data.map((record) => ({
    id: record.id,
    path: record.filePath,
    month: record.month,
  }));

  return (
    <div className="py-3">
      <h2 className="text-base md:text-lg font-mono font-semibold">Faturas</h2>
      <div className="mt-1 flex items-center gap-6 flex-wrap">
        {bills.map((bill) => {
          return (
            <Link key={bill.id} to={bill.path} className="flex flex-col gap-1">
              <FileText />
              <p className="text-xs font-bold font-mono">{bill.month}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
