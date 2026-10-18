import { useTranslations } from "next-intl";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export interface MonthNavProps {
  label: string;
  canGoPrev: boolean;
  onPrev: () => void;
  onNext: () => void;
}

const ARROW_CLASS =
  "flex size-7 cursor-pointer items-center justify-center rounded-lg text-content transition-colors hover:bg-surface-alt hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent";

/** Month title on the start side, previous / next arrows on the end side (mirrored in RTL). */
export function MonthNav({ label, canGoPrev, onPrev, onNext }: MonthNavProps) {
  const t = useTranslations("booking");

  return (
    <div className="flex w-full items-center justify-between">
      <p className="font-heading font-semibold text-body" aria-live="polite">
        {label}
      </p>

      <div className="flex items-center gap-1">
        <button type="button" onClick={onPrev} disabled={!canGoPrev} aria-label={t("prevMonth")} className={ARROW_CLASS}>
          <FiChevronLeft className="size-4 rtl:-scale-x-100" aria-hidden="true" />
        </button>
        <button type="button" onClick={onNext} aria-label={t("nextMonth")} className={ARROW_CLASS}>
          <FiChevronRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
