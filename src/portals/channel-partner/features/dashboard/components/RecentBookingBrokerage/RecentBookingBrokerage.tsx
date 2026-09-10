import { useDashboardContext } from "../../context/DashboardProvider";
import BookingBrokerageTable from "./BookingBrokerageTable";

const RecentBookingBrokerage = () => {
  const { dashboardData } = useDashboardContext();
  return (
    <>
      <h2 className="mb-4 text-xl font-semibold">
        Recent Booking And Brokerage
      </h2>
      <BookingBrokerageTable data={dashboardData?.RecentBookings || []} />
    </>
  );
};

export default RecentBookingBrokerage;
