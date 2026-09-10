export interface ChannelPartnerRegistrationRequest {
  ChannelPartnerId: string;
  Uniquekey: string;
  Name: string;
  EmailId?: string;
  MobileNumberCountryCode: string;
  MobileNumber: string;
  CompanyName: string;
  FirmsType: string;
  Designation: string;
  Type: string;
  RERANumber: string;
  Speciality: string;
  OfficeAddress?: string;
  CountryMasterId?: string;
  DistrictMasterId?: string;
  StateMasterId?: string;
  CityMasterId?: string;
  VillageMasterId?: string;
  IsTermsAccepted?: boolean;
}
