import { Button } from "@/shared/components/forms";
import type { ChannelPartnerRegistrationRequest } from "../../api/register.request";
import Checkbox from "@/shared/components/forms/Checkbox";

interface ProfessionalInformationStepProps {
  formData: {
    values: ChannelPartnerRegistrationRequest;
    errors: Partial<Record<keyof ChannelPartnerRegistrationRequest, string>>;
    handleFieldChange: <K extends keyof ChannelPartnerRegistrationRequest>(
      field: K,
      value: ChannelPartnerRegistrationRequest[K],
    ) => void;
  };
  isSubmitting: boolean;
  goToBusinessInformation: () => void;
  submitRegistration: () => void;
}

const DESIGNATIONS = [
  {
    id: "Business Head",
    title: "Business Head",
    description: "Leads Business Operations",
  },
  {
    id: "Cluster Head",
    title: "Cluster Head",
    description: "Manages Regional Teams",
  },
  {
    id: "Owner",
    title: "Owner",
    description: "Firm Owner",
  },
  {
    id: "Partner",
    title: "Partner",
    description: "Business Partner",
  },
  {
    id: "Team Member",
    title: "Team Member",
    description: "Sales Team Member",
  },
];

const SPECIALITIES = [
  "Commercial Sale",
  "Commercial Leasing",
  "Residential Sale",
  "Commercial + Residential Sale",
];

export default function ProfessionalInformationStep({
  formData,
  goToBusinessInformation,
  submitRegistration,
  isSubmitting,
}: ProfessionalInformationStepProps) {
  return (
    <>
      <div className="mt-8 space-y-8">
        <div>
          <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Select Designation
          </label>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
            {DESIGNATIONS.map((designation) => {
              const isSelected = formData.values.Designation === designation.id;
              return (
                <button
                  key={designation.id}
                  type="button"
                  onClick={() =>
                    formData.handleFieldChange("Designation", designation.id)
                  }
                  className={`rounded-xl border p-4 text-center transition-all
                    ${
                      isSelected
                        ? "border-primary bg-[#CEE8F2]"
                        : "border-slate-200 bg-white hover:border-primary"
                    }`}
                >
                  <h3 className="font-medium text-slate-900">
                    {designation.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500">
                    {designation.description}
                  </p>
                </button>
              );
            })}
          </div>

          {formData.errors.Designation && (
            <p className="mt-2 text-sm text-red-500">
              {formData.errors.Designation}
            </p>
          )}
        </div>
        <div>
          <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Speciality
          </label>
          <div className="flex flex-wrap gap-3">
            {SPECIALITIES.map((speciality) => {
              const selected = formData.values.Speciality === speciality;
              return (
                <button
                  key={speciality}
                  type="button"
                  onClick={() =>
                    formData.handleFieldChange("Speciality", speciality)
                  }
                  className={`rounded-full border px-5 py-2 text-sm transition-all
                    ${
                      selected
                        ? "border-primary bg-primary text-white"
                        : "border-slate-300 bg-white text-slate-700 hover:border-primary"
                    }`}
                >
                  {speciality}
                </button>
              );
            })}
          </div>
          {formData.errors.Speciality && (
            <p className="mt-2 text-sm text-red-500">
              {formData.errors.Speciality}
            </p>
          )}
        </div>
        <hr />
        <Checkbox
          checked={formData.values.IsTermsAccepted}
          onChange={(e) => {
            if (e.target.checked) {
              formData.handleFieldChange("IsTermsAccepted", true);
            } else {
              formData.handleFieldChange("IsTermsAccepted", false);
            }
          }}
          label={
            <span className="text-sm text-slate-600">
              I agree to the{" "}
              <button type="button" className="text-primary hover:underline">
                Terms of Association
              </button>{" "}
              and the{" "}
              <button type="button" className="text-primary hover:underline">
                Privacy Policy
              </button>
              . I confirm that all provided professional data is accurate and
              valid.
            </span>
          }
        />
      </div>

      {/* Footer */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-between">
        <Button
          variant="outline"
          className="h-11 w-full sm:w-42"
          onClick={goToBusinessInformation}
          disabled={isSubmitting}
        >
          Previous
        </Button>
        <Button className="h-11 w-full sm:w-68" onClick={submitRegistration}>
          {isSubmitting ? "Registering..." : "Submit Registration"}
        </Button>
      </div>
    </>
  );
}
