import { axiosClient } from "../../api/axios";
import { SUBSCRIPTION_ENDPOINTS } from "../../api/endpoints";
import type { ApiSuccess } from "../../types/auth";
import type {
  CreateSubscriptionPayload,
  Subscription,
} from "../../types/subscription";

type SubscriptionListResponse = ApiSuccess<Subscription[]>;
type SubscriptionResponse = ApiSuccess<Subscription>;

export const fetchSubscriptions = async () => {
  const { data } = await axiosClient.get<SubscriptionListResponse>(
    SUBSCRIPTION_ENDPOINTS.root
  );
  return data.data;
};

export const getSubscriptionEvents = async (
  subscriptionId: string,
  page: number,
  limit: number
): Promise<{ events: any[]; total: number; page: number; limit: number }> => {
  const { data } = await axiosClient.get<{
    data: { events: any[]; total: number; page: number; limit: number };
  }>(`/subscriptions/${subscriptionId}/events`, {
    params: { page, limit },
  });
  return data.data;
};

export const createSubscription = async (payload: CreateSubscriptionPayload) => {
  const { data } = await axiosClient.post<SubscriptionResponse>(
    SUBSCRIPTION_ENDPOINTS.create,
    payload
  );
  return data.data;
};

export const deleteSubscription = async (id: string) => {
  const { data } = await axiosClient.delete<{ success: boolean; message: string }>(
    `/subscriptions/${id}`
  );
  return data;
};
