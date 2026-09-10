export const InvoiceApi = {
  PULL_INVOICES: "/brokerage/brokerageInvoice",
  ADD_INVOICE: "/brokerage/addInvoice",
  UPDATE_INVOICE: "/brokerage/updateInvoice",
  DELETE_INVOICE: "/brokerage/deleteInvoice",
  PULL_PAYMENTS: "/brokerage/paidBrokerageInvoice",
};

export type EnquiryApiKeys = keyof typeof InvoiceApi;
