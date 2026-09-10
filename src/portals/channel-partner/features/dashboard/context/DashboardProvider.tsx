import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { channelParternDashboardService } from "../service/dashboard.service";
import type { ChannelPartnerDashboardResponse } from "../api/dashboard.response";
import { useAuth } from "@/app/providers/AuthProvider/AuthProvider";
import { useLoading } from "@/app/providers/LoadingProvider/LoadingProvider";

interface DashboardContextType {
  dashboardData: ChannelPartnerDashboardResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [dashboardData, setDashboardData] =
    useState<ChannelPartnerDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { showLoading, hideLoading } = useLoading();

  const { user } = useAuth();
  const fetchDashboard = async () => {
    try {
      setLoading(true);
      showLoading("Data Loading");
      setError(null);
      if (user?.id) {
        const response =
          await channelParternDashboardService.apiCallPullDashboard(user.id);
        if (response && response.IsSuccess && response.Data)
          setDashboardData(response.Data);
      }
    } catch {
      setError("Failed to load dashboard");
    } finally {
      setLoading(false);
      hideLoading();
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const value = useMemo(
    () => ({
      dashboardData,
      loading,
      error,
      refetch: fetchDashboard,
    }),
    [dashboardData, loading, error],
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error(
      "useDashboardContext must be used inside DashboardProvider",
    );
  }

  return context;
}
