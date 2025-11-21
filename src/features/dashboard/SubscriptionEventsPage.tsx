import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { getSubscriptionEvents } from "./api";
import { EventsTable } from "./components/EventsTable";
import { Button } from "../../components/ui/Button";
import { socket } from "../../lib/socket";
import type { WebhookEvent } from "../../types/subscription";

export const SubscriptionEventsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const limit = 10;
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["subscription-events", id, page],
    queryFn: () => getSubscriptionEvents(id!, page, limit),
    enabled: !!id,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!id) return;

    // Connect socket only when this page is mounted
    if (!socket.connected) {
      socket.connect();
    }

    // Join subscription room
    socket.emit("join_subscription", id);

    const handleEventProcessed = (newEvent: WebhookEvent) => {
      console.log("New event received:", newEvent);
      
      // Update cache optimistically
      queryClient.setQueryData(
        ["subscription-events", id, 1],
        (oldData: { events: WebhookEvent[]; total: number } | undefined) => {
          if (!oldData) return undefined;
          
          return {
            ...oldData,
            total: oldData.total + 1,
            events: [newEvent, ...oldData.events].slice(0, limit),
          };
        }
      );
    };

    socket.on("event_processed", handleEventProcessed);

    return () => {
      socket.emit("leave_subscription", id);
      socket.off("event_processed", handleEventProcessed);
      
      // Disconnect socket when leaving the page
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [id, queryClient]);

  const events = data?.events ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <section className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-slate-950/40">
          <div>
            <Link
              to="/dashboard"
              className="text-sm uppercase tracking-[0.4em] text-sky-300 hover:underline"
            >
              &larr; Back to Dashboard
            </Link>
            <h1 className="mt-3 text-4xl font-semibold">Subscription Events</h1>
            <p className="mt-2 text-base text-slate-300">
              Viewing webhook delivery history for subscription{" "}
              <span className="font-mono text-sky-200">{id}</span>
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={() => setPage(1)}
            className="h-auto w-auto px-4 py-2"
          >
            Refresh
          </Button>
        </header>

        {isLoading ? (
          <div className="space-y-4">
            <div className="h-12 w-full animate-pulse rounded bg-white/10" />
            <div className="h-64 w-full animate-pulse rounded-2xl bg-white/5" />
          </div>
        ) : isError ? (
          <div className="rounded-2xl border border-rose-300/40 bg-rose-500/10 p-6 text-rose-100">
            <p className="text-lg font-semibold">Unable to load events</p>
            <p className="mt-2 text-sm opacity-80">
              Please refresh the page or try again later.
            </p>
          </div>
        ) : (
          <EventsTable
            events={events}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </section>
  );
};
