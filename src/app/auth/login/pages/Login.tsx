import { useState } from "react";
import appLogo from "@/assets/images/appLogo.png";
import useToast from "@/app/providers/ToastProvider/ToastProvider";
import { useLoading } from "@/app/providers/LoadingProvider/LoadingProvider";
import { ToastContainer } from "@/shared/components/Toast";
import { useAuth } from "@/app/providers/AuthProvider/AuthProvider";
import { useDashboardNavigation } from "@/shared/hooks/useDashboardNavigation";
import { useNavigate, useSearchParams } from "react-router-dom";
import type {
  MobileValidationRequest,
  OTPValidationRequest,
} from "../api/login.request";
import { LoinService } from "../service/login.service";
import { Role } from "@/shared/constants";

export default function LoginPage() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showError, showSuccess, toasts, removeToast } = useToast();
  const { login } = useAuth();
  const { runWithLoader } = useLoading();
  const dashBoardNavigation = useDashboardNavigation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const handleSendOtp = async () => {
    runWithLoader(async () => {
      try {
        setLoading(true);
        const role = searchParams.get("role");
        const params: MobileValidationRequest = {
          MobileNumber: mobileNumber,
          Role: role ? role : "",
        };
        const response = await LoinService.apicallIsValidMobileNumber(params);
        if (
          response.IsSuccess &&
          response.SuccessMessage &&
          response.Data?.length
        ) {
          showSuccess(response?.Data);
          setShowOtp(true);
        }
      } finally {
        setLoading(false);
      }
    }, "Validating contact...");
  };

  const handleVerifyOtp = async () => {
    runWithLoader(async () => {
      try {
        setLoading(true);
        const role = searchParams.get("role");
        const params: OTPValidationRequest = {
          MobileNumber: mobileNumber,
          Role: role ? role : "",
          OTP: otp,
        };
        const response = await LoinService.apicallIsValidOTP(params);
        if (
          response &&
          response.IsSuccess &&
          response.Data &&
          response.Data.length
        ) {
          // login
          const loggedInUser = await login(response.Data[0]);
          showSuccess("Login Successful", `Welcome, ${loggedInUser.id}`);
          if (loggedInUser?.role) dashBoardNavigation(loggedInUser.role);
        } else {
          showError("Invalid OTP");
        }
      } finally {
        setLoading(false);
      }
    }, "Validating OTP...");
  };

  const handleRegister = () => {
    const role = searchParams.get("role");
    if (role === Role.CP) {
      navigate("/register/channel-partner");
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
      <div className="relative min-h-screen overflow-hidden bg-slate-50">
        <div className="absolute inset-0">
          <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
        </div>
        <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
          <div className=" w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
            {" "}
            <div className="text-center">
              <img src={appLogo} alt="Logo" className="mx-auto h-20 w-auto" />
              <h1 className="mt-6 text-3xl font-bold text-slate-900">
                Welcome Back
              </h1>
              <p className="mt-2 text-sm text-slate-500">Sign in to continue</p>
            </div>
            {!showOtp ? (
              <form>
                <div className="mt-8">
                  <label className=" mb-2 block text-sm font-medium text-slate-700">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <span className=" absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) =>
                        setMobileNumber(
                          e.target.value.replace(/\D/g, "").slice(0, 10),
                        )
                      }
                      placeholder="9876543210"
                      className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    pl-14
                    pr-4
                    outline-none

                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                  "
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-sm text-slate-500">
                      Don't have an account?
                    </span>
                    <button
                      type="button"
                      onClick={handleRegister}
                      className="ml-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      Register
                    </button>
                  </div>
                  <button
                    type="submit"
                    onClick={handleSendOtp}
                    disabled={mobileNumber.length !== 10 || loading}
                    className=" mt-6 h-12 w-full rounded-xl bg-blue-600 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </button>
                </div>
              </form>
            ) : (
              <form>
                <div className="mt-8">
                  <div className="text-center">
                    <p className="text-sm text-slate-500">
                      Enter the OTP sent to
                    </p>
                    <p className="mt-1 font-semibold">+91 {mobileNumber}</p>
                  </div>
                  <input
                    type="text"
                    value={otp}
                    maxLength={4}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))
                    }
                    placeholder="Enter OTP"
                    className=" mt-6 h-12 w-full rounded-xl border border-slate-300 text-center text-lg tracking-[0.5em] focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none"
                  />
                  <button
                    type="submit"
                    onClick={handleVerifyOtp}
                    disabled={otp.length !== 4 || loading}
                    className=" mt-6 h-12 w-full rounded-xl bg-blue-600 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowOtp(false)}
                    className=" mt-4 w-full text-sm text-blue-600"
                  >
                    Change Mobile Number
                  </button>
                </div>
              </form>
            )}
            {/* Footer */}
            <div className="mt-8 border-t border-slate-100 pt-4">
              <div className="flex justify-center gap-4 text-xs text-slate-500">
                <span>🔒 Secure Login</span>
                <span>✓ Encrypted</span>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-slate-400">Need assistance?</p>

                <div className="mt-1 text-xs text-slate-500">
                  it@hrishabraj.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
