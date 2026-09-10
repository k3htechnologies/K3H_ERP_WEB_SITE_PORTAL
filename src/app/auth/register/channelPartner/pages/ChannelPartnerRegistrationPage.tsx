import useToast from "@/app/providers/ToastProvider/ToastProvider";
import RegistrationBasicInfoStep from "../../shared/components/RegistrationBasicInfoStep/RegistrationBasicInfoStep";
import {
  useChannelPartnerRegistration,
  type CurrentStep,
} from "../hooks/useChannelPartnerRegistration";
import { ToastContainer } from "@/shared/components/Toast";
import BusinessInformationStep from "../components/BusinessInformationStep/BusinessInformationStep";
import ProgressBar from "../../shared/components/ProgressBar/ProgressBar";
import ProfessionalInformationStep from "../components/ProfessionalInformationStep/ProfessionalInformationStep";

type StepHeading = {
  heading: string;
  subHeading: string;
};

export const STEP_HEADINGS: Record<CurrentStep, StepHeading> = {
  BASIC: {
    heading: "Become a Channel Partner",
    subHeading:
      "Join our trusted partner network and access exclusive projects & benefits.",
  },
  BUSINESS: {
    heading: "Business Information",
    subHeading: "Tell us about your professional firm.",
  },
  PROFESSIONAL: {
    heading: "Professional Details",
    subHeading:
      "Configure your partner profile to receive tailored project updates and commission structures.",
  },
};

const ChannelPartnerRegistrationPage = () => {
  const {
    step,
    form,
    otp,
    backFromBusinessInformation,
    continueWithBusinessInformation,
    register,
    isSubmitting,
  } = useChannelPartnerRegistration();
  const { toasts, removeToast } = useToast();

  return (
    <>
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
      <div
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/registration-background.jpg")',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(109.67deg, rgba(0,0,0,0.45) -2.12%, rgba(255,255,255,0.45) 47.39%, rgba(0,0,0,0.45) 100%)",
          }}
        />
        {/* Content */}
        <div className="relative z-10">
          <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8">
            <div
              className={`w-full ${step.current === "PROFESSIONAL" ? "max-w-200" : "max-w-150"} rounded-[30px] border border-white/30 bg-white/70 p-8 shadow-2xl backdrop-blur-xl`}
            >
              {/* Logo */}
              <img
                src="/Hrishabraj-logo.png"
                alt="Logo"
                className="mb-4 h-10 object-contain"
              />
              <h1 className="text-3xl font-bold text-slate-900">
                {STEP_HEADINGS[step.current].heading}
              </h1>
              <p className="mt-3 text-lg leading-8 text-slate-600">
                {STEP_HEADINGS[step.current].subHeading}
              </p>
              {/* Progress */}
              <ProgressBar currentStep={step.currentStepCount} totalSteps={3} />
              {step.current === "BASIC" && (
                <RegistrationBasicInfoStep formData={form} otp={otp} />
              )}
              {step.current === "BUSINESS" && (
                <BusinessInformationStep
                  formData={form}
                  continueWithBusinessInformation={
                    continueWithBusinessInformation
                  }
                  backFromBusinessInformation={backFromBusinessInformation}
                />
              )}
              {step.current === "PROFESSIONAL" && (
                <ProfessionalInformationStep
                  formData={form}
                  goToBusinessInformation={() => {}}
                  submitRegistration={register}
                  isSubmitting={isSubmitting}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChannelPartnerRegistrationPage;
