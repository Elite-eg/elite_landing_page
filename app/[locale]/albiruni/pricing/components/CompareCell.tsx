import { useTranslations } from "next-intl";
import { FiCheck } from "react-icons/fi";
import type { CompareCellKind } from "../data/pricingData";

export interface CompareCellProps {
  kind: CompareCellKind;
  /** Already-translated value, for "text" cells. */
  text?: string;
}

/** One plan's value in the comparison table: its text, a green check, or a light dash (both named for screen readers). */
export function CompareCell({ kind, text }: CompareCellProps) {
  const t = useTranslations("albiruniPricing.compare");

  return (
    <td className="px-3 py-4 text-center text-ink-700 sm:px-4">
      {kind === "text" && text}
      {kind === "check" && (
        <>
          <FiCheck className="mx-auto size-[1.125rem] text-success" strokeWidth={2.6} aria-hidden="true" />
          <span className="sr-only">{t("included")}</span>
        </>
      )}
      {kind === "none" && (
        <>
          <span className="text-navy-200" aria-hidden="true">
            —
          </span>
          <span className="sr-only">{t("notIncluded")}</span>
        </>
      )}
    </td>
  );
}
