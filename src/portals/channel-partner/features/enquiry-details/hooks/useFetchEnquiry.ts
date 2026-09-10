import { useFetch } from "@/shared/hooks/useFetch";
import { EnquiryApi } from "../api/enquirydetails.api";
import { createQueryParams } from "@/shared/utils/createQueryParams";
import type { BookingListResponse } from "../api/enquirydetails.response";

interface FetchEnquiryParams {
  ProjectId: string;
  PageSize?: number;
  PageNumber?: number;
  IsCheckPermission?: boolean;
  Name?: string;
  enquiryCode: string;
  mobileNumber: string;
  budget: string;
  requirementType: string;
  source: string;
  subSource: string;
  subSubSource: string;
  channelPartnerMobile: string;
  nationality: string;
  currentLocation: string;
  customerClassification: string;
  ethnicity: string;
  salesAdvisor: string;
  sourcingManager: string;
  fromDate: string;
  toDate: string;
  accomodation: string;
  followUpDays: string;
  finalStage: string;
  sortBy: string | undefined;
}

export const useFetchEnquiry = (params: FetchEnquiryParams) => {
  const {
    ProjectId,
    PageSize,
    PageNumber,
    IsCheckPermission,
    Name,
    enquiryCode,
    mobileNumber,
    budget,
    requirementType,
    source,
    subSource,
    subSubSource,
    channelPartnerMobile,
    nationality,
    currentLocation,
    customerClassification,
    ethnicity,
    salesAdvisor,
    sourcingManager,
    fromDate,
    toDate,
    accomodation,
    followUpDays,
    finalStage,
    sortBy,
  } = params;

  const queryParams = createQueryParams({
    PageSize: PageSize ?? 20,
    PageNumber: PageNumber ?? 1,
    IsCheckPermission: IsCheckPermission ?? true,
    Name,
    SystemGeneratedCode: enquiryCode,
    MobileNumber: mobileNumber,
    Budget: budget,
    RequirementType: requirementType,
    Source: source,
    SubSource: subSource,
    SubSubSource: subSubSource,
    ChannelPartnerMobileNumber: channelPartnerMobile,
    Nationality: nationality,
    CurrentLocation: currentLocation,
    CustomerClassification: customerClassification,
    Ethnicity: ethnicity,
    SalesAdvisor: salesAdvisor,
    SourcingManager: sourcingManager,
    FromDate: fromDate,
    ToDate: toDate,
    Accommodation: accomodation,
    EnquiryFollowUpDays: followUpDays,
    FinalStage: finalStage,
    SortBy: sortBy,
  });
  return useFetch<BookingListResponse>(
    `${EnquiryApi.PULL_ENQUIRY(ProjectId)}?${queryParams.toString()}`,
    "Enquiries are loading...",
  );
};
