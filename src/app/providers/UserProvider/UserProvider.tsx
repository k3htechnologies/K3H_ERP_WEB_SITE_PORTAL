import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { UserContextType } from "./UserProvider.type";
import { LocalStorageHelper } from "@/shared/utils/localStorageHelper";
import { useUserProfile } from "@/shared/hooks/useUserProfile";

const UserProfileContext = createContext<UserContextType | null>(null);

interface UserProfilerProviderProps {
  children: ReactNode;
}

export const UserProfileProvider = ({
  children,
}: UserProfilerProviderProps) => {
  const data = LocalStorageHelper.getStoredEmployeeData();
  const { profile, isLoading: isProfileLoading } = useUserProfile(
    data?.UserId ? data.UserId.toString() : "",
  );

  const value = useMemo(
    () => ({
      profile,
      isProfileLoading,
    }),
    [profile, isProfileLoading],
  );

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfileContext = () => {
  const context = useContext(UserProfileContext);

  if (!context) {
    throw new Error(
      "useUserProfileContext must be used within UserProfileProvider",
    );
  }

  return context;
};
