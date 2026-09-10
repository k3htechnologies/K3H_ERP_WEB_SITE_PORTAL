export interface BrokerageInvoiceData {
  BrokerageInvoiceId: number | 0;
  Uniquekey: string | null;
  ProjectId: number | 0;
  BookingId: number | 0;
  InvoiceNumber: string | "";
  InvoiceDate: string | null;
  UploadInvoiceURL: string;
  BankListMasterId: number | 0;
  AccountName: string | null;
  AccountNumber: string;
  IFSCCode: string | null;
  InvoiceAmount: number | 0;
  PaymentAmount: number | 0;
  DueDate: string | null;
  Remark: string | null;
  BankName: string | null;
  ApprovalStatus: string;
  IsApproval: boolean;
  CreatedById: number | 0;
  CreatedBy: string | "";
  CreatedDate: string | null;
  ModifiedById: number | 0;
  ModifiedBy: string | "";
  ModifiedDate: string | null;
  LastModifiedBy: string | "";
  LastModifiedDate: string | null;
}

export type AddInvoiceResponse = BrokerageInvoiceData[];
export type PullInvoiceResponse = BrokerageInvoiceData[];
export type BrokerageInvoiceDeleteResponse = number[];
