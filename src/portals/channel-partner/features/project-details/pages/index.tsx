import HeaderActionBar from "@/shared/components/forms/HeaderActionBar";
import IconContainer from "@/shared/components/IconContainer/IconContainer";
import { useNavigationState } from "@/shared/hooks/useNavigationState";
import { useScrollMainContent } from "@/shared/hooks/useScrollMainContent";
import {
  Building2,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Trophy,
  Download,
  CircleHelp,
} from "lucide-react";
import { useParams } from "react-router-dom";
import ProjectDetailsSkeleton from "../components/ProjectDetailsSkeleton/ProjectDetailsSkeleton";
import { useFetchProjectDetails } from "../hooks/useFetchProjectDetails";
import { formatArea } from "@/shared/utils/comman";
import { AMENITY_ICONS, DEFAULT_AMENITY_ICON } from "@/shared/constants/amenity-icons";

const ProjectDetailsPage = () => {
  useScrollMainContent();
  const { projectId } = useParams();
  const { projectName } = useNavigationState<{ projectName: string }>() ?? {};
  const { data, loading } = useFetchProjectDetails(projectId);
  const projectDetails = data?.Data ? data?.Data[0] : null;
  const inventory =
    projectDetails?.Configurations?.map((item) => ({
      configuration: item.FlatConfiguration,
      area: formatArea(item.RERACarpetAreaSqFt),
    })) ?? [];
  const amenities =
    projectDetails?.Amenities?.split(",")
      .map((item) => item.trim())
      .filter(Boolean) ?? [];

  const areaRange = (() => {
    const configurations = projectDetails?.Configurations;
    if (!configurations?.length) return "-";
    const areas = configurations.map((item) => item.RERACarpetAreaSqFt);
    const min = Math.min(...areas);
    const max = Math.max(...areas);

    return `${formatArea(min)} - ${formatArea(max)}`;
  })();

  return (
    <div className="space-y-5">
      <HeaderActionBar titleText={projectName} />
      {loading && !projectDetails ? (
        <ProjectDetailsSkeleton />
      ) : (
        <>
          <section
            className=" group relative h-105 overflow-hidden rounded-2xl
        "
          >
            <img
              src={projectDetails?.ProjectPhotoURL}
              alt="Project"
              className="absolute inset-0 h-full w-full object-cover will-change-transform transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10" />
            <div className=" absolute inset-0 flex items-end justify-between p-8">
              <div>
                <h1 className="text-5xl font-bold text-white">
                  {projectDetails?.ProjectName}
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white">
                  {projectDetails?.ProjectLocation && (
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      {projectDetails?.ProjectLocation}
                    </div>
                  )}
                  {projectDetails?.RERAComplitionDate && (
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      {/* Possession Dec 2026 */}
                      Possession {projectDetails?.RERAComplitionDate}
                    </div>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {projectDetails?.ProjectStatus && (
                    <span className=" rounded-full bg-emerald-600 px-3 py-1 text-xs font-medium text-white ">
                      {projectDetails?.ProjectStatus}
                    </span>
                  )}
                  {projectDetails?.RERANumber && (
                    <span className=" rounded-full bg-white/20 px-3 py-1 text-xs text-white backdrop-blur-md ">
                      RERA: {projectDetails?.RERANumber}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-3">
                <button className=" rounded-lg bg-white/20 px-6 py-3 text-white backdrop-blur-md transition hover:bg-white/30 flex gap-2 ">
                  <Download size={20} />
                  Brochure
                </button>
                <button className=" rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 ">
                  View Photos
                </button>
              </div>
            </div>
          </section>
          <div className="grid gap-5 lg:grid-cols-12">
            <div className="space-y-5 lg:col-span-8">
              <div className="rounded-2xl bg-white p-5">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-600">
                  Project Overview
                </h2>
                <p className="text-sm leading-7 text-slate-600">
                  Rishabraj Avyaana stands as a beacon of ultra-luxury in Worli,
                  developed by India's premier real estate group known for
                  iconic skyline transformations. This exclusive
                  limited-inventory project features bespoke floor plans and
                  triple-height private balconies overlooking the Arabian Sea.
                </p>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className=" flex items-center justify-between rounded-xl bg-[#F2F4F6] p-4 ">
                    <div className="flex items-center gap-3">
                      <Building2 size={18} />
                      <span className="font-medium">TOWERS</span>
                    </div>
                    <span className="font-semibold">04</span>
                  </div>

                  {inventory && inventory.length && (
                    <div className=" flex items-center justify-between rounded-xl bg-[#F2F4F6] p-4 ">
                      <div className="flex items-center gap-3">
                        <Building2 size={18} />
                        <span className="font-medium">SQ. FT.</span>
                      </div>
                      <span className="font-semibold">{areaRange}</span>
                    </div>
                  )}
                </div>
              </div>
              {inventory && inventory.length && (
                <div className="rounded-2xl bg-white p-5">
                  <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-600">
                    Inventory & Pricing
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-[#F1F1F1]">
                          <th className="px-4 py-3 text-left text-xs">
                            UNIT CONFIGURATION
                          </th>
                          <th className="px-4 py-3 text-left text-xs">
                            AREA (SQ.FT.)
                          </th>
                          {/* <th className="px-4 py-3 text-left text-xs">
                          PRICING (STARTING ONWARDS)
                        </th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {inventory.map((item) => (
                          <tr key={item.configuration} className="border-b">
                            <td className="px-4 py-5 font-medium">
                              {item.configuration}
                            </td>
                            <td className="px-4 py-5">{item.area}</td>
                            {/* <td
                            className={`px-4 py-5 font-medium ${index === inventory.length - 1 && "text-[#735C00]"}`}
                          >
                            {item.price}
                          </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-5 lg:col-span-4">
              <div className="rounded-2xl bg-white p-5">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-600">
                  Key Highlights
                </h2>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li>• Triple-height private sky decks with sea views</li>
                  <li>• Dedicated concierge & lifestyle manager</li>
                  <li>• IGBC Platinum pre-certified project</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-white p-5">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-600">
                  Point Of Contact
                </h2>
                <div className="flex items-center gap-3">
                  <img
                    src="/profile.jpg"
                    alt="Vikram Malhotra"
                    className=" h-14 w-14 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <h3 className="font-semibold">Vikram Malhotra</h3>
                    <p className="text-xs text-slate-500">Senior Sales Lead</p>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3 rounded-lg bg-[#F2F4F6] p-3">
                    <Phone size={16} />
                    9876565678
                  </div>
                  <div className="flex items-center gap-3 rounded-lg bg-[#F2F4F6] p-3">
                    <Mail size={16} />
                    vikram@hrh.com
                  </div>
                </div>
              </div>
              <div className=" rounded-2xl border border-[#735C00]/20 bg-[#FED65B]/30 p-5 ">
                <div className="flex gap-3">
                  <div className=" flex h-10 w-10 items-center justify-center rounded-full bg-[#735C00] text-white ">
                    <Trophy size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">MILESTONE UNLOCK</h3>
                    <p className="mt-1 text-sm text-[#745C00]">
                      Sell 2 more units to unlock 1% additional incentive for
                      this quarter.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className="rounded-2xl bg-white p-5">
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-wide text-slate-600">
              World-Class Amenities
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {amenities.length > 0 ? (
                amenities.map((amenity) => {
                  const Icon = AMENITY_ICONS[amenity] ?? DEFAULT_AMENITY_ICON;
                  return (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 rounded-xl bg-[#F2F4F6] p-4 transition hover:bg-slate-100"
                    >
                      <IconContainer className="border-transparent bg-white text-black shadow">
                        <Icon size={18} />
                      </IconContainer>
                      <span className="text-sm font-medium">{amenity}</span>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                    <CircleHelp className="h-6 w-6 text-slate-500" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-800">
                    Amenities currently unavailable
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Amenity information for this project has not been updated
                    yet. Please contact us for the latest details.
                  </p>
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default ProjectDetailsPage;
