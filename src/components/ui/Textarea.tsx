import { forwardRef } from "react";
import type { ForwardedRef, TextareaHTMLAttributes } from "react";
import clsx from "clsx";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

const TextareaComponent = (
  { label, id, className, error, rows = 4, ...props }: TextareaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) => {
  const textareaId = id ?? props.name ?? label;

  return (
    <label className="space-y-2 text-sm font-medium text-white/80">
      <span>{label}</span>
      <textarea
        id={textareaId}
        ref={ref}
        rows={rows}
        className={clsx(
          "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-base text-white placeholder:text-white/40 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500",
          error && "border-rose-400 focus:border-rose-400 focus:ring-rose-500",
          className
        )}
        {...props}
      />
      {error ? (
        <span className="text-xs font-medium text-rose-300">{error}</span>
      ) : null}
    </label>
  );
};

TextareaComponent.displayName = "Textarea";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  TextareaComponent
);

