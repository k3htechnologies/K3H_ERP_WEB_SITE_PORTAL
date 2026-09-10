import type { ApiResponse } from "@/app/http/types";

export interface PullMenuRequest {
  EmployeeId: number | 0;
}

export interface ModuleData {
  ModulesMasterId: number | 0;
  ModuleName: string | "";
  Icon: string | "";
  Path: string | "";
  SubModuleData: SubModuleData[];
}

export interface SubModuleData {
  SubModulesMasterId: number | 0;
  SubModuleName: string | "";
  Icon: string | "";
  Path: string | "";
  IsAction: boolean | false;
  IsView: boolean | false;
  IsExport: boolean | false;
  SubSubModuleData: SubSubModuleData[];
}
export interface SubSubModuleData {
  SubSubModulesMasterId: number | 0;
  SubSubModuleName: string | "";
  Icon: string | "";
  Path: string | "";
  IsDisplay: boolean | false;
  IsAction: boolean | false;
  IsView: boolean | false;
  IsExport: boolean | false;
}

export type ModuleDataListResponse = ApiResponse<ModuleData[]>;
export interface EmployeeData {
  UserId: number;
  UniqueKey: string;
  EmployeeCode: string;
  FullName: string;
  PersonalMobileNumber: string;
  Department: string;
  DepartmentMasterId: number;
  Designation: string;
  DesignationMasterId: number;
  BranchMasterId: number;
  Branch: string;
  EmailId: string;
  OfficeEmailId: string;
  IsUpdateEmployee: boolean;
  ProfilePhotoURL: string | "";
  ClientRegistrationId: number;
  LastLogin: string;
  Token: string;
  ModuleData: ModuleData;
  ProjectData: ProjectData[];
}

export interface ProjectData {
  ProjectId: number;
  Uniquekey: string;
  ProjectName: string;
  ProjectLocation: string;
  ProjectPhotoURL: string;
  CompanyId: string;
  CTSNumber: string;
  EmployeeId: string;
  NumberOfEmployee: number;
  IsRedevelopment: boolean;
  BussinessCategory: string;
  ProjectShortName: string;
  CountryMasterId: number;
  CountryName: string;
  DistrictMasterId: number;
  DistrictName: string;
  StateMasterId: number;
  StateName: string;
  CityMasterId: number;
  CityName: string;
  ZipCode: string;
  ProjectScope: string;
  ProjectEstimateCost: number;
  ProjectAreaInSqft: string;
  OnGoingBudgetCost: string;
  SurveyDate: string | null;
  ExpectedStartDate: string | null;
  ExecutionStartDate: string | null;
  SiteContactMobileNumber: string;
  SiteContactName: string;
  ProjectStatus: string;
  RERANumber: string;
  RERACertificateDate: string | null;
  RERAComplitionDate: string | null;
  ProjectScheme: string;
  ProjectSubScheme: string;
  GoogleLocation: string;
  NotificationCount: number;
  ClientRegistrationId: number;
  CreatedById: number;
  CreatedBy: string;
  CreatedDate: string;
  ModifiedById: number;
  ModifiedBy: string;
  ModifiedDate: string;
  EmployeeData: any[];
  CompanyData: any[];
  ProjectWithBankDetailsData: any[];
}

export type AuthenticationResponse = ApiResponse<EmployeeData[]>;
