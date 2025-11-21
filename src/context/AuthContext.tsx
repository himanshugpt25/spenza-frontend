import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import type { ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { AuthUser } from "../types/auth";
import { getAuthStatus } from "../features/auth/api";
import { authEvents } from "./authEvents";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  status: AuthStatus;
  refreshSession: () => Promise<void>;
};

const AUTH_STATUS_QUERY_KEY = ["auth", "status"] as const;

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const queryClient = useQueryClient();
  const { data, isLoading, refetch } = useQuery({
    queryKey: AUTH_STATUS_QUERY_KEY,
    queryFn: getAuthStatus,
    retry: false,
  });

  useEffect(() => {
    authEvents.setUnauthorizedListener(() => {
      queryClient.invalidateQueries({ queryKey: AUTH_STATUS_QUERY_KEY });
    });
    return () => authEvents.setUnauthorizedListener(null);
  }, [queryClient]);

  const refreshSession = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const value = useMemo(() => {
    const payload = data;
    const isAuthenticated = Boolean(payload?.isAuthenticated);
    const user =
      payload?.isAuthenticated && payload.userId && payload.email
        ? { userId: payload.userId, email: payload.email }
        : null;
    const status: AuthStatus = isLoading
      ? "loading"
      : isAuthenticated
      ? "authenticated"
      : "unauthenticated";

    return {
      user,
      isAuthenticated,
      status,
      refreshSession,
    };
  }, [data, isLoading, refreshSession]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
