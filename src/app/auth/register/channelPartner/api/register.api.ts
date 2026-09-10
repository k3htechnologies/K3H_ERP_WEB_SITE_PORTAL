export const ChannelPartnerRegistrationApi = {
  Send_OTP: "/auth/registration-sendOtp",
  Verify_OTP: "/auth/registration-otp-validation",
  Register: "/ChannelPartner/channelpartner-registration",
} as const;

export type ChannelPartnerRegistrationApiKeys =
  keyof typeof ChannelPartnerRegistrationApi;
