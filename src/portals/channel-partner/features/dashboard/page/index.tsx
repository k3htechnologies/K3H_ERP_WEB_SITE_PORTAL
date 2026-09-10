import { DashboardProvider } from "../context/DashboardProvider";
import DashboardContent from "./DashboardContent";

export default function CPDashboard() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}