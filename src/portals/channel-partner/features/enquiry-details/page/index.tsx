import { useNavigate, useParams } from "react-router-dom";

import { cn } from "@/shared/utils/cn";
import { useScrollMainContent } from "@/shared/hooks/useScrollMainContent";
import Enquiry from "../components/Enquiry/Enquiry";
import Booking from "../components/Booking/Booking";
import Brokerage from "../components/Brokerage/Brokerage";
import HeaderActionBar from "@/shared/components/forms/HeaderActionBar";
import { useChannelPartnerContext } from "@/portals/channel-partner/context/ChannelPartnerProvider";

const tabs = [
  {
    label: "Enquiry",
    value: "enquiry",
  },
  {
    label: "Booking",
    value: "booking",
  },
  {
    label: "Brokerage",
    value: "brokerage",
  },
  // {
  //   label: "Incentives",
  //   value: "incentives",
  // },
];

const ProjectEnquiryDetailsPage = () => {
  useScrollMainContent();
  const { projectId, activeTab } = useParams();
  const { selectedProject } = useChannelPartnerContext();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <HeaderActionBar titleText={selectedProject?.name ?? ""} />
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const isActive = tab.value === activeTab;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() =>
                navigate(
                  `/channelPartner/enquiryDetails/${projectId}/${tab.value}`,
                )
              }
              className={cn(
                `
              min-w-32.5 rounded-md border px-6 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer
              `,
                isActive
                  ? `
                  border-primary-dark
                  bg-primary-2
                  text-primary-dark
                `
                  : `
                  border-slate-300
                  bg-white
                  text-slate-500
                  hover:bg-slate-50
                `,
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {activeTab === "enquiry" && projectId?.length && <Enquiry />}
      {activeTab === "booking" && projectId?.length && <Booking />}
      {activeTab === "brokerage" && projectId?.length && <Brokerage />}
    </div>
  );
};

export default ProjectEnquiryDetailsPage;
