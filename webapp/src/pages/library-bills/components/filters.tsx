/* eslint-disable @typescript-eslint/no-explicit-any */
import { Trash } from "lucide-react";
import DatePicker from "react-datepicker";
import { useSearchParams } from "react-router";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { monthMapping } from "@/utils/month-mapping";

export function Filters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const months = searchParams.getAll("month");

  function handleMonths(values: string[]) {
    const newURLParams = new URLSearchParams(searchParams);
    removeKeyFromUrl("month", newURLParams);
    values.map((month) => newURLParams.append("month", month));
    setSearchParams(newURLParams);
  }

  function clearParam(key: string) {
    const urlSearchParams = new URLSearchParams(searchParams);
    removeKeyFromUrl(key, urlSearchParams);
    setSearchParams(urlSearchParams);
  }

  function addAllMonths() {
    const values = Object.values(monthMapping).map(String);
    handleMonths(values);
  }

  function handleDates([startDate, endDate]: any) {
    const newURLParams = new URLSearchParams(searchParams);
    removeKeyFromUrl("start", newURLParams);
    removeKeyFromUrl("end", newURLParams);
    const startValue = startDate.getFullYear();
    if (endDate) {
      const endValue = endDate.getFullYear();
      newURLParams.set("end", endValue);
    }
    newURLParams.set("start", startValue);
    setSearchParams(newURLParams);
  }

  function removeKeyFromUrl(key: string, params: URLSearchParams) {
    params.delete(key);
  }

  function getDate(value: string | null) {
    const defaultDate = new Date();
    if (!value) return undefined;
    defaultDate.setFullYear(Number(value));
    return defaultDate;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[386px_auto] gap-6">
      <div>
        <span className="block text-sm font-medium opacity-85">
          Selecione um ano/intervalo que deseja consultar
        </span>
        <div className="mt-1 inline-block border border-dashed">
          <DatePicker
            onChange={handleDates}
            selectsRange
            selected={getDate(start)}
            startDate={getDate(start)}
            endDate={getDate(end)}
            showYearPicker
            dateFormat="yyyy"
          />
        </div>
      </div>

      <div className="">
        <div>
          <span className="block text-sm font-medium opacity-85">
            Selecione os meses que deseja consultar
          </span>
        </div>

        <div className="mt-1 flex">
          <ToggleGroup
            type="multiple"
            className="flex flex-wrap gap-2 md:[flex-wrap:wrap] lg:flex-nowrap"
            value={months}
            onValueChange={handleMonths}
          >
            <div className="">
              {Object.entries(monthMapping).map(([key, value]) => (
                <ToggleGroupItem key={key} value={String(value)}>
                  {key}
                </ToggleGroupItem>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={"default"}
                size={"sm"}
                className="cursor-pointer"
                onClick={addAllMonths}
              >
                Todos
              </Button>

              <Button
                variant={"destructive"}
                size={"sm"}
                className="cursor-pointer"
                onClick={() => clearParam("month")}
              >
                Limpar
                <Trash />
              </Button>
            </div>
          </ToggleGroup>
        </div>
      </div>
    </div>
  );
}
