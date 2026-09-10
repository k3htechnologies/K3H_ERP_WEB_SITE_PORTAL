import { useFetch } from "@/shared/hooks/useFetch";
import type { PaymentListResponse } from "../api/enquirydetails.response";
import { createQueryParams } from "@/shared/utils/createQueryParams";
import { InvoiceApi } from "@/shared/services/invoice/invoice.api";

export interface PaymentParams {
  PageSize: number;
  PageNumber: number;
  ProjectId?: string;
  BookingId?: string;
  BrokerageInvoiceId?: number;
  PaidBrokerageBookingId?: number;
  InvoiceNumber?: string | null;
  SortBy?: string;
  ExportType?: "Excel" | "PDF";
}

export const useFetchPayments = (params: PaymentParams) => {
  const queryParams = createQueryParams({
    PageSize: params.PageSize ?? 100,
    PageNumber: params.PageNumber,
    ProjectId: params.ProjectId,
    BookingId: params.BookingId,
    BrokerageInvoiceId: params.BrokerageInvoiceId,
    PaidBrokerageBookingId: params.PaidBrokerageBookingId,
    InvoiceNumber: params.InvoiceNumber,
    SortBy: params.SortBy,
    ExportType: params.ExportType,
  });
  return useFetch<PaymentListResponse>(
    `${InvoiceApi.PULL_PAYMENTS}?${queryParams}`,
    "Payments are Loading",
  );
};
