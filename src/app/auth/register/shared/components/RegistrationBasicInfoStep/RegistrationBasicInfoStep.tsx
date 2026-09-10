import { Button } from "@/shared/components/forms";
import { Input } from "@/shared/components/forms";
import type { ChannelPartnerRegistrationRequest } from "../../../channelPartner/api/register.request";
import OtpInput from "@/shared/components/OtpInput/OtpInput";
import { Headset, ShieldCheck, Zap } from "lucide-react";
import MobileNumberInput from "@/shared/components/forms/MobileNumberInput";

interface RegistrationBasicInfoStepProps {
  formData: {
    values: ChannelPartnerRegistrationRequest;
    errors: Partial<Record<keyof ChannelPartnerRegistrationRequest, string>>;
    handleFieldChange: <K extends keyof ChannelPartnerRegistrationRequest>(
      field: K,
      value: ChannelPartnerRegistrationRequest[K],
    ) => void;
  };
  otp: {
    state: {
      isSent: boolean;
      isVerified: boolean;
      isLoading: boolean;
      value: string;
    };
    sendOtp: () => Promise<void>;
    verifyOtp: () => void;
    handleOtpChange: (otp: string) => void;
  };
}

export default function RegistrationBasicInfoStep({
  formData,
  otp,
}: RegistrationBasicInfoStepProps) {
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (otp.state.isSent && otp.state.value.length === 4) {
            otp.verifyOtp();
          }
        }}
      >
        <div className="mt-10 space-y-6">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            required
            value={formData.values.Name}
            onChange={(e) => {
              formData.handleFieldChange("Name", e.target.value);
            }}
            error={formData.errors.Name}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_120px]">
            <MobileNumberInput
              label="Mobile Number"
              mobileNumber={formData.values.MobileNumber ?? ""}
              countryCode={formData.values.MobileNumberCountryCode ?? "+91"}
              required
              error={formData.errors.MobileNumber}
              onMobileChange={async (value) => {
                formData.handleFieldChange("MobileNumber", value);
              }}
              onCountryCodeChange={(value) =>
                formData.handleFieldChange("MobileNumberCountryCode", value)
              }
            />
            <div className="flex items-end">
              <Button
                type="button"
                className="h-11 w-full"
                variant="outline"
                onClick={otp.sendOtp}
              >
                Send OTP
              </Button>
            </div>
          </div>
          {otp.state.isSent && (
            <OtpInput
              length={4}
              value={otp.state.value}
              onChange={otp.handleOtpChange}
            />
          )}
          <Button
            className="mt-2 h-12 w-full rounded-xl"
            style={{ width: "stretch" }}
            disabled={!(otp.state.isSent && otp.state.value.length === 4)}
            type="submit"
          >
            Continue
          </Button>
        </div>
      </form>
      <div className="mt-12 grid grid-cols-3 gap-4 border-t border-slate-200 pt-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-3 rounded-full bg-sky-100 p-3">
            <ShieldCheck className="text-sky-600" size={20} />
          </div>

          <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            RERA Verified
          </span>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="mb-3 rounded-full bg-sky-100 p-3">
            <Zap className="text-sky-600" size={20} />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            Fast Approval
          </span>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="mb-3 rounded-full bg-sky-100 p-3">
            <Headset className="text-sky-600" size={20} />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            Dedicated Manager
          </span>
        </div>
      </div>
    </>
  );
}
