export const BanKListMasterApi = {
  PULL: "/bank",
} as const;

export type BanKListMasterApiKeys = keyof typeof BanKListMasterApi;
