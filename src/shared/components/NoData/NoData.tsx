import { Inbox } from "lucide-react";
import { Button } from "@/shared/components/forms";

interface NoDataProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function NoData({
  title = "No Data Found",
  description = "We couldn't find any records matching your request. Once data becomes available, it will appear here.",
  actionLabel,
  onAction,
}: NoDataProps) {
  return (
    <div className="flex min-h-95 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-gradient-to-b from-white to-slate-50 px-8">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
            <Inbox className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <h3 className="mt-6 text-2xl font-semibold text-slate-900">{title}</h3>

        <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>

        {actionLabel && onAction && (
          <Button className="mt-8" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
