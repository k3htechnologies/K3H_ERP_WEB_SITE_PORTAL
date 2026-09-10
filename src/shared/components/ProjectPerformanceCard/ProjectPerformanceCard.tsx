// ProjectPerformanceCard.tsx

import type { ProjectPerformanceCardProps } from "./ProjectPerformanceCard.type";

const ProjectPerformanceCard = ({
  imageUrl,
  projectName,
  bookings,
  bookingValue,
  brokerageValue,
  onClick
}: ProjectPerformanceCardProps) => {
  return (
    <div
      className="
      min-w-70
      rounded-xl
      border border-slate-200
      bg-white
      p-4 cursor-pointer
      "
      onClick={onClick}
    >
      <div className="flex gap-3">
        <img
          src={imageUrl}
          alt={projectName}
          className="
          h-12 w-12
          rounded-md
          object-cover
          "
        />

        <div>
          <h3 className="text-lg font-medium text-slate-900">
            {projectName}
          </h3>

          <p className="text-sm text-slate-400">
            Booking : {bookings}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-slate-500">
            Total Booking Value
          </span>

          <span className="font-medium text-slate-900">
            {bookingValue}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500">
            Total Brokerage Value
          </span>

          <span className="font-medium text-slate-900">
            {brokerageValue}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectPerformanceCard;