import ProjectPerformanceCard from "@/shared/components/ProjectPerformanceCard/ProjectPerformanceCard";
import { formatINRCompact } from "@/shared/utils/currency";
import type React from "react";
import { useNavigate } from "react-router-dom";
import { useDashboardContext } from "../../context/DashboardProvider";
import { useChannelPartnerContext } from "@/portals/channel-partner/context/ChannelPartnerProvider";

const ProjectWisePerformance = () => {
  const navigate = useNavigate();
  const { dashboardData } = useDashboardContext();
  const { setSelectedProject } = useChannelPartnerContext();
  const projects = dashboardData?.ProjectWiseBooking ?? [];

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement>,
    projectId: number,
    projectName: string,
  ) => {
    e.preventDefault();
    setSelectedProject({
      name: projectName,
      id: String(projectId),
    });
    navigate(`/channelPartner/enquiryDetails/${projectId}/enquiry`);
  };

  if (!projects.length) {
    return (
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Project Wise Performance
        </h2>

        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          No project performance data available
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">
        Project Wise Performance
      </h2>

      <div
        className="
          flex gap-4
          overflow-x-auto thin-scroll
          pb-2
        "
      >
        {projects.map((project) => (
          <ProjectPerformanceCard
            key={project.ProjectId}
            id={project.ProjectId}
            imageUrl={project.ProjectPhotoURL}
            projectName={project.ProjectName}
            bookings={project.BookingCount}
            bookingValue={formatINRCompact(project.TotalBookingValue)}
            brokerageValue={formatINRCompact(project.TotalBrokerageValue)}
            onClick={(e) =>
              handleClick(e, project.ProjectId, project.ProjectName)
            }
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectWisePerformance;
