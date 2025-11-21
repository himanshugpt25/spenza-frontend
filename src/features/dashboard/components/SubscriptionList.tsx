import { useMemo, useState } from "react";
import { Button } from "../../../components/ui/Button";
import { ConfirmationDialog } from "../../../components/ui/ConfirmationDialog";
import { Link } from "react-router-dom";
import type { Subscription } from "../../../types/subscription";
import { buildWebhookUrl } from "../../../api/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSubscription } from "../api";

type SubscriptionListProps = {
  subscriptions: Subscription[];
  onCreateClick: () => void;
};

const formatDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const SubscriptionList = ({
  subscriptions,
  onCreateClick,
}: SubscriptionListProps) => {
  const queryClient = useQueryClient();
  const [subscriptionToCancel, setSubscriptionToCancel] = useState<string | null>(
    null
  );

  const deleteMutation = useMutation({
    mutationFn: deleteSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      setSubscriptionToCancel(null);
    },
  });

  const sortedSubscriptions = useMemo(
    () =>
      [...subscriptions].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [subscriptions]
  );

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (error) {
      console.error("Failed to copy url", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-sky-300">Active</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">
            {subscriptions.length} Subscriptions
          </h2>
        </div>
        <Button
          onClick={onCreateClick}
          className="w-auto px-6 py-2 text-sm font-semibold"
        >
          New Subscription
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {sortedSubscriptions.map((subscription: Subscription) => {
          const webhookUrl = buildWebhookUrl(subscription.id);

          return (
            <div
              key={subscription.id}
              className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-5 text-white shadow-lg shadow-slate-950/40"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    {formatDate(subscription.createdAt)}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold">{subscription.name}</h3>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    subscription.isActive
                      ? "bg-emerald-400/20 text-emerald-300"
                      : "bg-rose-400/20 text-rose-200"
                  }`}
                >
                  {subscription.isActive ? "Active" : "Paused"}
                </span>
              </div>
              {subscription.description ? (
                <p className="mt-3 text-sm text-slate-300">
                  {subscription.description}
                </p>
              ) : null}

              <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/40 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Target URL
                </p>
                <p className="mt-1 text-sm text-white/90 break-all">
                  {subscription.targetUrl}
                </p>
              </div>

              <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/40 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      Webhook endpoint
                    </p>
                    <p className="mt-1 text-sm text-white/90 break-all">
                      {webhookUrl}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(webhookUrl)}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <Button
                  variant="ghost"
                  className="w-auto text-xs text-rose-400 hover:bg-rose-400/10 hover:text-rose-300"
                  onClick={() => setSubscriptionToCancel(subscription.id)}
                  disabled={
                    deleteMutation.isPending && subscriptionToCancel === subscription.id
                  }
                >
                  {deleteMutation.isPending && subscriptionToCancel === subscription.id
                    ? "Cancelling..."
                    : "Cancel"}
                </Button>
                <Link to={`/dashboard/subscriptions/${subscription.id}`}>
                  <Button variant="ghost" className="w-auto text-xs">
                    View Events &rarr;
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <ConfirmationDialog
        open={!!subscriptionToCancel}
        onClose={() => setSubscriptionToCancel(null)}
        onConfirm={() => {
          if (subscriptionToCancel) {
            deleteMutation.mutate(subscriptionToCancel);
          }
        }}
        title="Cancel Subscription"
        description="Are you sure you want to cancel this subscription? This action cannot be undone and you will stop receiving webhooks for this endpoint."
        confirmText="Yes, Cancel Subscription"
        variant="danger"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};


