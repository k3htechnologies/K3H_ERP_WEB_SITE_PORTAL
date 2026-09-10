import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
// import Sidebar from "./SideBar";
import { ToastContainer } from "@/shared/components/Toast";
import useToast from "@/app/providers/ToastProvider/ToastProvider";
import { useNetworkStatus } from "@/shared/hooks/useNetworkStatus";

const Layout: React.FC = () => {
  useNetworkStatus();
  const [, setCollapsed] = useState(true);
  const { toasts, removeToast } = useToast();
  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };
  return (
    <div className=" h-screen bg-slate-100 overflow-hidden ">
      <div className="flex h-full flex-col gap-4">
        <Header onMenuClick={toggleSidebar} />

        <div className="flex flex-1 gap-4 overflow-hidden pr-3">
          {/* <Sidebar collapsed={collapsed} /> */}

          <main
            className=" flex-1 rounded-lg p-4 overflow-y-auto shadow-xl bg-background thin-scroll"
            id="main-content"
          >
            <Outlet />
          </main>
        </div>
      </div>
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
};

export default Layout;
