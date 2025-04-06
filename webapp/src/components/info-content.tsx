import { ReactNode } from "react";

export function InfoContent({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon?: ReactNode;
}) {
  return (
    <div className="">
      <div className="flex items-center gap-1 mb-1">
        <span className="block text-[10px] md:text-xs opacity-50">{title}</span>
        {icon && icon}
      </div>
      <span className="block font-semibold text-xs md:text-sm">{value}</span>
    </div>
  );
}
