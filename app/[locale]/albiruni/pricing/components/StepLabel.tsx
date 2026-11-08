import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export interface StepLabelProps {
  /** Position in the pricing flow (1 sector, 2 plan, 3 apps). */
  step: number;
  /** Already-translated step name. */
  children: string;
  /** "h2" when the label titles its step (sectors, plans); "p" above a section title (apps). */
  as?: "h2" | "p";
  id?: string;
  className?: string;
}

/** Numbered step of the pricing flow ("1 · Choose your sector"): navy, semibold, heading font. */
export function StepLabel({ step, children, as: Tag = "p", id, className }: StepLabelProps) {
  const t = useTranslations("albiruniPricing");

  return (
    <Tag id={id} className={cn("text-balance font-heading text-base font-semibold text-primary", className)}>
      {t("step", { step, label: children })}
    </Tag>
  );
}
