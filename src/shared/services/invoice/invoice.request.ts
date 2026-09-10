export interface FilterWithPaginationBrokerageInvoiceRequest {
  PageSize: number;
  PageNumber: number;
  ProjectId?: string;
  BookingId?: string;
  BrokerageInvoiceId?: string;
  InvoiceNumber?: string;
  SortBy?: string;
  ExportType?: "Excel" | "PDF";
}

export interface DeleteBrokerageInvoiceRequest {
  BrokerageInvoiceId: number;
  BookingId: number;
  Uniquekey: string;
  ProjectId: number;
}
