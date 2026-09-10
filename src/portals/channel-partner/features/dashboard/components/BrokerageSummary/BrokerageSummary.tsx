import BrokerageProgressRow from "../BrokerageProgressRow/BrokerageProgressRow";
import { useDashboardContext } from "../../context/DashboardProvider";
import { formatINRCompact } from "@/shared/utils/currency";

const BrokerageSummary = () => {
  const { dashboardData } = useDashboardContext();

  const brokerageSummary = dashboardData?.BrokerageSummary;

  const totalBrokerage = brokerageSummary?.TotalBrokerage ?? 0;
  const paidBrokerage = brokerageSummary?.PaidBrokerage ?? 0;
  const underProcessBrokerage = brokerageSummary?.UnderProcessBrokerage ?? 0;
  const amountToBePaid = brokerageSummary?.AmountToBePaid ?? 0;

  const calculatePercentage = (value: number) => {
    if (!totalBrokerage || totalBrokerage <= 0) return 0;

    return Math.min(Math.round((value / totalBrokerage) * 100), 100);
  };

  return (
    <>
      <h2 className="mb-4 text-xl font-semibold">Brokerage Summary</h2>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="space-y-6">
          <BrokerageProgressRow
            label="Total Brokerage"
            amount={formatINRCompact(totalBrokerage)}
            percentage={100}
          />

          <BrokerageProgressRow
            label="Paid Brokerage"
            amount={formatINRCompact(paidBrokerage)}
            percentage={calculatePercentage(paidBrokerage)}
            valueColor="#1FAF38"
          />

          <BrokerageProgressRow
            label="Unpaid Brokerage"
            amount={formatINRCompact(amountToBePaid)}
            percentage={calculatePercentage(amountToBePaid)}
            valueColor="#E92C2C"
          />

          <BrokerageProgressRow
            label="Under Process"
            amount={formatINRCompact(underProcessBrokerage)}
            percentage={calculatePercentage(underProcessBrokerage)}
            valueColor="#64748b"
          />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-slate-200 p-4 text-center">
            <p className="text-xl font-semibold">
              {brokerageSummary?.InvoiceCount ?? 0}
            </p>

            <p className="text-sm text-slate-500">Invoices</p>
          </div>

          <div className="rounded-lg border border-slate-200 p-4 text-center">
            <p className="text-xl font-semibold">
              {brokerageSummary?.PendingCount ?? 0}
            </p>

            <p className="text-sm text-slate-500">Pending</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrokerageSummary;
