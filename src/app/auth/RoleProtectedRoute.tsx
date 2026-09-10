import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/app/providers/AuthProvider/AuthProvider";

interface RoleProtectedRouteProps {
  allowedRoles: string;
}

export function RoleProtectedRoute({ allowedRoles }: RoleProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user || !(user.role === allowedRoles)) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-gray-600">You don't have permission to access this page</p>
      </div>
    );
  }

  return <Outlet/>;
}