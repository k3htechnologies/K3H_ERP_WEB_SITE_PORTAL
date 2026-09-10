import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { cn } from "@/shared/utils/cn";
import InvoiceList from "../components/InvoiceList/InvoiceList";
import PaymentList from "../components/PaymentList/PaymentList";
import HeaderActionBar from "@/shared/components/forms/HeaderActionBar";
import { useChannelPartnerContext } from "@/portals/channel-partner/context/ChannelPartnerProvider";

const tabs = [
  {
    label: "Invoice",
    value: "invoice",
  },
  {
    label: "Payment",
    value: "payment",
  },
];

const InvoiceView = () => {
  const { projectId, bookingId } = useParams();
  const { selectedProject } = useChannelPartnerContext();
  const [activeTab, setActiveTab] = useState("invoice");

  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <HeaderActionBar
        titleText={selectedProject?.name}
        EditText="Add"
        canAction={activeTab === "invoice"}
        onEdit={() => {
          navigate("/channelPartner/addInvoice/0", {
            state: { projectId, bookingId },
          });
        }}
      />
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const isActive = tab.value === activeTab;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
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
      {activeTab === "invoice" && projectId && bookingId && (
        <InvoiceList projectId={projectId} bookingId={bookingId} />
      )}
      {activeTab === "payment" && projectId && bookingId && (
        <PaymentList projectId={projectId} bookingId={bookingId} />
      )}
    </div>
  );
};

export default InvoiceView;
