import { useFetch } from "@/shared/hooks/useFetch";
import { EnquiryApi } from "../api/enquirydetails.api";
import { createQueryParams } from "@/shared/utils/createQueryParams";
import type { BookingListResponse } from "../api/enquirydetails.response";

interface FetchBrokerageParams {
  ProjectId: string;
  PageSize?: number;
  PageNumber?: number;
  IsCheckPermission?: boolean;
  Name?: string;
  channelPartnerCompanyName: string;
  channelPartnerMobileNumber: string;
  applicantName: string;
  applicantMobileNumber: string;
  wing: string;
  floor: string;
  flat: string;
  agreementValue: string;
  bookingType: string;
  fromDate: string;
  toDate: string;
  sortBy: string | undefined;
}
export const useFetchBrokerage = (params: FetchBrokerageParams) => {
  const {
    ProjectId,
    PageNumber,
    PageSize,
    IsCheckPermission,
    Name,
    channelPartnerCompanyName,
    channelPartnerMobileNumber,
    applicantName,
    applicantMobileNumber,
    wing,
    floor,
    flat,
    agreementValue,
    bookingType,
    fromDate,
    toDate,
    sortBy,
  } = params;

  const queryParams = createQueryParams({
    PageSize: PageSize ?? "20",
    PageNumber: PageNumber ?? "1",
    IsCheckPermission: IsCheckPermission,
    ChannelPartnerName: Name,
    ApplicantMobileNumber: applicantMobileNumber,
    ApplicantName: applicantName,
    ChannelPartnerMobileNumber: channelPartnerMobileNumber,
    ChannelPartnerCompanyName: channelPartnerCompanyName,
    Floor: floor,
    Wing: wing,
    Flat: flat,
    AgreementValue: agreementValue,
    FromDate: fromDate,
    ToDate: toDate,
    BookingType: bookingType,
    SortBy: sortBy,
  });

  return useFetch<BookingListResponse>(
    `${EnquiryApi.PULL_BROKERAGE(ProjectId)}?${queryParams.toString()}`,
    "Brokerages are loading...",
  );
};
