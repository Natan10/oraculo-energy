import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type MessageProps = {
  title: string;
  icon: ReactNode;
  type?: "warn" | "info" | "load";
};

export function CustomMessage({ title, icon, type = "load" }: MessageProps) {
  function getColor(type: "warn" | "info" | "load") {
    if (type === "warn") return "bg-primary-yellow";
    if (type === "load") return "bg-slate-50";
    return "bg-secondary-green";
  }

  return (
    <div
      className={cn(
        "inline-flex text-primary-black items-center gap-1 rounded p-3",
        getColor(type)
      )}
    >
      {icon}
      <p className="font-semibold text-xs md:text-sm">{title}</p>
    </div>
  );
}
