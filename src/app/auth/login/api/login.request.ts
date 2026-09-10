export interface MobileValidationRequest {
  MobileNumber: string;
  Role: string;
}

export interface OTPValidationRequest extends MobileValidationRequest {
  OTP: string;
}
