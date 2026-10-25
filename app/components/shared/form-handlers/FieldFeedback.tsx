import type { ReactNode } from "react";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";

/** "success" confirms something done for the visitor (e.g. a detected country code). */
export type FieldHintTone = "neutral" | "success";

/** Success hints keep body-contrast text (green fails AA at 12px); the green check carries the tone. */
const HINT_ICONS: Record<FieldHintTone, ReactNode> = {
  neutral: null,
  success: <FiCheckCircle className="size-3.5 shrink-0 text-success" aria-hidden="true" />,
};

/** aria-describedby value for a control whose messages are rendered by FieldFeedback. */
export const fieldDescribedBy = (fieldId: string, error?: string, hint?: ReactNode) =>
  error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined;

export interface FieldFeedbackProps {
  /** id of the control. Messages get `${fieldId}-error` / `${fieldId}-hint`. */
  fieldId: string;
  /** Already-translated error message. Wins over the hint. */
  error?: string;
  hint?: ReactNode;
  hintTone?: FieldHintTone;
}

/** Error (or hint) line under a form control. */
export function FieldFeedback({ fieldId, error, hint, hintTone = "neutral" }: FieldFeedbackProps) {
  if (error) {
    return (
      <p id={`${fieldId}-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-danger">
        <FiAlertCircle className="size-4 shrink-0" aria-hidden="true" />
        {error}
      </p>
    );
  }

  if (!hint) return null;

  return (
    <p id={`${fieldId}-hint`} className="mt-1.5 flex items-center gap-1.5 text-xs text-content">
      {HINT_ICONS[hintTone]}
      {hint}
    </p>
  );
}
