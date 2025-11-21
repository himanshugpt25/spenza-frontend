import { Button } from "../../../components/ui/Button";

type Event = {
  id: string;
  status: "PENDING" | "PROCESSING" | "SUCCESS" | "FAILED";
  last_error: string | null;
  created_at: string;
  attempt_count: number;
};

type EventsTableProps = {
  events: Event[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const formatDate = (isoDate: string) =>
  new Date(isoDate).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

export const EventsTable = ({
  events,
  page,
  totalPages,
  onPageChange,
}: EventsTableProps) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-950/40">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="border-b border-white/10 text-xs uppercase text-slate-400">
            <tr>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Created At</th>
              <th className="px-4 py-3">Attempts</th>
              <th className="px-4 py-3">Response</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {events.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                  No events found.
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event.id} className="hover:bg-white/5">
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        event.status === "SUCCESS"
                          ? "bg-emerald-400/20 text-emerald-300"
                          : event.status === "FAILED"
                          ? "bg-rose-400/20 text-rose-200"
                          : "bg-amber-400/20 text-amber-200"
                      }`}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-400">
                    {event.id}
                  </td>
                  <td className="px-4 py-3">{formatDate(event.created_at)}</td>
                  <td className="px-4 py-3">{event.attempt_count}</td>
                  <td className="px-4 py-3">
                    {event.last_error ? (
                      <span className="font-mono text-xs text-rose-400">
                        {event.last_error}
                      </span>
                    ) : event.status === "SUCCESS" ? (
                      <span className="font-mono text-xs text-emerald-400">
                        200 OK
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
        <p className="text-xs text-slate-400">
          Page {page} of {Math.max(1, totalPages)}
        </p>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="h-8 px-3 text-xs"
          >
            Previous
          </Button>
          <Button
            variant="ghost"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className="h-8 px-3 text-xs"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
