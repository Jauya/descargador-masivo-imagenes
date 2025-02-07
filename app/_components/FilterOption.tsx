import { ReactNode } from "react";

interface FilterOptionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}
export default function FilterOption({
  title,
  icon,
  children,
}: FilterOptionProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="flex items-center gap-1">
        {icon} {title}
      </h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
