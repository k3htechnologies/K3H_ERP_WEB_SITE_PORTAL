import { createQueryParams } from "@/shared/utils/createQueryParams";
import type { FilterWithPaginationBankListMasterRequest } from "./bankListMaster.request";
import { apiClient } from "@/app/http/api-client";
import type { ApiResponse } from "@/app/http/types";
import type { BankListMasterListResponse } from "./bankListMaster.response";
import { BanKListMasterApi } from "./bankListMaster.api";

export const bankListMasterService = {
  apiCallPullBankListMaster: async (
    params: FilterWithPaginationBankListMasterRequest,
  ): Promise<ApiResponse<BankListMasterListResponse>> => {
    const queryParams = createQueryParams({
      PageSize: params.PageSize,
      PageNumber: params.PageNumber,
      BankListMasterId: params.BankListMasterId,
      BankName: params.BankName,
      SortBy: params.SortBy,
      ExportType: params.ExportType,
    });
    return apiClient.get<BankListMasterListResponse>(
      `${BanKListMasterApi.PULL}?${queryParams}`,
    );
  },

  fetchBankListMasterDropdown: async function (
    pageNumber: number,
    params?: { value?: string },
  ) {
    try {
      const request: FilterWithPaginationBankListMasterRequest = {
        PageSize: 20,
        PageNumber: pageNumber,
        BankName: params?.value || "",
      };
      const apiResponse =
        await bankListMasterService.apiCallPullBankListMaster(request);
      const itemList = (apiResponse?.Data || []).map((d: any) => ({
        label: d.BankNameWithCode,
        value: String(d.BankListMasterId),
      }));
      return {
        totalNumberOfRecord:
          apiResponse?.TotalNumberOfRecord ?? itemList.length,
        itemList,
      };
    } catch (error) {
      console.error("FETCH BANK LIST MASTER DROPDOWN ERROR", error);
      return {
        totalNumberOfRecord: 0,
        itemList: [] as { label: string; value: string }[],
      };
    }
  },
};
