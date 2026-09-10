export interface ProjectConfiguration {
  FlatConfiguration: string;
  RERACarpetAreaSqFt: number;
}

export interface ProjectInfo {
  ProjectName: string;
  ProjectPhotoURL: string;
  ProjectLocation: string;
  RERANumber: string;
  ProjectStatus: string;
  RERAComplitionDate: string | null;
  ProjectAreaInSqft: number;
  ProjectScheme: string;
  BussinessCategory: string;
  SiteContactName: string;
  SiteContactMobileNumber: string;
  Amenities: string | null;
  Configurations: ProjectConfiguration[];
}

export type ProjectDetailsResponse = ProjectInfo[];