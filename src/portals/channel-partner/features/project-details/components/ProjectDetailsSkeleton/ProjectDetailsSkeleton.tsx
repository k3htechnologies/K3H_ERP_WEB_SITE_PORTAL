import { Skeleton } from "@/shared/components/Skeleton/Skeleton";

const ProjectDetailsSkeleton = () => {
  return (
    <div className="space-y-5">
      {/* Hero Section */}
      <section className="relative h-105 overflow-hidden rounded-2xl bg-slate-200">
        <div className="absolute inset-0 bg-slate-300" />

        <div className="absolute inset-0 flex items-end justify-between p-8">
          <div className="space-y-4">
            <Skeleton className="h-12 w-80" />

            <div className="flex gap-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-36" />
            </div>

            <div className="flex gap-2">
              <Skeleton className="h-7 w-40 rounded-full" />
              <Skeleton className="h-7 w-52 rounded-full" />
            </div>
          </div>

          <div className="flex gap-3">
            <Skeleton className="h-12 w-32 rounded-lg" />
            <Skeleton className="h-12 w-32 rounded-lg" />
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <div className="grid gap-5 lg:grid-cols-12">
        {/* Left */}
        <div className="space-y-5 lg:col-span-8">
          {/* Overview */}
          <div className="rounded-2xl bg-white p-5">
            <Skeleton className="mb-5 h-4 w-40" />

            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-10/12" />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {[1, 2].map((item) => (
                <div key={item} className="rounded-xl bg-[#F2F4F6] p-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-12" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inventory */}
          <div className="rounded-2xl bg-white p-5">
            <Skeleton className="mb-5 h-4 w-48" />

            <div className="space-y-4">
              {[1, 2, 3, 4].map((row) => (
                <div key={row} className="grid grid-cols-3 gap-4 border-b pb-4">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-32" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-5 lg:col-span-4">
          {/* Highlights */}
          <div className="rounded-2xl bg-white p-5">
            <Skeleton className="mb-5 h-4 w-32" />

            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-10/12" />
            </div>
          </div>

          {/* Contact */}
          <div className="rounded-2xl bg-white p-5">
            <Skeleton className="mb-5 h-4 w-40" />

            <div className="flex items-center gap-3">
              <Skeleton className="h-14 w-14 rounded-xl" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          </div>

          {/* Incentive Card */}
          <div className="rounded-2xl border border-[#735C00]/20 bg-[#FED65B]/20 p-5">
            <div className="flex gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />

              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-10/12" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <section className="rounded-2xl bg-white p-5">
        <Skeleton className="mb-5 h-4 w-48" />

        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-xl bg-[#F2F4F6] p-4"
            >
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailsSkeleton;
