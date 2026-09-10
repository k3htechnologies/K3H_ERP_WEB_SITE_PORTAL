import type { ApiResponse } from "@/app/http/types";
import type {
  AddInvoiceResponse,
  BrokerageInvoiceDeleteResponse,
  PullInvoiceResponse,
} from "./invoice.response";
import { apiClient } from "@/app/http/api-client";
import { InvoiceApi } from "./invoice.api";
import type {
  DeleteBrokerageInvoiceRequest,
  FilterWithPaginationBrokerageInvoiceRequest,
} from "./invoice.request";
import { createQueryParams } from "@/shared/utils/createQueryParams";

export const InvoiceService = {
  apiCallAddInvoice: async (
    formData: FormData,
  ): Promise<ApiResponse<AddInvoiceResponse>> => {
    return apiClient.post<AddInvoiceResponse>(
      `${InvoiceApi.ADD_INVOICE}`,
      formData,
    );
  },
  apiCallUpdateInvoice: async (
    formData: FormData,
    brokerageInvoiceId: string,
    uniqueKey: string,
  ) => {
    const queryParams = createQueryParams({
      brokerageInvoiceId,
      uniqueKey,
    });
    return apiClient.patch(
      `${InvoiceApi.UPDATE_INVOICE}?${queryParams}`,
      formData,
    );
  },
  apiCallPullInvoice: async (
    params: FilterWithPaginationBrokerageInvoiceRequest,
  ): Promise<ApiResponse<PullInvoiceResponse>> => {
    const queryParams = createQueryParams({
      pageSize: params.PageSize ?? 10,
      pageNumber: params.PageNumber ?? 1,
      ProjectId: params.ProjectId,
      BookingId: params.BookingId,
      BrokerageInvoiceId: params.BrokerageInvoiceId,
      InvoiceNumber: params.InvoiceNumber,
      SortBy: params.SortBy,
      ExportType: params.ExportType,
    });
    return apiClient.get<PullInvoiceResponse>(
      `${InvoiceApi.PULL_INVOICES}?${queryParams}`,
    );
  },
  apiCallDeleteInvoice: async (params: DeleteBrokerageInvoiceRequest) => {
    const queryParams = createQueryParams({
      BrokerageInvoiceId: params.BrokerageInvoiceId ?? 0,
      BookingId: params.BookingId ?? 0,
      ProjectId: params.ProjectId ?? 0,
      UniqueKey: params.Uniquekey ?? "",
    });
    return apiClient.delete<BrokerageInvoiceDeleteResponse>(
      `${InvoiceApi.DELETE_INVOICE}?${queryParams}`,
    );
  },
};
