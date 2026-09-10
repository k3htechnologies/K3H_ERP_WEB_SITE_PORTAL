export interface ChannelPartnerDashboardResponse {
  Summary: Summary;
  ProjectWiseBooking: ProjectWiseBooking[];
  EnquiryBookingTrend: EnquiryBookingTrend[];
  BrokerageSummary: BrokerageSummary;
  RecentBookings: RecentBooking[];
  ProjectGallery: ProjectGalleryItem[];
  StageCounts: StageCount[];
}

export interface Summary {
  TotalBrokerageAmount: number;
  TotalEnquiries: number;
  TotalBookings: number;
  CurrentWeekEnquiries: number;
  CurrentWeekBookings: number;
}

export interface ProjectWiseBooking {
  ProjectId: number;
  ProjectName: string;
  ProjectPhotoURL: string;
  BookingCount: number;
  TotalBookingValue: number;
  TotalBrokerageValue: number;
}

export interface EnquiryBookingTrend {
  MonthNo: number;
  MonthName: string;
  Enquiries: number;
  SiteVisit: number;
  Booking: number;
}

export interface BrokerageSummary {
  TotalBrokerage: number;
  PaidBrokerage: number;
  UnderProcessBrokerage: number;
  AmountToBePaid: number;
  InvoiceCount: number;
  PendingCount: number;
}

export interface RecentBooking {
  ProjectName: string;
  ApplicantName: string;
  AgreementValue: number;
  BrokeragePercentage: number;
  BrokerageAmount: number;
  InvoiceAmount: number;
  AmountPaid: number;
  PendingAmount: number;
  BookingId: number;
  ProjectId: number;
  UnitNo: string;
}

export interface ProjectGalleryItem {
  ProjectId: number;
  ProjectName: string;
  ProjectPhotoURL: string;
}

export interface StageCount {
  FinalStage: string;
  TotalCount: number;
}
