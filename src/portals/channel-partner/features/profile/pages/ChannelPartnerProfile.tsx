import { useUserProfileContext } from "@/app/providers/UserProvider/UserProvider";
import { Button } from "@/shared/components/forms";
import { StatusBadge } from "@/shared/components/StatusBadge/StatusBadge";
import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  FileBadge2,
  MapPin,
  MapPinned,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const secondaryProjects = [
  "Stone Villa",
  "Ceremont",
  "Rishabraj Anuja",
  "Arham",
];

const ChannelPartnerProfile = () => {
  const { profile, isProfileLoading } = useUserProfileContext();
  return isProfileLoading ? (
    <h1>Loading</h1>
  ) : (
    <>
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-10">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-7">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={profile?.ChannelPartnerPhotoUrl}
                  alt={profile?.Name}
                  className="h-30 w-30 rounded-full border object-cover"
                />
                {profile?.IsActive && (
                  <span className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 ring-2 ring-white">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h1 className="text-2xl font-semibold text-slate-900">
                        {profile?.Name}
                      </h1>
                      {profile?.IsActive && (
                        <StatusBadge
                          variant="success"
                          label="Active"
                          icon={<CheckCircle2 className="h-3.5 w-3.5" />}
                        />
                      )}
                      {profile?.Reranumber && (
                        <StatusBadge
                          label="RERA Verified"
                          icon={<BadgeCheck className="h-3.5 w-3.5" />}
                        />
                      )}
                      {profile?.Gstnumber && (
                        <StatusBadge
                          label="GST Verified"
                          icon={<ShieldCheck className="h-3.5 w-3.5" />}
                        />
                      )}
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      {profile?.Designation} at{" "}
                      <span className="font-medium">
                        {profile?.CompanyName}
                      </span>
                    </p>
                    {profile?.OfficeAddress && (
                      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                        <MapPin className="h-4 w-4 text-indigo-500" />
                        {profile?.OfficeAddress}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-3">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-50">
                <ShieldCheck className="h-4 w-4 text-violet-600" />
              </div>
              <h2 className="text-sm font-semibold text-slate-800">
                Compliance Status
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  Status
                </p>
                <button
                  type="button"
                  // onClick={onViewDocument}
                  className="w-full rounded-md border border-blue-300 px-4 py-1.5 text-xs font-medium text-blue-600 transition hover:bg-blue-50"
                >
                  AOP
                </button>
              </div>
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  AOP Document
                </p>
                <button
                  type="button"
                  // onClick={onViewDocument}
                  className="w-full rounded-md border border-blue-300 px-4 py-1.5 text-xs font-medium text-blue-600 transition hover:bg-blue-50"
                >
                  View
                </button>
              </div>
            </div>
            <div className="mt-6 flex items-end justify-between gap-4">
              <div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  Validity
                </p>
                <p className="text-sm font-medium text-slate-700">
                  01 April 2026 - 31 March 2027
                </p>
              </div>
              <button
                type="button"
                //   onClick={onViewMetrics}
                className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
              >
                View Sales Metrics
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex-1 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50">
                <UserRound className="h-4 w-4 text-indigo-600" />
              </div>
              <h2 className="text-xl font-semibold text-slate-800">
                Personal Information
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-y-7 sm:grid-cols-2">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Full Name
                </p>
                <p className="text-lg font-medium text-slate-800">
                  {profile?.Name}
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Mobile Number
                </p>
                <p className="text-lg font-medium text-slate-800">
                  {profile?.MobileNumber}
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Date of Birth
                </p>
                <p className="text-lg font-medium text-slate-800">
                  {profile?.DateOfBirth ? profile.DateOfBirth : "-"}
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Email Address
                </p>
                <a
                  href={profile?.EmailId ? `mailto:${profile?.EmailId}` : ""}
                  className="text-lg font-medium text-blue-600 hover:underline"
                >
                  {profile?.EmailId ? profile.EmailId : "-"}
                </a>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Website
                </p>
                {profile?.WebsiteUrl ? (
                  <a
                    href={profile.WebsiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg font-medium text-blue-600 hover:underline"
                  >
                    {profile.WebsiteUrl}
                  </a>
                ) : (
                  "-"
                )}
              </div>
            </div>
          </div>
          <div className="flex-1 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50">
                <BriefcaseBusiness className="h-4 w-4 text-emerald-600" />
              </div>
              <h2 className="text-xl font-semibold text-slate-800">
                Business Information
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-y-7 sm:grid-cols-2">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Company Name
                </p>
                <p className="text-lg font-medium text-slate-800">
                  {profile?.CompanyName}
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Company Type
                </p>
                <p className="text-lg font-medium text-slate-800"></p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Firm Type
                </p>
                <p className="text-lg font-medium text-slate-800">
                  {profile?.FirmsType}
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Speciality
                </p>
                <p className="text-lg font-medium text-slate-800">
                  {profile?.Speciality}
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  RERA Number
                </p>
                <p className="text-lg font-medium text-slate-800">
                  {profile?.Reranumber}
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Type
                </p>
                <p className="text-lg font-medium text-slate-800">
                  {profile?.Type}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {/* Address Details */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50">
                <MapPinned className="h-5 w-5 text-amber-600" />
              </div>
              <h2 className="text-xl font-semibold text-slate-800">
                Address Details
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Country
                </p>
                <p className="text-lg font-medium text-slate-800">India</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  State
                </p>
                <p className="text-lg font-medium text-slate-800">
                  Maharashtra
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  District
                </p>
                <p className="text-lg font-medium text-slate-800">Thane</p>
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  City
                </p>
                <p className="text-lg font-medium text-slate-800">Mumbai</p>
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Village/Area
                </p>
                <p className="text-lg font-medium text-slate-800">
                  Bandra West
                </p>
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Office Address
                </p>
                <p className="text-lg font-medium text-slate-800">
                  101, Business Park, Bandra West, Mumbai 400050
                </p>
              </div>
            </div>
          </div>
          {/* Assigned Projects */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-50">
                <Building2 className="h-5 w-5 text-sky-600" />
              </div>
              <h2 className="text-xl font-semibold text-slate-800">
                Assigned Projects
              </h2>
            </div>
            <div className="flex flex-col gap-8 lg:flex-row">
              <div className="w-full lg:w-1/3">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Primary Project
                </p>
                {profile?.PrimaryProjectPortfolioId ? (
                  <div className="rounded-3xl bg-indigo-50 p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white">
                        <Building2 className="h-8 w-8 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-800">
                          Rishabraj Avyaana
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          Residential, Mumbai
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6">
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white">
                        <Building2 className="h-8 w-8 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-700">
                        No Primary Project
                      </h3>
                      <p className="mt-2 text-sm text-slate-500">
                        No primary project has been assigned yet.
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Secondary Projects
                </p>
                {profile?.SecondaryProjectPortfolioId ? (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {secondaryProjects.map((project) => (
                      <div
                        key={project}
                        className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 transition hover:border-indigo-300 hover:shadow-sm"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50">
                          <Building2 className="h-5 w-5 text-indigo-600" />
                        </div>

                        <span className="text-lg font-medium text-slate-800">
                          {project}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white">
                        <Building2 className="h-7 w-7 text-slate-400" />
                      </div>

                      <h3 className="text-lg font-semibold text-slate-700">
                        No Secondary Projects
                      </h3>

                      <p className="mt-2 text-sm text-slate-500">
                        No secondary projects have been assigned yet.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50">
                <FileBadge2 className="h-5 w-5 text-indigo-600" />
              </div>
              <h2 className="text-xl font-semibold text-slate-800">
                Verification Documents
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Aadhaar */}
              <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6">
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-200">
                      <FileBadge2 className="h-6 w-6 text-slate-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">
                        Aadhaar Card
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        No document uploaded
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-600">
                    Not Uploaded
                  </span>
                </div>

                <div className="rounded-xl border border-dashed border-slate-300 bg-white py-5 text-center">
                  <p className="text-sm text-slate-500">
                    This document has not been uploaded yet.
                  </p>
                </div>
              </div>

              {/* PAN */}
              <div className="rounded-3xl border border-slate-200 p-6">
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50">
                      <FileBadge2 className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">
                        PAN Card
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">ABCDE1234F</p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Verified
                  </span>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    View
                  </Button>

                  <Button className="flex-1">Download</Button>
                </div>
              </div>

              {/* GST */}
              <div className="rounded-3xl border border-slate-200 p-6">
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50">
                      <FileBadge2 className="h-6 w-6 text-indigo-600" />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">
                        GST Certificate
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        27AAACG1234F1Z5
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Verified
                  </span>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50 bg-primary-dark"
                  >
                    View
                  </Button>

                  <Button className="flex-1">Download</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChannelPartnerProfile;
