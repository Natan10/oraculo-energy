import { ChevronsUpDown } from "lucide-react";
import { ReactNode, useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  UserInformationBill,
  UserInformationBills,
} from "../dtos/user-information-bill";
import { Button } from "@/components/ui/button";
import { InfoSectionMonthContainer } from "./info-section-by-month";
import { Bills } from "./bills";

export function InfoContainer({ value }: { value: UserInformationBills }) {
  return (
    <div className="flex flex-col gap-3">
      {Object.entries(value).map(
        (
          [key, content]: [key: string, content: UserInformationBill[]],
          index
        ) => {
          return (
            <InfoSectionByYear key={key} year={key} isOpen={index === 0}>
              <div className="">
                <Bills data={content} />
              </div>
              <div>
                <InfoSectionMonthContainer data={content} />
              </div>
            </InfoSectionByYear>
          );
        }
      )}
    </div>
  );
}

export function InfoSectionByYear({
  year,
  isOpen,
  children,
}: {
  year: string;
  children: ReactNode;
  isOpen?: boolean;
}) {
  const [open, setOpen] = useState(isOpen || false);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-full">
      <CollapsibleTrigger asChild className="flex justify-between items-center">
        <Button variant={"outline"} size={"lg"} className="w-full">
          <span className="text-base md:text-lg font-bold font-mono">
            Dados de {year}
          </span>
          <ChevronsUpDown className="h-4 w-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
}
