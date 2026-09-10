import { apiClient } from "@/app/http/api-client";
import { ChannelPartnerRegistrationApi } from "../api/register.api";
import { createQueryParams } from "@/shared/utils/createQueryParams";
import type { ApiResponse } from "@/app/http/types";
import { Role } from "@/shared/constants";

export const ChannelPartnerRegisterService = {
  apiCallSendOTP: async (
    mobileNumber: string,
  ): Promise<ApiResponse<string>> => {
    const queryParams = createQueryParams({
      MobileNumber: mobileNumber,
      Module: "CHANNEL_PARTNER",
    });
    return apiClient.get<string>(
      `${ChannelPartnerRegistrationApi.Send_OTP}?${queryParams}`,
    );
  },
  apiCallVerifyOTP: async (
    mobileNumber: string,
    otp: string,
  ): Promise<ApiResponse<boolean>> => {
    const queryParams = createQueryParams({
      MobileNumber: mobileNumber,
      OTP: otp,
      Role: Role.CP,
    });
    return apiClient.get<boolean>(
      `${ChannelPartnerRegistrationApi.Verify_OTP}?${queryParams}`,
    );
  },
  apiCallChannelPartnerRegistration: async (formData: FormData) => {
    return apiClient.post(
      `${ChannelPartnerRegistrationApi.Register}`,
      formData,
    );
  },
};
