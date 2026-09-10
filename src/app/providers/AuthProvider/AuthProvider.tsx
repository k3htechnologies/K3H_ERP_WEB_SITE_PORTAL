import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";

import type {
  AuthAction,
  AuthContextType,
  AuthState,
  TokenPayload,
  User,
} from "@/app/providers/AuthProvider/AuthProvider.type";
import { LocalStorageHelper } from "@/shared/utils/localStorageHelper";
import type { EmployeeData } from "@/app/auth/login/api/login.response";

const AuthContext = createContext<AuthContextType | null>(null);

const initialState: AuthState = {
  user: null,
  isLoading: true,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true, error: null };
    case "LOGIN_SUCCESS":
      return { ...state, isLoading: false, user: action.payload };
    case "LOGIN_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "CHECK_AUTH_START":
      return { ...state, isLoading: true };
    case "CHECK_AUTH_SUCCESS":
      return { ...state, isLoading: false, user: action.payload };
    case "CHECK_AUTH_ERROR":
      return { ...state, isLoading: false };
    default:
      return state;
  }
}

export function decodeJWT(token: string): TokenPayload {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid token format");
  }

  const decoded = JSON.parse(
    atob(parts[1]), // Decode the payload (second part)
  );
  return decoded;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is already logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const login = useCallback(
    async (employeeData: EmployeeData): Promise<User> => {
      dispatch({ type: "LOGIN_START" });
      try {
        LocalStorageHelper.storeEmployeeData(employeeData);
        LocalStorageHelper.storeToken(employeeData.Token);

        const payload = decodeJWT(employeeData.Token);
        const user: User = {
          id: payload.entityid,
          role: payload.role,
          uniqueKey: payload.uniquekey,
        };
        LocalStorageHelper.storeRole(payload.role);
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
        return user;
      } catch (error) {
        dispatch({
          type: "LOGIN_ERROR",
          payload: error instanceof Error ? error.message : "Unknown error",
        });
        console.log("LOGIN ERROR", error);
        throw error;
      }
    },
    [],
  );

  const logout = useCallback(async (): Promise<string | null> => {
    const role = LocalStorageHelper.getStoredRoleData();
    LocalStorageHelper.clearLocalStorageData();
    dispatch({
      type: "LOGOUT",
    });
    return role;
  }, []);

  const checkAuth = useCallback(async () => {
    dispatch({ type: "CHECK_AUTH_START" });
    try {
      const token = LocalStorageHelper.getStoredTokenData();
      if (!token) {
        dispatch({ type: "CHECK_AUTH_ERROR" });
        return;
      }
      const payload = decodeJWT(token);
      const user: User = {
        id: payload.entityid,
        role: payload.role,
        uniqueKey: payload.uniquekey,
      };
      LocalStorageHelper.storeRole(payload.role);
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      dispatch({ type: "CHECK_AUTH_SUCCESS", payload: user });
    } catch (error) {
      dispatch({ type: "CHECK_AUTH_ERROR" });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.user !== null,
        isLoading: state.isLoading,
        error: state.error,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
