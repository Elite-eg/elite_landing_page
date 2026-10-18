import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CheckoutPanelProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

/** White card that frames each checkout step. */
export function CheckoutPanel({ title, subtitle, children, className }: CheckoutPanelProps) {
  return (
    <div className={cn("rounded-2xl border border-edge bg-surface p-6 shadow-card sm:p-8", className)}>
      <h2 className="text-h3 font-bold text-primary">{title}</h2>
      {subtitle && <p className="mt-2 text-caption text-content">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}
