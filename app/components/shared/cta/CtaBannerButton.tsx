import type { ReactNode } from "react";
import { Button, type ButtonVariant } from "@/app/components/shared/Button";

export interface CtaBannerAction {
  label: string;
  href: string;
  external?: boolean;
  icon?: ReactNode;
  /** Defaults to "start". Forward arrows go at the "end" with `flipIconInRtl`. */
  iconPosition?: "start" | "end";
  flipIconInRtl?: boolean;
}

export type CtaBannerButtonVariant = Extract<ButtonVariant, "primary" | "outline" | "glass">;

interface CtaBannerButtonProps {
  action: CtaBannerAction;
  variant: CtaBannerButtonVariant;
}

/** Tweaks the base variants for the orange banner background. */
const VARIANT_OVERRIDES: Partial<Record<CtaBannerButtonVariant, string>> = {
  outline: "border-transparent",
  /** White outline on orange (Figma "Ghost on dark"). */
  glass: "border-white/60 bg-transparent backdrop-blur-none hover:border-white hover:bg-white/10",
};

export function CtaBannerButton({ action, variant }: CtaBannerButtonProps) {
  return (
    <Button
      href={action.href}
      external={action.external}
      variant={variant}
      size="lg"
      icon={action.icon}
      iconPosition={action.iconPosition ?? "start"}
      flipIconInRtl={action.flipIconInRtl}
      className={VARIANT_OVERRIDES[variant]}
    >
      {action.label}
    </Button>
  );
}
