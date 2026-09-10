import { useCallback, useEffect, useState } from "react";
import type { UserProfile } from "../services/user/user.response";
import { UserService } from "../services/user/user.service";
import { useLocation } from "react-router-dom";

export const useUserProfile = (channelPartnerId: string) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();

  const fetchProfile = useCallback(async () => {
    if (pathname.includes("login") || pathname.includes("register")) {
      setIsLoading(false);
      return;
    }
    if (!channelPartnerId) {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const response =
        await UserService.apiCallFetchUserDetails(channelPartnerId);
      if (response?.IsSuccess && response.Data?.length) {
        setProfile(response.Data[0]);
      }
    } finally {
      setIsLoading(false);
    }
  }, [channelPartnerId, pathname]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    isLoading,
    refresh: fetchProfile,
  };
};
