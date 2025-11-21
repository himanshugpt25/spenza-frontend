import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import { SubscriptionList } from "./components/SubscriptionList";
import { CreateSubscriptionModal } from "./components/CreateSubscriptionModal";
import { useSubscriptionsQuery } from "./hooks/useSubscriptions";

export const DashboardPage = () => {
  const { user, status: authStatus } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const { data, isLoading, isError, refetch } = useSubscriptionsQuery({
    enabled: authStatus === "authenticated",
  });

  const subscriptions = data ?? [];

  const handleOpenModal = () => setModalOpen(true);

  const handleCloseModal = () => {
    setModalOpen(false);
    refetch();
  };

  return (
    <section className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-slate-950/40">
          <p className="text-sm uppercase tracking-[0.4em] text-sky-300">
            Dashboard
          </p>
          <h1 className="mt-3 text-4xl font-semibold">
            Hello {user?.email ?? "team"}
          </h1>
          <p className="mt-2 text-base text-slate-300">
            Manage inbound webhook subscriptions and keep target URLs in sync.
          </p>
        </header>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-950/40">
          {isLoading ? (
            <div className="space-y-4">
              <div className="h-6 w-1/3 animate-pulse rounded bg-white/10" />
              <div className="grid gap-4 lg:grid-cols-2">
                {[...Array(2)].map((_, index) => (
                  <div
                    key={index}
                    className="h-48 animate-pulse rounded-2xl bg-white/5"
                  />
                ))}
              </div>
            </div>
          ) : isError ? (
            <div className="rounded-2xl border border-rose-300/40 bg-rose-500/10 p-6 text-rose-100">
              <p className="text-lg font-semibold">
                Unable to load subscriptions
              </p>
              <p className="mt-2 text-sm opacity-80">
                Please refresh the page or try again later.
              </p>
              <Button
                variant="ghost"
                className="mt-4 w-auto"
                onClick={() => refetch()}
              >
                Retry
              </Button>
            </div>
          ) : subscriptions.length > 0 ? (
            <SubscriptionList
              subscriptions={subscriptions}
              onCreateClick={handleOpenModal}
            />
          ) : (
            <div className="flex flex-col items-center gap-6 rounded-2xl border border-dashed border-white/20 bg-slate-950/30 p-10 text-center">
              <div className="rounded-full border border-white/10 bg-white/5 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-8 w-8 text-sky-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">No subscriptions yet</h2>
                <p className="mt-2 text-sm text-slate-300">
                  Bring your first integration online by creating a
                  subscription.
                </p>
              </div>
              <Button
                onClick={handleOpenModal}
                className="w-auto px-6 py-2 text-sm font-semibold"
              >
                Create subscription
              </Button>
            </div>
          )}
        </div>
      </div>

      <CreateSubscriptionModal open={modalOpen} onClose={handleCloseModal} />
    </section>
  );
};
