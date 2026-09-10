import { Bell, Menu, UserRound } from "lucide-react";
import IconContainer from "@/shared/components/IconContainer/IconContainer";
import { useEffect, useRef, useState } from "react";
import { useUserProfileContext } from "../providers/UserProvider/UserProvider";
import { UserProfileCard } from "@/shared/components/UserProfileCard/UserProfileCard";
import { useLoading } from "../providers/LoadingProvider/LoadingProvider";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider/AuthProvider";
import { UserProfileCardSkeleton } from "@/shared/components/UserProfileCard/UserProfileCardSkeleton";
import { LocalStorageHelper } from "@/shared/utils/localStorageHelper";
import { Role } from "@/shared/constants";
import { ROUTES } from "../router/routeConfig";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const { profile, isProfileLoading } = useUserProfileContext();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    showLoading("Logging Out");
    const role = await logout();
    navigate(`/login?role=${role}`, {
      replace: true,
    });
    hideLoading();
  };

  const handleProfileRedirect = () => {
    const role = LocalStorageHelper.getStoredRoleData();
    if (role === Role.CP) {
      navigate(ROUTES.CHANNEL_PARTNER.PROFILE);
    }
    setIsProfileOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className=" h-16 bg-background border-b border-slate-200 px-5 flex items-center justify-between shadow">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className=" h-10 w-10 rounded-full bg-slate-300 " />
          <IconContainer onClick={onMenuClick}>
            <Menu size={18} />
          </IconContainer>
          <div>
            <h1 className="text-sm font-semibold text-slate-900">
              Channel Partner Dashboard
            </h1>

            <p className="text-xs text-slate-500">Master Control</p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <IconContainer>
          <Bell size={18} />
        </IconContainer>

        <div className="relative" ref={profileRef}>
          <IconContainer onClick={() => setIsProfileOpen((prev) => !prev)}>
            <UserRound size={18} />
          </IconContainer>
          {isProfileOpen && (
            <div className=" absolute right-0 top-14 z-50 origin-top-right animate-in fade-in zoom-in-95 duration-150">
              {isProfileLoading ? (
                <UserProfileCardSkeleton />
              ) : (
                profile && (
                  <UserProfileCard
                    profile={profile}
                    handleLogout={handleLogout}
                    handleProfileRedirect={handleProfileRedirect}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
