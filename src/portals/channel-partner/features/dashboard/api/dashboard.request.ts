export interface UploadInvoiceRequest {
  projectId: number;
  uniqueKey: string;
  bookingId: number;
  brokerageInvoiceId: number;
  invoiceNumber: string;
  invoiceDate: string;
  invoiceAmount: number;
  bankListMasterId: number;
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  uploadInvoiceURL: string;
  removeUploadInvoiceURL: string;
  remark: string;
  bankName: string;
}
