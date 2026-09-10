import { SinglePageSelection } from "@/shared/components/DropDown/SinglePageSelection";
import { Button, Input } from "@/shared/components/forms";
import type { ChannelPartnerRegistrationRequest } from "../../api/register.request";
import { CHANNE_PARTNER_TYPE, FIRMS_TYPE_OPTIONS } from "@/shared/constants";

interface BusinessInformationStepProps {
  formData: {
    values: ChannelPartnerRegistrationRequest;
    errors: Partial<Record<keyof ChannelPartnerRegistrationRequest, string>>;
    handleFieldChange: <K extends keyof ChannelPartnerRegistrationRequest>(
      field: K,
      value: ChannelPartnerRegistrationRequest[K],
    ) => void;
  };
  continueWithBusinessInformation: () => void;
  backFromBusinessInformation: () => void;
}

export default function BusinessInformationStep({
  formData,
  continueWithBusinessInformation,
  backFromBusinessInformation,
}: BusinessInformationStepProps) {
  return (
    <>
      <div className="mt-8 space-y-6">
        <Input
          label="RERA Registration Number"
          required
          placeholder="e.g., AS1900000001"
          value={formData.values.RERANumber}
          onChange={(e) => {
            formData.handleFieldChange("RERANumber", e.target.value);
          }}
          error={formData.errors.RERANumber}
        />
        <Input
          label="Company / Firm Name"
          required
          placeholder="Enter registered business name"
          value={formData.values.CompanyName}
          onChange={(e) => {
            formData.handleFieldChange("CompanyName", e.target.value);
          }}
          error={formData.errors.CompanyName}
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <SinglePageSelection
            label="Firm Type"
            placeholder="Select firm type"
            options={FIRMS_TYPE_OPTIONS.map((opt) => ({
              label: opt.name,
              value: opt.id,
            }))}
            value={formData.values.FirmsType}
            onChange={(e) => formData.handleFieldChange("FirmsType", String(e))}
            error={formData.errors.FirmsType}
          />
          <SinglePageSelection
            label="Type"
            placeholder="Select your Type"
            options={CHANNE_PARTNER_TYPE.map((opt) => ({
              label: opt.name,
              value: opt.id,
            }))}
            value={formData.values.Type}
            onChange={(e) => formData.handleFieldChange("Type", String(e))}
            error={formData.errors.Type}
          />
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-between">
        <Button
          variant="outline"
          className="h-11 w-full sm:w-33.75"
          onClick={backFromBusinessInformation}
        >
          Previous
        </Button>
        <Button
          className="h-11 w-full sm:w-41.25"
          onClick={continueWithBusinessInformation}
        >
          Continue
        </Button>
      </div>
    </>
  );
}
