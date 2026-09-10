import { useFetch } from "@/shared/hooks/useFetch";
import { createQueryParams } from "@/shared/utils/createQueryParams";
import { InvoiceApi } from "@/shared/services/invoice/invoice.api";
import type { PullInvoiceResponse } from "@/shared/services/invoice/invoice.response";
import type { FilterWithPaginationBrokerageInvoiceRequest } from "@/shared/services/invoice/invoice.request";

export const useFetchInvoices = (
  params: FilterWithPaginationBrokerageInvoiceRequest,
) => {
  const queryParams = createQueryParams({
    PageNumber: params.PageNumber ?? 1,
    pageSize: params.PageSize ?? 10,
    ProjectId: params.ProjectId,
    BookingId: params.BookingId,
    BrokerageInvoiceId: params.BrokerageInvoiceId,
    InvoiceNumber: params.InvoiceNumber,
    SortBy: params.SortBy,
    ExportType: params.SortBy,
  });
  return useFetch<PullInvoiceResponse>(
    `${InvoiceApi.PULL_INVOICES}?${queryParams}`,
    "Invoices are Loading",
  );
};
