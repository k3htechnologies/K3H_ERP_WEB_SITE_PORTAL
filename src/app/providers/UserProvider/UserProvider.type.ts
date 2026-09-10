import type { UserProfile } from "@/shared/services/user/user.response";

export interface UserContextType {
  profile: UserProfile | null;
  isProfileLoading: boolean;
}