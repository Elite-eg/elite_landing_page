import { useTranslations } from "next-intl";
import { FiCheck, FiPlus } from "react-icons/fi";
import { cn } from "@/lib/utils";

export interface AppToggleChipProps {
  added: boolean;
}

/** "Add +" / "Added ✓" pill on an app card. Visual only: the card itself is the checkbox. */
export function AppToggleChip({ added }: AppToggleChipProps) {
  const t = useTranslations("albiruniPricing.apps");
  const Icon = added ? FiCheck : FiPlus;

  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors duration-200 ease-out-brand",
        added ? "border-secondary bg-secondary text-surface" : "border-navy-200 bg-surface text-primary"
      )}
    >
      {added ? t("added") : t("add")}
      <Icon className="size-3.5" strokeWidth={2.4} />
    </span>
  );
}
