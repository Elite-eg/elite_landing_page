"use client";

import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type ReactNode,
} from "react";
import { FiAlertCircle } from "react-icons/fi";
import { cn } from "@/lib/utils";

export interface BaseInputFieldProps {
  label: string;
  /** Already-translated error message. */
  error?: string;
  hint?: string;
  icon?: ReactNode;
  /** Visually hide the label (it stays available to screen readers). */
  hideLabel?: boolean;
  className?: string;
  inputClassName?: string;
}

export type InputFieldProps = BaseInputFieldProps &
  (
    | ({ as?: "input" } & Omit<InputHTMLAttributes<HTMLInputElement>, "className">)
    | ({ as: "textarea"; rows?: number } & Omit<
        TextareaHTMLAttributes<HTMLTextAreaElement>,
        "className"
      >)
  );

/** Shared text input / textarea: visible label, error, and disabled states (elite-rules.txt §5.7). */
export const InputField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputFieldProps
>(function InputField(props, ref) {
  const {
    label,
    error,
    hint,
    icon,
    hideLabel = false,
    className,
    inputClassName,
    id,
    disabled,
    as = "input",
    ...restProps
  } = props;

  const generatedId = useId();
  const inputId = id ?? generatedId;
  const describedBy = error
    ? `${inputId}-error`
    : hint
      ? `${inputId}-hint`
      : undefined;

  const baseInputClasses = cn(
    "w-full rounded-xl border-[1.5px] bg-surface-alt px-4 text-[0.95rem] text-body",
    "placeholder:text-content/60 transition-all duration-200",
    "outline-none focus:outline-none focus-visible:outline-none focus-within:outline-none",
    "ring-0 focus:ring-0 focus-visible:ring-0 ring-offset-0 focus-visible:ring-offset-0",
    "focus:border-secondary focus:bg-surface",
    "disabled:cursor-not-allowed disabled:opacity-60",
    icon && "ps-11",
    error
      ? "border-danger focus:border-danger"
      : "border-edge/60 focus:border-secondary",
    inputClassName
  );

  return (
    <div className={cn("w-full", className)}>
      <label
        htmlFor={inputId}
        className={cn(
          "mb-1.5 block text-xs font-bold text-body",
          hideLabel && "sr-only"
        )}
      >
        {label}
      </label>

      <div className="relative">
        {icon && (
          <span
            className={cn(
              "pointer-events-none absolute start-0 flex items-center ps-3.5 text-content/70 transition-colors duration-200",
              as === "textarea" ? "top-3.5" : "inset-y-0"
            )}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}

        {as === "textarea" ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={inputId}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={cn(baseInputClasses, "py-2.5 resize-none min-h-[90px]")}
            {...(restProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            id={inputId}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={cn(baseInputClasses, "min-h-11 py-2.5")}
            {...(restProps as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
      </div>

      {error ? (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-danger animate-fadeIn"
        >
          <FiAlertCircle className="size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-content">
          {hint}
        </p>
      ) : null}
    </div>
  );
});
