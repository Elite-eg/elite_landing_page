"use client";

import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";
import { FieldFeedback, fieldDescribedBy, type FieldHintTone } from "./FieldFeedback";
import {
  FIELD_HEIGHT,
  FIELD_INNER_CONTROL_CLASSES,
  FIELD_LABEL_CLASSES,
  fieldBoxClasses,
} from "./fieldStyles";
import { PhoneCountryPicker, type PhoneCountryCode } from "./PhoneCountryPicker";
import { PhoneNumberInput } from "./PhoneNumberInput";

export interface BaseInputFieldProps {
  label: string;
  /** Already-translated error message. */
  error?: string;
  hint?: string;
  /** "success" adds a green check (e.g. "Country code set automatically"). */
  hintTone?: FieldHintTone;
  /** Decorative icon on the start side (input and textarea). */
  icon?: ReactNode;
  /** Visually hide the label (it stays available to screen readers). */
  hideLabel?: boolean;
  className?: string;
  inputClassName?: string;
}

type NativeInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "className">;
type NativeTextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className">;

/** `as` picks the control. `countryCode` exists only for "phone" (`never` elsewhere, so TypeScript enforces it). */
export type InputFieldProps = BaseInputFieldProps &
  (
    | ({ as?: "input"; countryCode?: never } & NativeInputProps)
    | ({ as: "textarea"; countryCode?: never; rows?: number } & NativeTextareaProps)
    | ({
        /** Number after a dial code picker in one box. Always LTR (`dir` and `icon` are ignored). */
        as: "phone";
        countryCode: PhoneCountryCode;
      } & NativeInputProps)
  );

/**
 * The shared text field (elite-design-rules.txt, "Forms"): one label, box, error / hint line and disabled state
 * for every kind of text entry.
 *
 * @example
 * <InputField label={t("name")} {...register("name")} />
 * <InputField as="textarea" rows={3} label={t("notes")} {...register("notes")} />
 * // Phone: schema from phoneFieldsSchema() + mobileNumberCheck, everything else from usePhoneField.
 * const phone = usePhoneField({ form, codeName: "phoneCountry", numberName: "phone" });
 * <InputField as="phone" label={t("phone")} error={…} {...phone.fieldProps} />
 */
export const InputField = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputFieldProps>(
  function InputField(props, ref) {
    const {
      label,
      error,
      hint,
      hintTone,
      icon,
      hideLabel = false,
      className,
      inputClassName,
      id,
      disabled,
      dir,
      as = "input",
      countryCode,
      ...restProps
    } = props;

    const generatedId = useId();
    const inputId = id ?? generatedId;
    const controlProps = {
      id: inputId,
      disabled,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": fieldDescribedBy(inputId, error, hint),
    };
    const boxClasses = cn(fieldBoxClasses({ hasError: Boolean(error) }), icon && "ps-11", inputClassName);

    let control: ReactNode;
    if (as === "phone" && countryCode) {
      control = (
        // LTR in both languages: dial code | number, as written. The open menu keeps the box outlined (:has).
        <div
          dir="ltr"
          className={cn(
            fieldBoxClasses({ hasError: Boolean(error), focus: "within" }),
            FIELD_HEIGHT,
            "flex items-stretch overflow-hidden p-0",
            error
              ? "has-[[data-open]]:ring-[0.5px] has-[[data-open]]:ring-danger"
              : "has-[[data-open]]:border-secondary has-[[data-open]]:ring-[0.5px] has-[[data-open]]:ring-secondary"
          )}
        >
          <PhoneCountryPicker {...countryCode} disabled={disabled} />
          <span aria-hidden="true" className="w-px shrink-0 bg-edge" />
          <PhoneNumberInput
            ref={ref as Ref<HTMLInputElement>}
            countryCode={countryCode}
            className={cn(FIELD_INNER_CONTROL_CLASSES, "min-w-0 flex-1 px-4", inputClassName)}
            {...controlProps}
            {...(restProps as NativeInputProps)}
          />
        </div>
      );
    } else {
      control = (
        // `dir` also goes on the wrapper, so an icon sits on the same side as the input's start padding.
        <div className="relative" dir={dir}>
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
              ref={ref as Ref<HTMLTextAreaElement>}
              dir={dir}
              className={cn(boxClasses, "py-2.5 resize-none min-h-[90px]")}
              {...controlProps}
              {...(restProps as NativeTextareaProps)}
            />
          ) : (
            <input
              ref={ref as Ref<HTMLInputElement>}
              dir={dir}
              className={cn(boxClasses, FIELD_HEIGHT, "py-2.5")}
              {...controlProps}
              {...(restProps as NativeInputProps)}
            />
          )}
        </div>
      );
    }

    return (
      <div className={cn("w-full", className)}>
        <label htmlFor={inputId} className={cn(FIELD_LABEL_CLASSES, hideLabel && "sr-only")}>
          {label}
        </label>

        {control}

        <FieldFeedback fieldId={inputId} error={error} hint={hint} hintTone={hintTone} />
      </div>
    );
  }
);
