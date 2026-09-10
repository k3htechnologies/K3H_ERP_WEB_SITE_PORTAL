export interface FilterWithPaginationBankListMasterRequest {
  PageSize: number;
  PageNumber: number;
  BankListMasterId?: number;
  BankName?: string;
  SortBy?: string;
  ExportType?: "Excel" | "PDF";
}
