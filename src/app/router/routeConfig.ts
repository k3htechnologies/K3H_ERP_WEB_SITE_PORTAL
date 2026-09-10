// src/app/router/routeConfig.ts

export const ROUTES = {
  AUTH: {
    LOGIN: "/login",

    REGISTER: {
      CHANNEL_PARTNER: "/register/channel-partner",
      VENDOR: "/register/vendor",
    },
  },

  ERROR: {
    NETWORK: "/error",
  },

  CHANNEL_PARTNER: {
    ROOT: "/channelPartner",
    PROFILE: "/channelPartner/profile",
    DASHBOARD: "/channelPartner/dashboard",
    PROJECT_DETAILS: "/channelPartner/projectDetails/:projectId",
    ENQUIRY_DETAILS: "/channelPartner/enquiryDetails/:projectId/:activeTab",
    INVOICE_VIEW:
      "/channelPartner/enquiryDetails/:projectId/invoiceView/:bookingId",
    ADD_INVOICE: "/channelPartner/addInvoice/:invoiceId",
  },

  VENDOR: {
    ROOT: "/vendor",
    DASHBOARD: "/vendor/dashboard",
  },

  ARCHITECT: {
    ROOT: "/architect",
    DASHBOARD: "/architect/dashboard",
  },

  CUSTOMER: {
    ROOT: "/customer",
    DASHBOARD: "/customer/dashboard",
  },
} as const;

export const PATHS = {
  ROOT: "/",

  CHANNEL_PARTNER: {
    ROOT: "channelPartner",
    PROFILE: "profile",
    DASHBOARD: "dashboard",
    PROJECT_DETAILS: "projectDetails/:projectId",
    ENQUIRY_DETAILS: "enquiryDetails/:projectId/:activeTab",
    INVOICE_VIEW: "enquiryDetails/:projectId/invoiceView/:bookingId",
    ADD_INVOICE: "addInvoice/:invoiceId",
  },

  VENDOR: {
    ROOT: "vendor",
    DASHBOARD: "dashboard",
  },

  ARCHITECT: {
    ROOT: "architect",
    DASHBOARD: "dashboard",
  },

  CUSTOMER: {
    ROOT: "customer",
    DASHBOARD: "dashboard",
  },
} as const;
