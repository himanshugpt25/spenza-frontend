const DEFAULT_API_URL = "http://localhost:4000/api/v1";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? DEFAULT_API_URL;

export const AUTH_ENDPOINTS = {
  login: "/auth/login",
  signup: "/auth/signup",
  status: "/auth/status",
} as const;

export const SUBSCRIPTION_ENDPOINTS = {
  root: "/subscriptions",
  create: "/subscriptions",
} as const;

export const buildApiUrl = (path: string) => `${API_BASE_URL}${path}`;

export const buildWebhookUrl = (subscriptionId: string) =>
  buildApiUrl(`/webhooks/${subscriptionId}`);
