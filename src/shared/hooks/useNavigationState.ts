import { useLocation } from "react-router-dom";

export function useNavigationState<T extends object>() {
  const { state } = useLocation();

  return (state as T | null) ?? null;
}
