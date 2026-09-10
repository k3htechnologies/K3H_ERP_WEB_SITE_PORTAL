export const LoginApi = {
  ValidateMobileNumber: "/auth/login-sendOtp",
  ValidateOTP: "/auth/login-otp-validation",
  REFRESH_TOKEN: "/auth/refresh-token",
} as const;

export type LoginApiKeys = keyof typeof LoginApi;
