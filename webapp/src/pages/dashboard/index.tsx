/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import DatePicker from "react-datepicker";
import { ResumeCardSection } from "./components/resume-card-section";
import { GraphSection } from "./components/graph-section";

export function DashboardPage() {
  const [startYear, setStartYear] = useState(new Date());
  const [endYear, setEndYear] = useState<Date | null>(null);

  const handleChange = ([newStartDate, newEndDate]: any) => {
    setStartYear(newStartDate);
    setEndYear(newEndDate);
  };

  return (
    <section className="mt-8 pb-10">
      <div className="flex items-center gap-3">
        <span className="text-lg font-mono">
          Selecione um ano ou um intervalo de datas:
        </span>

        <div className="border border-dashed">
          <DatePicker
            onChange={handleChange}
            selectsRange
            selected={startYear}
            startDate={startYear}
            endDate={endYear}
            showYearPicker
            dateFormat="yyyy"
          />
        </div>
      </div>

      <ResumeCardSection startYear={startYear} endYear={endYear} />

      <GraphSection startYear={startYear} endYear={endYear} />
    </section>
  );
}
