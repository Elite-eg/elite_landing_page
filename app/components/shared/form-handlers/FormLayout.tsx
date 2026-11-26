"use client";

import { useId, type FormEventHandler, type ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { SubmitButton } from "./SubmitButton";

export interface FormLayoutProps {
  /** Visible title at the top of the card; also names the form for screen readers. */
  title: string;
  /** Optional line under the title (e.g. when we reply). */
  subtitle?: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  submitLabel: string;
  /** Label while sending ("Sending…"). */
  submittingLabel: string;
  isSubmitting: boolean;
  /** Small line under the button: the privacy note (rich text with links), what happens next… */
  note?: ReactNode;
  /** The fields: two columns from sm; full-width ones add `sm:col-span-2`. */
  children: ReactNode;
}

/**
 * The one layout of every page form (the contact form): title, fields on an 18px grid, the full-width orange
 * submit with its arrow, and a note under it. Put it in a `FormCard`. Enters and exits with fadeInUp, so it can
 * swap with its SuccessPanel inside <AnimatePresence>.
 */
export function FormLayout({
  title,
  subtitle,
  onSubmit,
  submitLabel,
  submittingLabel,
  isSubmitting,
  note,
  children,
}: FormLayoutProps) {
  const titleId = useId();

  return (
    <motion.form
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onSubmit={onSubmit}
      noValidate
      aria-labelledby={titleId}
    >
      <h2 id={titleId} className="text-h3 font-bold text-body">
        {title}
      </h2>
      {subtitle && <p className="mt-1.5 text-caption text-content">{subtitle}</p>}

      <div className="mt-[1.125rem] grid gap-[1.125rem] sm:grid-cols-2">{children}</div>

      <SubmitButton isLoading={isSubmitting} pendingLabel={submittingLabel} className="mt-[1.125rem]">
        {submitLabel}
      </SubmitButton>

      {note && <p className="mt-3 text-xs text-ink-400">{note}</p>}
    </motion.form>
  );
}
