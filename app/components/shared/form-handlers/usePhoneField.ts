"use client";

import { useCallback, useEffect, useRef } from "react";
import { useController, type FieldValues, type Path, type PathValue, type UseFormReturn } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useRegion } from "@/app/store/useRegion";
import type { RegionCode } from "@/lib/constants";
import { formatNationalNumber, isMobileNumberComplete } from "@/lib/phone";
import { canBecomeMobileNumber } from "@/lib/validation";
import type { PhoneCountryCode } from "./PhoneCountryPicker";

export interface UsePhoneFieldOptions<T extends FieldValues> {
  form: Pick<
    UseFormReturn<T>,
    "control" | "register" | "trigger" | "clearErrors" | "getValues" | "setValue" | "formState"
  >;
  /** Field holding the picked code ("" = automatic). */
  codeName: Path<T>;
  /** Field holding the national number. */
  numberName: Path<T>;
  /** Automatic code; default: the visitor's region (e.g. a Country field on the contact form). */
  fallback?: RegionCode;
}

/**
 * Everything `<InputField as="phone">` needs from react-hook-form (schema: phoneFieldsSchema + mobileNumberCheck).
 *
 * - Code: the form field stays "" while automatic and the code then follows `fallback` (default: the visitor's
 *   region); once the visitor picks a code, it stays.
 * - Live check while typing: the error shows as soon as the digits can't become a valid number, or once the number
 *   is complete; an unfinished number is flagged on leaving the field or on submit, not at the first keystroke.
 *   A code change regroups the number for the new country and re-checks it.
 *
 * @example
 * const phone = usePhoneField({ form, codeName: "phoneCountry", numberName: "phone" });
 * <InputField as="phone" label={t("phone")} error={…} {...phone.fieldProps} />
 * // on submit: internationalPhone(values.phoneCountry || phone.code, values.phone)
 */
export function usePhoneField<T extends FieldValues>({ form, codeName, numberName, fallback }: UsePhoneFieldOptions<T>) {
  const t = useTranslations("phoneField");
  const { region } = useRegion();
  const { control, register, trigger, clearErrors, getValues, setValue, formState } = form;
  const { field } = useController({ control, name: codeName });
  const picked = field.value as RegionCode | "";
  const code = picked || fallback || region;
  const { isSubmitted } = formState;

  const checkNumber = useCallback(
    (value: string) => {
      if (isSubmitted || (value && (isMobileNumberComplete(code, value) || !canBecomeMobileNumber(code, value)))) {
        void trigger(numberName);
      } else {
        clearErrors(numberName);
      }
    },
    [code, isSubmitted, trigger, clearErrors, numberName]
  );

  // The code changed (picked, pasted, or the automatic one moved): regroup the typed number and check it.
  const checkedCode = useRef(code);
  useEffect(() => {
    if (checkedCode.current === code) return;
    checkedCode.current = code;
    const value = getValues(numberName) as string;
    if (!value) return;
    const regrouped = formatNationalNumber(code, value, { cut: false });
    if (regrouped !== value) setValue(numberName, regrouped as PathValue<T, Path<T>>);
    checkNumber(regrouped);
  }, [code, checkNumber, getValues, setValue, numberName]);

  const countryCode: PhoneCountryCode = { value: code, onChange: field.onChange, label: t("countryCode") };
  const number = register(numberName, {
    onChange: (event) => checkNumber(event.target.value),
    onBlur: (event) => {
      if (event.target.value) void trigger(numberName);
    },
  });

  return {
    /** The code in use (picked or automatic). */
    code,
    /** Spread on `<InputField as="phone">`: number field, code picker, and the "set automatically" hint until picked. */
    fieldProps: {
      ...number,
      countryCode,
      hint: picked ? undefined : t("countryCodeDetected"),
      hintTone: "success" as const,
    },
  };
}
