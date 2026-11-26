import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface FormCardProps {
  /** The form (`FormLayout`), or the SuccessPanel that replaces it once sent. */
  children: ReactNode;
  className?: string;
}

/** The card every page form sits in (the contact form's card): white, line border, small shadow, `rounded-3xl`. */
export function FormCard({ children, className }: FormCardProps) {
  return <div className={cn("rounded-3xl border border-edge bg-surface p-6 shadow-card sm:p-9", className)}>{children}</div>;
}
