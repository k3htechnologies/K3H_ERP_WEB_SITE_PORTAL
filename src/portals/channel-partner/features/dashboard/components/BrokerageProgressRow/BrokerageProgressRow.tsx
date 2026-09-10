import type { BrokerageProgressRowProps } from "./BrokerageProgressRow.type";

const BrokerageProgressRow = ({
  label,
  amount,
  percentage,
  valueColor,
}: BrokerageProgressRowProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm text-slate-500">
          {label}
        </span>

        <span
          className={`font-semibold`}
          style={{color : valueColor}}
        >
          {amount}
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-blue-100">
        <div
          className="h-full rounded-full bg-primary-dark"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
};

export default BrokerageProgressRow;