export type AuthUser = {
  userId: string;
  email: string;
};

export type AuthResponse = AuthUser;

export type AuthStatusPayload =
  | (AuthUser & {
      isAuthenticated: true;
      refreshed?: boolean;
    })
  | {
      isAuthenticated: false;
    };

export type AuthCredentials = {
  email: string;
  password: string;
};

export type ApiSuccess<T> = {
  success: true;
  data: T;
  message?: string;
};

export type ApiError = {
  success: false;
  message: string;
  details?: unknown;
};
