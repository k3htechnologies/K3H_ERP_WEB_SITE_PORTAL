export const Role = {
  ARCHITECT: "ARCHITECT",
  VENDOR: "VENDOR",
  CUSTOMER: "CUSTOMER",
  CP: "CP",
} as const;

export type RoleKeys = keyof typeof Role;

export const ROLE_BASED_DASHBOARD: Record<string, string> = {
  ARCHITECT: "/architect/dashboard",
  VENDOR: "/vendor/dashboard",
  CUSTOMER: "/customer/dashboard",
  CP: "/channelPartner/dashboard",
};
