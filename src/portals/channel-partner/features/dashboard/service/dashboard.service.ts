import { apiClient } from "@/app/http/api-client";
import type { ApiResponse } from "@/app/http/types";
import type { ChannelPartnerDashboardResponse } from "../api/dashboard.response";
import { ChannelPartnerDashboardApi } from "../api/dashboard.api";

export const channelParternDashboardService = {
  apiCallPullDashboard: async (
    channelPartnerId: string,
  ): Promise<ApiResponse<ChannelPartnerDashboardResponse>> => {
    return apiClient.get<ChannelPartnerDashboardResponse>(
      `${ChannelPartnerDashboardApi.Pulldashboard}/${channelPartnerId}`,
    );
  },
};
