import { apiClient } from "@/app/http/api-client";
import { LoginApi } from "../api/login.api";
import { createQueryParams } from "@/shared/utils/createQueryParams";
import type { EmployeeData } from "../api/login.response";
import type {
  MobileValidationRequest,
  OTPValidationRequest,
} from "../api/login.request";

export const LoinService = {
  apicallIsValidMobileNumber: async (params: MobileValidationRequest) => {
    const queryParams = createQueryParams({
      MobileNumber: params.MobileNumber,
      Role: params.Role,
    });
    return apiClient.get<string>(
      `${LoginApi.ValidateMobileNumber}?${queryParams.toString()}`,
    );
  },
  apicallIsValidOTP: (params: OTPValidationRequest) => {
    const queryParams = createQueryParams({
      MobileNumber: params.MobileNumber,
      OTP: params.OTP,
      Role: params.Role,
    });
    return apiClient.get<EmployeeData[]>(
      `${LoginApi.ValidateOTP}?${queryParams.toString()}`,
    );
  },
};
