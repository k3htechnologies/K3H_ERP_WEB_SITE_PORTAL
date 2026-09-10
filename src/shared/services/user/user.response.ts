export type VerificationStatus = "Verified" | "Non Verified";

export type FirmType =
  | "LLP"
  | "Partnership"
  | "Proprietorship"
  | "Private Limited"
  | "Public Limited";

export interface UserProfile {
  ChannelPartnerId: number;
  Uniquekey: string;
  ModuleAbbreviationId: number;
  SystemGeneratedCode: string;

  Name: string;
  EmailId: string;
  MobileNumber: string;
  MobileNumberCountryCode: string;
  AlternativeMobileNumber: string;

  CompanyName: string;
  Designation: string;
  Type: string;
  FirmsType: FirmType;
  Speciality: string;

  OfficeAddress: string;
  WebsiteUrl: string;
  DateOfBirth: string | null;

  PanNumber: string;
  PanCardUrl: string;

  AdharCardNumber: string;
  AdharCardUrl: string;

  Reranumber: string;
  Gstnumber: string;
  GstcertificateUrl: string;

  CountryMasterId: number;
  StateMasterId: number;
  DistrictMasterId: number;
  CityMasterId: number;
  VillageMasterId: number;

  PrimaryProjectPortfolioId: number;
  SecondaryProjectPortfolioId: string;

  MicromarketProximity: string;

  ClientRegistrationId: number;

  IsVerified: VerificationStatus;
  MissingFields: string;

  IsActive: boolean;
  IsDeleted: boolean;

  CreatedById: number;
  CreatedDate: string;

  ModifiedById: number;
  ModifiedDate: string;

  DeletedById: number | null;
  DeletedDate: string | null;

  ChannelPartnerPhotoUrl?: string;
}

export type UserProfileResponse = UserProfile[];
