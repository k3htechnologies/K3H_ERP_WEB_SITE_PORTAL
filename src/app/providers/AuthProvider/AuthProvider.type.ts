import type { EmployeeData } from "@/app/auth/login/api/login.response";
import type { RoleKeys } from "@/shared/constants";

export interface User {
  id: string;
  uniqueKey: string;
  role: RoleKeys;
  permissions?: string[];
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (employee: EmployeeData) => Promise<User>;
  logout: () => Promise<string | null>;
  checkAuth: () => Promise<void>;
}

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
};

export type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_ERROR"; payload: string }
  | { type: "LOGOUT" }
  | { type: "CHECK_AUTH_START" }
  | { type: "CHECK_AUTH_SUCCESS"; payload: User }
  | { type: "CHECK_AUTH_ERROR" };

export interface TokenPayload {
  aud: string;
  entityid: string;
  entitytype: string;
  exp: number;
  iat: number;
  iss: string;
  uniquekey: string;
  role: RoleKeys;
}
