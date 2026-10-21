import type { ReactNode } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { Button, type ButtonSize } from "@/app/components/shared/Button";
import { cn } from "@/lib/utils";

export interface WhatsAppApplyButtonProps {
  /** wa.me link, usually with a prefilled message (whatsappUrl). */
  href: string;
  children: ReactNode;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

/**
 * WhatsApp-green outline link: the jobs page's alternative to the application form. Hover changes colour only
 * (no lift), so the green label stays crisp.
 */
export function WhatsAppApplyButton({ href, children, size, fullWidth, className }: WhatsAppApplyButtonProps) {
  return (
    <Button
      href={href}
      external
      variant="outline"
      size={size}
      fullWidth={fullWidth}
      lift={false}
      icon={<FaWhatsapp className="text-whatsapp" />}
      iconPosition="start"
      className={cn(
        "border-whatsapp/40 bg-whatsapp/10 text-whatsapp-dark hover:border-whatsapp/60 hover:bg-whatsapp/20 hover:shadow-none",
        className
      )}
    >
      {children}
    </Button>
  );
}
