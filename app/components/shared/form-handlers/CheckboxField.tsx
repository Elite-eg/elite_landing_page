"use client";

import { forwardRef, useId, type ReactNode } from "react";
import { Checkbox, Description, Field, Label } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { checkPop } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { FieldFeedback } from "./FieldFeedback";

export interface CheckboxFieldProps {
  /** Already-translated label. May hold links (t.rich), e.g. to the privacy policy. */
  label: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  onBlur?: () => void;
  /** Also renders a hidden input, so native form data includes the value. */
  name?: string;
  /** Already-translated error message. */
  error?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * Checkbox with its label beside it (Figma "Checkbox": 20px box, navy with a white check when ticked), e.g. a
 * consent line. Controlled, so with react-hook-form use a Controller.
 */
export const CheckboxField = forwardRef<HTMLElement, CheckboxFieldProps>(function CheckboxField(
  { label, checked, onChange, onBlur, name, error, disabled, className },
  ref
) {
  const feedbackId = useId();

  return (
    <Field disabled={disabled} className={cn("w-full", className)}>
      <div className="flex items-start gap-2.5">
        <Checkbox
          ref={ref}
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          aria-invalid={error ? true : undefined}
          className={cn(
            // The fill fades in, the box dips slightly while pressed, the check pops (checkPop).
            "mt-0.5 grid size-5 shrink-0 cursor-pointer place-items-center rounded-md border transition duration-200",
            "active:scale-90 motion-reduce:transform-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60",
            checked
              ? "border-primary-dark bg-primary-dark text-surface"
              : error
                ? "border-danger bg-surface"
                : "border-edge bg-surface hover:border-primary/40"
          )}
        >
          <AnimatePresence initial={false}>
            {checked && (
              <motion.span key="check" variants={checkPop} initial="hidden" animate="visible" exit="hidden" className="grid">
                <FiCheck className="size-3.5" strokeWidth={3} aria-hidden="true" />
              </motion.span>
            )}
          </AnimatePresence>
        </Checkbox>

        <Label className="cursor-pointer text-caption leading-relaxed text-ink-700 data-[disabled]:cursor-not-allowed">
          {label}
        </Label>
      </div>

      {/* Headless UI sets the checkbox's aria-describedby itself, from the Field's Description. */}
      <Description as="div">
        <FieldFeedback fieldId={feedbackId} error={error} />
      </Description>
    </Field>
  );
});
