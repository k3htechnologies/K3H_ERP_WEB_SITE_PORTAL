import { useNavigate } from "react-router-dom";
import { ROLE_BASED_DASHBOARD, type RoleKeys } from "../constants";

export const useDashboardNavigation = () => {
  const navigate = useNavigate();

  return (role: RoleKeys) => {
    if(ROLE_BASED_DASHBOARD[role]){
        navigate(ROLE_BASED_DASHBOARD[role]);
    } else {
        navigate('/login')
    }
  };
};