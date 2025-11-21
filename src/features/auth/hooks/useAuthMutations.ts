import { useMutation } from "@tanstack/react-query";
import { loginRequest, signupRequest } from "../api";
import { useAuth } from "../../../context/AuthContext";
import type { AuthCredentials } from "../../../types/auth";

export const useLoginMutation = () => {
  const { refreshSession } = useAuth();

  return useMutation({
    mutationFn: (payload: AuthCredentials) => loginRequest(payload),
    onSuccess: async () => {
      await refreshSession();
    },
  });
};

export const useSignupMutation = () => {
  const { refreshSession } = useAuth();

  return useMutation({
    mutationFn: (payload: AuthCredentials) => signupRequest(payload),
    onSuccess: async () => {
      await refreshSession();
    },
  });
};
