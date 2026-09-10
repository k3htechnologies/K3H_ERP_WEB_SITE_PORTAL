// pages/DashboardContent.tsx

import { useDashboardContext } from "../context/DashboardProvider";

import DashboardHeader from "../components/DashboardHeader/DashboardHeader";
import MetricsGrid from "../components/MetricsGrid/MetricsGrid";
import ProjectWisePerformance from "../components/ProjectWisePerformance/ProjectWisePerformance";
import EnquiryBookingSection from "../components/EnquiryBookingSection/EnquiryBookingSection";
import RecentBookingBrokerage from "../components/RecentBookingBrokerage/RecentBookingBrokerage";
import ExploreMore from "../components/ExploreMore/ExploreMore";

export default function DashboardContent() {
  const { loading, error } = useDashboardContext();

  if (loading) {
    // return <DashboardSkeleton />;
  }

  if (error) {
    return <div>Something went wrong.</div>;
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Channel Partner Dashboard"
        description="Welcome back! Here's what's happening with your business today."
      />
      <MetricsGrid />
      <ProjectWisePerformance />
      <EnquiryBookingSection />
      <RecentBookingBrokerage />
      <ExploreMore />
    </div>
  );
}
