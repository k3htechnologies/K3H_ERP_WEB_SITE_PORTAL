import {
  BadgeCheck,
  Building2,
  Globe,
  Mail,
  Phone,
  ShieldAlert,
  UserRound,
} from "lucide-react";

import { Button } from "@/shared/components/forms";
import type { UserProfile } from "@/shared/services/user/user.response";

interface Props {
  profile: UserProfile;
  handleLogout: () => void;
  handleProfileRedirect: () => void;
}

export function UserProfileCard({
  profile,
  handleLogout,
  handleProfileRedirect,
}: Props) {
  const missingFields = profile.MissingFields
    ? profile.MissingFields.split(",").map((x) => x.trim())
    : [];
  const completion = Math.max(
    0,
    Math.round(((10 - Math.min(missingFields.length, 10)) / 10) * 100),
  );

  return (
    <div className="flex max-h-[80vh] w-90 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
      {/* Header */}
      <div className="border-b border-slate-100 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <UserRound className="h-8 w-8 text-slate-500" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-semibold">{profile.Name}</h3>

            <p className="text-sm text-slate-500">{profile.Designation}</p>

            <span className="mt-2 inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
              {profile.IsVerified}
            </span>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 thin-scroll">
        <div className="space-y-5">
          <section className="space-y-3">
            <InfoRow
              icon={<Building2 size={16} />}
              label="Company"
              value={profile.CompanyName || "Not Added"}
            />

            <InfoRow
              icon={<Phone size={16} />}
              label="Phone"
              value={`${profile.MobileNumberCountryCode} ${profile.MobileNumber}`}
            />

            <InfoRow
              icon={<Mail size={16} />}
              label="Email"
              value={profile.EmailId || "Not Added"}
            />

            <InfoRow
              icon={<Globe size={16} />}
              label="Website"
              value={profile.WebsiteUrl || "Not Added"}
            />
          </section>

          {/* Profile Completion */}
          <section className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Profile Completion</span>

              <span className="text-sm font-semibold">{completion}%</span>
            </div>

            {/* Progress Bar */}
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${completion}%` }}
              />
            </div>

            {missingFields.length > 0 && (
              <div className="mt-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <ShieldAlert size={15} className="text-amber-600" />
                  Missing Information
                </div>

                <div className="flex flex-wrap gap-2">
                  {missingFields.map((field) => (
                    <span
                      key={field}
                      className="rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-700"
                    >
                      {field}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Registration */}
          <section className="rounded-xl border border-slate-100 p-4">
            <div className="flex items-center gap-2">
              <BadgeCheck size={16} className="text-emerald-600" />
              <span className="font-medium">Registration</span>
            </div>

            <div className="mt-3 space-y-1">
              <p className="text-sm text-slate-700">
                {profile.SystemGeneratedCode}
              </p>

              <p className="text-sm text-slate-500">{profile.Speciality}</p>

              <p className="text-sm text-slate-500">{profile.FirmsType}</p>
            </div>
          </section>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="border-t border-slate-100 bg-white p-4">
        <div className="flex gap-3">
          <Button className="flex-1" onClick={handleProfileRedirect}>
            View Profile
          </Button>

          <Button variant="outline" className="flex-1" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-lg bg-slate-100 p-2 text-slate-600">{icon}</div>

      <div className="min-w-0 flex-1">
        <p className="text-xs text-slate-500">{label}</p>

        <p className="truncate text-sm font-medium text-slate-900">{value}</p>
      </div>
    </div>
  );
}
