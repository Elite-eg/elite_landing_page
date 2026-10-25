"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { fadeInUp, popIn } from "@/lib/animations";
import { cn } from "@/lib/utils";

export interface SuccessDetail {
  label: string;
  value: ReactNode;
  /** Highlighted value (orange), e.g. the meeting type. */
  emphasis?: boolean;
  /** Left-to-right value (phone numbers, emails). */
  ltr?: boolean;
  /** Long text (a message): label above, value across the row, cut after 3 lines. Other values stay on one line. */
  wide?: boolean;
}

export interface SuccessPanelProps {
  title: string;
  subtitle: string;
  /** Summary rows of what was sent / booked. */
  details?: SuccessDetail[];
  /** Actions under the summary (e.g. "Back to home"). */
  children?: ReactNode;
  /** Heading level: h3 inside a widget step, h2 when it replaces a page section's form. */
  as?: "h2" | "h3";
  /** Move focus to the title when shown (the panel replaced the focused form). */
  focusTitle?: boolean;
}

/**
 * Confirmation shown in place of a finished flow (book-session step 3, contact form): green check, title, text,
 * a summary box and the next actions. Enters and exits with fadeInUp, so it can swap inside <AnimatePresence>.
 */
export function SuccessPanel({ title, subtitle, details, children, as: Heading = "h3", focusTitle = false }: SuccessPanelProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (focusTitle) titleRef.current?.focus();
  }, [focusTitle]);

  return (
    <motion.div variants={fadeInUp} initial="hidden" animate="visible" exit="hidden" className="space-y-5 py-6 text-center">
      <motion.span variants={popIn} className="mx-auto grid size-16 place-items-center rounded-full bg-surface-info text-success shadow-inner">
        <FiCheckCircle className="size-10" aria-hidden="true" />
      </motion.span>

      <div className="space-y-2">
        <Heading ref={titleRef} tabIndex={-1} className="text-lg font-bold text-body outline-none sm:text-xl">
          {title}
        </Heading>
        <p className="mx-auto max-w-xs text-xs text-content sm:max-w-sm sm:text-sm">{subtitle}</p>
      </div>

      {details && details.length > 0 && (
        <dl className="space-y-2 rounded-2xl border border-edge/60 bg-surface-alt p-4 text-start text-xs shadow-sm">
          {details.map(({ label, value, emphasis, ltr, wide }) => (
            <div key={label} className={wide ? "space-y-1 pt-1" : "flex items-center justify-between gap-4"}>
              <dt className="shrink-0 text-content">{label}</dt>
              <dd
                // "auto": a Latin value on an Arabic page keeps its start visible when cut ("Al Hulool…").
                dir={ltr ? "ltr" : "auto"}
                // Cut values show in full on hover.
                title={typeof value === "string" ? value : undefined}
                className={cn(
                  emphasis ? "text-secondary" : "text-body",
                  wide
                    ? "line-clamp-3 whitespace-pre-line break-words leading-relaxed"
                    : "min-w-0 truncate text-end font-bold"
                )}
              >
                {value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {children}
    </motion.div>
  );
}
