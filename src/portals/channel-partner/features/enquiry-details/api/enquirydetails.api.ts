export const EnquiryApi = {
  PULL_BOOKING: (projectId: string): string =>
    `/ChannelPartner/projects/${projectId}/booking`,
  PULL_ENQUIRY: (projectId: string): string =>
    `/ChannelPartner/projects/${projectId}/enquiries`,
  PULL_BROKERAGE: (projectId: string): string =>
    `/ChannelPartner/projects/${projectId}/brokerage`,
};

export type EnquiryApiKeys = keyof typeof EnquiryApi;
