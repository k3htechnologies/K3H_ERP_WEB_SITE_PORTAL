import StatCard from "@/shared/components/StatCard/StatCard";
import { formatINRCompact } from "@/shared/utils/currency";
import { useDashboardContext } from "../../context/DashboardProvider";

const getWeeklyTrendText = (count: number | null | undefined) => {
  const value = count ?? 0;

  if (value === 0) return "No activity this week";

  return `+${value} this week`;
};

const MetricsGrid = () => {
  const { dashboardData } = useDashboardContext();

  const summary = dashboardData?.Summary;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Overview</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Total Enquiries"
          value={(summary?.TotalEnquiries ?? 0).toString()}
          trend={getWeeklyTrendText(summary?.CurrentWeekEnquiries)}
        />

        <StatCard
          title="Total Bookings"
          value={(summary?.TotalBookings ?? 0).toString()}
          trend={getWeeklyTrendText(summary?.CurrentWeekBookings)}
        />

        <StatCard
          title="Total Brokerage Amount"
          value={formatINRCompact(summary?.TotalBrokerageAmount ?? 0)}
          trend="Total Earnings"
        />
      </div>
    </section>
  );
};

export default MetricsGrid;
