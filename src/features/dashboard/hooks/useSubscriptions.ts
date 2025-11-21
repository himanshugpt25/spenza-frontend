import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSubscription, fetchSubscriptions } from "../api";
import type { CreateSubscriptionPayload } from "../../../types/subscription";

const subscriptionKeys = {
  all: ["subscriptions"] as const,
};

type SubscriptionsQueryOptions = {
  enabled?: boolean;
};

export const useSubscriptionsQuery = (options?: SubscriptionsQueryOptions) =>
  useQuery({
    queryKey: subscriptionKeys.all,
    queryFn: fetchSubscriptions,
    enabled: options?.enabled ?? true,
  });

export const useCreateSubscriptionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSubscriptionPayload) =>
      createSubscription(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.all });
    },
  });
};
