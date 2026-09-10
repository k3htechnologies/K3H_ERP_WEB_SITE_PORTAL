import { apiClient } from "@/app/http/api-client";
import { createQueryParams } from "@/shared/utils/createQueryParams";
import type { UserProfileResponse } from "./user.response";
import { UserApi } from "./user.api";

export const UserService = {
  apiCallFetchUserDetails: async (ChannelPartnerId: string) => {
    const queryParams = createQueryParams({
      ChannelPartner: ChannelPartnerId,
    });
    return apiClient.get<UserProfileResponse>(
      `${UserApi.PullDetails}?${queryParams}`,
    );
  },
};
