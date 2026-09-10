import type { DashboardHeaderProps } from "./DashboardHeader.type";

const DashboardHeader = ({
  title,
  description,
  actions,
}: DashboardHeaderProps) => {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>

        {description && (
          <p className="mt-2 text-sm text-slate-500">{description}</p>
        )}
      </div>

      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
};

export default DashboardHeader;
