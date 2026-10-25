"use client";

import { forwardRef, useId } from "react";
import { Description, Field, Label, Listbox, ListboxButton } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { FieldFeedback, type FieldHintTone } from "./FieldFeedback";
import { FIELD_HEIGHT, FIELD_LABEL_CLASSES, FIELD_OPEN_CLASSES, fieldBoxClasses } from "./fieldStyles";
import { SelectMenu, type SelectOption } from "./SelectMenu";

export type { SelectOption } from "./SelectMenu";

export interface SelectFieldProps {
  label: string;
  options: readonly SelectOption[];
  /** Selected value. "" shows the placeholder. */
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  /** Also renders a hidden input, so native form data includes the value. */
  name?: string;
  /** Already-translated prompt, shown muted while nothing is chosen. */
  placeholder?: string;
  /** Already-translated error message. */
  error?: string;
  hint?: string;
  hintTone?: FieldHintTone;
  disabled?: boolean;
  hideLabel?: boolean;
  className?: string;
}

/**
 * Shared dropdown field: the InputField box with a Headless UI Listbox, opening the shared SelectMenu
 * (keyboard: arrows, type-ahead, Enter, Escape). Controlled, so with react-hook-form use a Controller:
 *
 * @example
 * <Controller name="need" control={control} render={({ field }) => <SelectField label={t("need")} options={…} {...field} />} />
 */
export const SelectField = forwardRef<HTMLButtonElement, SelectFieldProps>(function SelectField(
  {
    label,
    options,
    value,
    onChange,
    onBlur,
    name,
    placeholder,
    error,
    hint,
    hintTone,
    disabled,
    hideLabel = false,
    className,
  },
  ref
) {
  const feedbackId = useId();
  const selected = options.find((option) => option.value === value);

  return (
    <Field disabled={disabled} className={cn("w-full", className)}>
      <Label className={cn(FIELD_LABEL_CLASSES, hideLabel && "sr-only")}>{label}</Label>

      <Listbox value={value} onChange={onChange} name={name} disabled={disabled}>
        <ListboxButton
          ref={ref}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          className={cn(
            fieldBoxClasses({ hasError: Boolean(error) }),
            FIELD_OPEN_CLASSES[error ? "error" : "valid"],
            FIELD_HEIGHT,
            "group flex cursor-pointer items-center justify-between gap-3 text-start"
          )}
        >
          <span className={cn("truncate", !selected && "text-ink-400")}>{selected?.label ?? placeholder}</span>
          <FiChevronDown
            aria-hidden="true"
            className="size-4 shrink-0 text-content/70 transition-transform duration-200 group-data-[open]:rotate-180"
          />
        </ListboxButton>

        <SelectMenu options={options} className="w-[var(--button-width)]" />
      </Listbox>

      {/* Headless UI sets the button's aria-describedby itself, from the Field's Description. */}
      <Description as="div">
        <FieldFeedback fieldId={feedbackId} error={error} hint={hint} hintTone={hintTone} />
      </Description>
    </Field>
  );
});
