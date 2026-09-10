import { useNavigate } from "react-router-dom";
import { useDashboardContext } from "@/portals/channel-partner/features/dashboard/context/DashboardProvider";

const ExploreMore = () => {
  const navigate = useNavigate();

  const { dashboardData } = useDashboardContext();

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    projectId: number,
    projectName: string,
  ) => {
    e.preventDefault();
    navigate(`/channelPartner/projectDetails/${projectId}`, {
      state: { projectName },
    });
  };

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">Explore More</h2>
      <div
        className="
        flex gap-4
        overflow-x-auto thin-scroll
        pb-2
        "
      >
        {dashboardData &&
          dashboardData.ProjectGallery &&
          dashboardData.ProjectGallery.length &&
          dashboardData.ProjectGallery.map((property) => (
            <button
              key={property.ProjectId}
              onClick={(e) =>
                handleClick(e, property.ProjectId, property.ProjectName)
              }
              className="group relative h-72 w-65 sm:w-75 lg:w-85 shrink-0 overflow-hidden rounded-xl text-left transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <img
                src={property.ProjectPhotoURL}
                alt={property.ProjectName}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-14 bg-white/10 backdrop-blur-md rounded-b-xl" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="font-medium text-white">
                  {property.ProjectName}
                </h3>
              </div>
            </button>
          ))}
      </div>
    </section>
  );
};

export default ExploreMore;
