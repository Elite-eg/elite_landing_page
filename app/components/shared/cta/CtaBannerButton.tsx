import type { ReactNode } from "react";
import { Button, type ButtonVariant } from "@/app/components/shared/Button";

export interface CtaBannerAction {
  label: string;
  href: string;
  external?: boolean;
  icon?: ReactNode;
}

interface CtaBannerButtonProps {
  action: CtaBannerAction;
  variant: Extract<ButtonVariant, "primary" | "outline">;
}

export function CtaBannerButton({ action, variant }: CtaBannerButtonProps) {
  return (
    <Button
      href={action.href}
      external={action.external}
      variant={variant}
      size="lg"
      icon={action.icon}
      iconPosition="start"
      className={variant === "outline" ? "border-transparent" : undefined}
    >
      {action.label}
    </Button>
  );
}
