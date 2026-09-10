export const ChannelPartnerDashboardApi = {
  Pulldashboard: "/ChannelPartner/dashboard",
  AddInvoice: "/brokerage/addInvoice",
} as const;

export type AuthenticationApiKeys = keyof typeof ChannelPartnerDashboardApi;
