import { useMemo } from "react";
import { CHART_COLORS } from "@/shared/constants/chart-color";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MONTHS } from "@/shared/constants";
import { useDashboardContext } from "../../context/DashboardProvider";
import type { ChannelPartnerDashboardResponse } from "../../api/dashboard.response";

const EnquiryBookingTrendChart = () => {
  const { dashboardData } = useDashboardContext();
  const normalizeTrendData = (
    apiData: ChannelPartnerDashboardResponse["EnquiryBookingTrend"] = [],
  ) => {
    return MONTHS.map((month, index) => {
      const item = apiData.find((x) => x.MonthNo === index + 1);

      return {
        month,
        enquiries: item?.Enquiries ?? 0,
        siteVisit: item?.SiteVisit ?? 0,
        booking: item?.Booking ?? 0,
      };
    });
  };
  const trendData = useMemo(
    () => normalizeTrendData(dashboardData?.EnquiryBookingTrend),
    [dashboardData],
  );

  const hasData = trendData.length > 0;

  return (
    <>
      <h2 className="mb-4 text-xl font-semibold">Enquiry vs Booking Trend</h2>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="h-80">
          {!hasData ? (
            <div className="flex h-full items-center justify-center text-sm text-slate-500">
              No trend data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={true} />

                <XAxis
                  dataKey="month"
                  tick={{
                    fill: "#6B7280",
                    fontSize: 12,
                  }}
                />

                <YAxis
                  allowDecimals={false}
                  tick={{
                    fill: "#6B7280",
                    fontSize: 12,
                  }}
                />

                <Tooltip />

                <Legend verticalAlign="bottom" align="left" iconType="circle" />

                <Line
                  type="monotone"
                  dataKey="enquiries"
                  name="Enquiries"
                  stroke={CHART_COLORS.enquiries}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />

                <Line
                  type="monotone"
                  dataKey="siteVisit"
                  name="Site Visit"
                  stroke={CHART_COLORS.siteVisit}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />

                <Line
                  type="monotone"
                  dataKey="booking"
                  name="Booking"
                  stroke={CHART_COLORS.booking}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </>
  );
};

export default EnquiryBookingTrendChart;
