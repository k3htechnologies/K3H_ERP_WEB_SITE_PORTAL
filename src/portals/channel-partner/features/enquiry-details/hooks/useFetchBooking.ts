import { useFetch } from "@/shared/hooks/useFetch";
import { EnquiryApi } from "../api/enquirydetails.api";
import { createQueryParams } from "@/shared/utils/createQueryParams";
import type { BookingListResponse } from "../api/enquirydetails.response";

interface FetchBookingParams {
  ProjectId: string;
  PageSize?: number;
  PageNumber?: number;
  IsCheckPermission?: boolean;
  Name?: string;
  mobileNumber: string;
  fromDate: string;
  toDate: string;
  wing: string;
  flat: string;
  floor: string;
  source: string;
  subSource: string;
  subSubSource: string;
  agreementValue: string;
  bookingType: string;
  sortBy: string | undefined;
}

export const useFetchBooking = (params: FetchBookingParams) => {
  const {
    ProjectId,
    PageSize,
    PageNumber,
    IsCheckPermission,
    Name,
    mobileNumber,
    fromDate,
    toDate,
    wing,
    flat,
    floor,
    source,
    subSource,
    subSubSource,
    agreementValue,
    bookingType,
    sortBy,
  } = params;

  const queryParams = createQueryParams({
    PageSize: PageSize ?? 20,
    PageNumber: PageNumber ?? 1,
    IsCheckPermission: IsCheckPermission ?? true,
    ApplicantName: Name,
    ApplicantMobileNumber: mobileNumber,
    FromDate: fromDate,
    ToDate: toDate,
    Wing: wing,
    Flat: flat,
    Floor: floor,
    Source: source,
    SubSource: subSource,
    SubSubSource: subSubSource,
    AgreementValue: agreementValue,
    BookingType: bookingType,
    SortBy: sortBy,
  });

  return useFetch<BookingListResponse>(
    `${EnquiryApi.PULL_BOOKING(ProjectId)}?${queryParams.toString()}`,
    "Bookings are loading...",
  );
};
