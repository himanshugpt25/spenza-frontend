import { AxiosError } from "axios";
import { axiosClient } from "../../api/axios";
import { AUTH_ENDPOINTS } from "../../api/endpoints";
import type {
  ApiSuccess,
  AuthCredentials,
  AuthResponse,
  AuthStatusPayload,
} from "../../types/auth";

type AuthApiResponse = ApiSuccess<AuthResponse>;

export const loginRequest = async (payload: AuthCredentials) => {
  const { data } = await axiosClient.post<AuthApiResponse>(
    AUTH_ENDPOINTS.login,
    payload
  );
  return data.data;
};

export const signupRequest = async (payload: AuthCredentials) => {
  const { data } = await axiosClient.post<AuthApiResponse>(
    AUTH_ENDPOINTS.signup,
    payload
  );
  return data.data;
};

type AuthStatusResponse = ApiSuccess<AuthStatusPayload>;

export const getAuthStatus = async () => {
  try {
    const { data } = await axiosClient.get<AuthStatusResponse>(
      AUTH_ENDPOINTS.status
    );
    return data.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      return { isAuthenticated: false } as AuthStatusPayload;
    }
    throw error;
  }
};
