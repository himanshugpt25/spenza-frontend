import { Modal } from "./Modal";
import { Button } from "./Button";

type ConfirmationDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "primary";
  isLoading?: boolean;
};

export const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "primary",
  isLoading = false,
}: ConfirmationDialogProps) => {
  return (
    <Modal open={open} onClose={onClose} title={title} description={description}>
      <div className="flex justify-end gap-3">
        <Button variant="ghost" onClick={onClose} disabled={isLoading} className="w-auto">
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          loading={isLoading}
          className={`w-auto ${
            variant === "danger"
              ? "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-500"
              : ""
          }`}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};
