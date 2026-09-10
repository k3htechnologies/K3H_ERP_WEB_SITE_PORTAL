export const UserApi = {
  PullDetails: "/ChannelPartner/channelpartner-details",
} as const;

export type AuthenticationApiKeys = keyof typeof UserApi;
