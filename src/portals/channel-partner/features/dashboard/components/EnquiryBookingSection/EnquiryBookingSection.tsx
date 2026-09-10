import BrokerageSummary from "../BrokerageSummary/BrokerageSummary";
import EnquiryBookingTrendChart from "../EnquiryBookingTrendChart/EnquiryBookingTrendChart";

const EnquiryBookingSection = () => {
  return (
    <section className="grid gap-4 lg:grid-cols-12 items-stretch">
      <div className="lg:col-span-8">
        <EnquiryBookingTrendChart />
      </div>

      <div className="lg:col-span-4">
        <BrokerageSummary/>
      </div>
    </section>
  );
};

export default EnquiryBookingSection;
