import { cn } from "@/shared/utils/cn";
import type { SectionCardProps } from "./SectionCard.type";

const SectionCard = ({
  title,
  action,
  children,
  className,
}: SectionCardProps) => {
  return (
    <div
      className={cn(
        `
        rounded-2xl
        bg-white
        border border-slate-200
        p-5
        `,
        className,
      )}
    >
      {(title || action) && (
        <div className="mb-5 flex items-center justify-between">
          {title && (
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          )}

          {action}
        </div>
      )}

      {children}
    </div>
  );
};

export default SectionCard;
