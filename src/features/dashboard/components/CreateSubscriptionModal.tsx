import { useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Modal } from "../../../components/ui/Modal";
import { Input } from "../../../components/ui/Input";
import { Textarea } from "../../../components/ui/Textarea";
import { Button } from "../../../components/ui/Button";
import { buildWebhookUrl } from "../../../api/endpoints";
import { useCreateSubscriptionMutation } from "../hooks/useSubscriptions";
import type { Subscription } from "../../../types/subscription";
import { getErrorMessage } from "../../../utils/errorMessage";

type FormState = {
  name: string;
  targetUrl: string;
  description: string;
  isActive: boolean;
};

type CreateSubscriptionModalProps = {
  open: boolean;
  onClose: () => void;
};

const INITIAL_FORM: FormState = {
  name: "",
  targetUrl: "",
  description: "",
  isActive: true,
};

export const CreateSubscriptionModal = ({
  open,
  onClose,
}: CreateSubscriptionModalProps) => {
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM);
  const [createdSubscription, setCreatedSubscription] =
    useState<Subscription | null>(null);

  const mutation = useCreateSubscriptionMutation();

  const handleChange =
    (field: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        field === "isActive"
          ? (event as ChangeEvent<HTMLInputElement>).target.checked
          : event.target.value;
      setFormState((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutation.mutate(
      {
        name: formState.name,
        targetUrl: formState.targetUrl,
        description: formState.description || undefined,
        isActive: formState.isActive,
      },
      {
        onSuccess: (subscription) => {
          setCreatedSubscription(subscription);
        },
      }
    );
  };

  const webhookUrl = useMemo(
    () =>
      createdSubscription ? buildWebhookUrl(createdSubscription.id) : undefined,
    [createdSubscription]
  );

  const copyWebhookUrl = async () => {
    if (!webhookUrl) {
      return;
    }
    try {
      await navigator.clipboard.writeText(webhookUrl);
    } catch (error) {
      console.error("Failed to copy webhook URL", error);
    }
  };

  const handleClose = () => {
    setCreatedSubscription(null);
    setFormState(INITIAL_FORM);
    mutation.reset();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={createdSubscription ? "Subscription ready" : "Create subscription"}
      description={
        createdSubscription
          ? "Share this webhook endpoint with your upstream service."
          : "Send webhooks from an external system, and we’ll forward them to your target URL."
      }
    >
      {createdSubscription && webhookUrl ? (
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Webhook endpoint
            </p>
            <p className="mt-2 break-all text-base text-white">{webhookUrl}</p>
            <Button
              variant="ghost"
              className="mt-4 w-full"
              onClick={copyWebhookUrl}
            >
              Copy URL
            </Button>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-300">
              Events accepted here will be forwarded to:
            </p>
            <p className="mt-2 break-all text-sm text-white/90">
              {createdSubscription.targetUrl}
            </p>
          </div>
          <Button onClick={handleClose}>Done</Button>
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input
            label="Name"
            placeholder="Billing platform"
            value={formState.name}
            onChange={handleChange("name")}
            required
          />
          <Textarea
            label="Description"
            placeholder="Describe this integration..."
            value={formState.description}
            onChange={handleChange("description")}
            rows={4}
          />
          <Input
            label="Target URL"
            type="url"
            placeholder="https://example.com/webhooks"
            value={formState.targetUrl}
            onChange={handleChange("targetUrl")}
            required
          />
          <label className="flex items-center gap-3 text-sm font-semibold text-white/80">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-white/30 bg-transparent text-sky-400 focus:ring-sky-500"
              checked={formState.isActive}
              onChange={handleChange("isActive")}
            />
            Active immediately
          </label>
          {mutation.isError ? (
            <p className="rounded-lg border border-rose-300/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
              {getErrorMessage(mutation.error, "Failed to create subscription")}
            </p>
          ) : null}
          <Button type="submit" loading={mutation.isPending} className="w-full">
            Create subscription
          </Button>
        </form>
      )}
    </Modal>
  );
};
