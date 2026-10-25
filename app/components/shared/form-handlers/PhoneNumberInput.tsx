"use client";

import { forwardRef, useRef, type ChangeEvent, type FocusEvent, type InputHTMLAttributes } from "react";
import {
  caretAfterDigits,
  countDigits,
  formatNationalNumber,
  isMobileNumberComplete,
  phonePlaceholder,
  splitInternationalNumber,
  toLatinDigits,
  withoutLeadingZero,
} from "@/lib/phone";
import type { PhoneCountryCode } from "./PhoneCountryPicker";

export interface PhoneNumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  countryCode: PhoneCountryCode;
}

/**
 * National number part of `<InputField as="phone">`. Every edit is cleaned and formatted for the selected country
 * (digits only, Arabic digits converted, grouped, cut at the country's length), keeping the caret on the same digit.
 * Once the number is complete, typing more digits does nothing. A pasted number loses its leading 0
 * ("01122999933" → "11 2299 9933"; a typed 0 stays, so the check flags it), and a pasted international number
 * ("+966 …", "0020 …") moves the code picker to its country. Used by InputField only.
 */
export const PhoneNumberInput = forwardRef<HTMLInputElement, PhoneNumberInputProps>(function PhoneNumberInput(
  { countryCode, onChange, onFocus, placeholder, ...inputProps },
  ref
) {
  /** Edits that put in a whole number at once: paste, drag and drop, browser autofill (no inputType). */
const WHOLE_NUMBER_INPUTS = new Set(["insertFromPaste", "insertFromDrop", "insertReplacementText", undefined]);

/** Last formatted value, to tell a deleted space (no digit removed) from a deleted digit. */
  const lastValue = useRef("");

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    lastValue.current = event.target.value;
    onFocus?.(event);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const caretIndex = input.selectionStart ?? input.value.length;
    const { inputType, data } = event.nativeEvent as InputEvent;
    const international = splitInternationalNumber(input.value);
    const code = international?.code ?? countryCode.value;
    const wholeNumber = WHOLE_NUMBER_INPUTS.has(inputType);

    let digits = international
      ? international.national
      : wholeNumber
        ? withoutLeadingZero(input.value)
        : toLatinDigits(input.value).replace(/\D/g, "");
    let digitsBeforeCaret = countDigits(input.value.slice(0, caretIndex));

    // Typing into a complete number: keep it as it was (no digit pushed out at the end).
    const addsDigits = countDigits(digits) > countDigits(lastValue.current);
    if (!international && inputType === "insertText" && addsDigits && isMobileNumberComplete(code, lastValue.current)) {
      input.value = lastValue.current;
      const caret = Math.max(0, caretIndex - (data?.length ?? 1));
      input.setSelectionRange(caret, caret);
      return;
    }
    if (international && code !== countryCode.value) countryCode.onChange(code);

    // Backspace / Delete on a space removed no digit: remove the digit next to it, or the space just comes back.
    if (!international && countDigits(digits) === countDigits(lastValue.current)) {
      if (inputType === "deleteContentBackward" && digitsBeforeCaret > 0) {
        digits = digits.slice(0, digitsBeforeCaret - 1) + digits.slice(digitsBeforeCaret);
        digitsBeforeCaret -= 1;
      } else if (inputType === "deleteContentForward") {
        digits = digits.slice(0, digitsBeforeCaret) + digits.slice(digitsBeforeCaret + 1);
      }
    }

    const formatted = formatNationalNumber(code, digits);
    input.value = formatted;
    lastValue.current = formatted;
    const caret = international || wholeNumber ? formatted.length : caretAfterDigits(formatted, digitsBeforeCaret);
    input.setSelectionRange(caret, caret);
    onChange?.(event);
  };

  return (
    <input
      ref={ref}
      type="tel"
      inputMode="tel"
      autoComplete="tel-national"
      placeholder={placeholder ?? phonePlaceholder(countryCode.value)}
      onFocus={handleFocus}
      onChange={handleChange}
      {...inputProps}
    />
  );
});
