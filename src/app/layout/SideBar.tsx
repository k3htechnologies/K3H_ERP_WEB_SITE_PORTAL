import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { cn } from "@/shared/utils/cn";
import { useLoading } from "../providers/LoadingProvider/LoadingProvider";
import { useAuth } from "../providers/AuthProvider/AuthProvider";

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar = ({ collapsed }: SidebarProps) => {
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

  return (
    <aside
      className={cn(
        `
        flex flex-col
        border-r border-slate-200
        transition-all duration-300 ease-in-out
        rounded-r-lg shadow-xl
        bg-background
        `,
        collapsed ? "w-20" : "w-72",
      )}
    >
      {/* Top Section */}
      <div
        className="
        h-20
        border-b border-slate-200
        px-4
        flex items-center
        "
      >
        {collapsed ? (
          <div
            className="
            h-10 w-10
            rounded-full
            bg-primary-2
            mx-auto
            "
          />
        ) : (
          <div className="flex items-center gap-3">
            <div
              className="
              h-10 w-10
              rounded-full
              bg-primary
              "
            />

            <div>
              <p className="text-sm font-semibold">Portal Name</p>

              <p className="text-xs text-slate-500">Navigation</p>
            </div>
          </div>
        )}
      </div>

      {/* Menu Section */}
      <div
        className="
        flex-1
        overflow-y-auto
        p-3
        "
      >
        {/* Menus will come later */}
      </div>

      {/* Footer Section */}
      <div
        className="
        border-t border-slate-200
        p-4
        "
      >
        {collapsed ? (
          <div
            className="
            h-10 w-10
            rounded-full
            bg-slate-200
            mx-auto
            "
          />
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-md transition-colors duration-200 touch-manipulation"
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
