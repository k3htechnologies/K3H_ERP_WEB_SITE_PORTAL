import { Skeleton } from "../Skeleton/Skeleton";

export function UserProfileCardSkeleton() {
  return (
    <div className="flex max-h-[80vh] w-90 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
      {/* Header */}
      <div className="border-b border-slate-100 p-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />

          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="mt-2 h-6 w-24 rounded-full" />
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {/* Info Rows */}
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-lg" />

                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-44" />
                </div>
              </div>
            ))}
          </div>

          {/* Profile Completion */}
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-10" />
            </div>

            <Skeleton className="mt-3 h-2 w-full rounded-full" />

            <div className="mt-4 flex flex-wrap gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-28 rounded-full" />
            </div>
          </div>

          {/* Registration */}
          <div className="rounded-xl border border-slate-100 p-4">
            <Skeleton className="mb-4 h-4 w-28" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 bg-white p-4">
        <div className="flex gap-3">
          <Skeleton className="h-10 flex-1 rounded-md" />
          <Skeleton className="h-10 flex-1 rounded-md" />
        </div>
      </div>
    </div>
  );
}
