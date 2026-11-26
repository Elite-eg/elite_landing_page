import type { ReactNode } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Button, type ButtonSize, type ButtonVariant } from "../Button";

export interface SubmitButtonProps {
  children: ReactNode;
  /** Shows the spinner (in place of the arrow) and disables the button while the form is sending. */
  isLoading?: boolean;
  /** Label while sending ("Sending…"); the normal label stays when omitted. */
  pendingLabel?: string;
  /** Orange by default: a form's submit is the view's main action. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  lift?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * Every form's submit button: always the forward arrow at the end (mirrored in RTL), full width by default.
 *
 * @example
 * <SubmitButton isLoading={isSubmitting} pendingLabel={t("submitting")}>{t("submit")}</SubmitButton>
 */
export function SubmitButton({
  children,
  isLoading = false,
  pendingLabel,
  variant = "secondary",
  size = "lg",
  fullWidth = true,
  ...rest
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      isLoading={isLoading}
      icon={<FiArrowRight />}
      flipIconInRtl
      {...rest}
    >
      {isLoading && pendingLabel ? pendingLabel : children}
    </Button>
  );
}
