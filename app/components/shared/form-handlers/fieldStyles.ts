import { cn } from "@/lib/utils";

/**
 * Shared look of every form control (Figma v4 fields: white box, thin line border, 52px tall, orange outline on
 * focus), so a field never gets restyled per page.
 */

/** Visible label above a control. */
export const FIELD_LABEL_CLASSES = "mb-2 block text-caption font-medium text-body";

/** Height of single-line controls (input, select, phone). */
export const FIELD_HEIGHT = "min-h-[3.25rem]";

/** Fields draw their own focus outline (border + 0.5px ring = the Figma's 1.5px), so the global ring is switched off. */
const FOCUS_RESET =
  "outline-none focus:outline-none focus-visible:outline-none focus-within:outline-none " +
  "ring-offset-0 focus:ring-offset-0 focus-visible:ring-offset-0";

/** "self": the element is the control (input, select button). "within": a box around several controls. */
export type FieldFocusMode = "self" | "within";

const FOCUS_CLASSES: Record<FieldFocusMode, { base: string; valid: string; error: string }> = {
  self: {
    base: "focus:ring-[0.5px] disabled:cursor-not-allowed disabled:opacity-60",
    valid: "border-edge focus:border-secondary focus:ring-secondary",
    error: "border-danger focus:border-danger focus:ring-danger",
  },
  within: {
    base: "focus-within:ring-[0.5px] has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60",
    valid: "border-edge focus-within:border-secondary focus-within:ring-secondary",
    error: "border-danger focus-within:border-danger focus-within:ring-danger",
  },
};

/** Same outline while a field's menu is open (focus has moved into the menu). Add next to fieldBoxClasses(). */
export const FIELD_OPEN_CLASSES: Record<"valid" | "error", string> = {
  valid: "data-[open]:border-secondary data-[open]:ring-[0.5px] data-[open]:ring-secondary",
  error: "data-[open]:ring-[0.5px] data-[open]:ring-danger",
};

export interface FieldBoxOptions {
  hasError?: boolean;
  focus?: FieldFocusMode;
}

/** Box of a control: border, background, radius, padding and its focus / error / disabled states. */
export function fieldBoxClasses({ hasError = false, focus = "self" }: FieldBoxOptions = {}): string {
  const states = FOCUS_CLASSES[focus];

  return cn(
    "w-full rounded-xl border bg-surface px-4 text-[0.95rem] text-body",
    "placeholder:text-ink-400 transition-all duration-200",
    FOCUS_RESET,
    states.base,
    hasError ? states.error : states.valid
  );
}

/** A control inside a `fieldBoxClasses({ focus: "within" })` box: the box draws the border, background and focus. */
export const FIELD_INNER_CONTROL_CLASSES = cn(
  "bg-transparent placeholder:text-ink-400 disabled:cursor-not-allowed",
  FOCUS_RESET,
  "ring-0 focus:ring-0 focus-visible:ring-0"
);
