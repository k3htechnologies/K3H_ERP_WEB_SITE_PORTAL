import { cn } from "@/shared/utils/cn";
import type { StatCardProps } from "./StatCard.type";

const trendColorMap = {
  success: "text-emerald-500",
  danger: "text-red-500",
};

const StatCard = ({
  title,
  value,
  trend,
  trendColor = "success",
}: StatCardProps) => {
  return (
    <div
      className="
      rounded-xl
      border border-slate-200
      bg-white
      px-6 py-5
      "
    >
      <p className="text-sm font-medium text-slate-500">{title}</p>

      <div className="mt-3 flex items-end gap-3">
        <h3 className="text-3xl font-bold leading-none text-slate-950">
          {value}
        </h3>

        {trend && (
          <span className={cn("text-sm", trendColorMap[trendColor])}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
