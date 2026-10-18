import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const AVATAR_CLASS =
  "flex size-10 items-center justify-center rounded-full border-2 border-navy-900 font-heading text-sm font-bold text-white";

/** "Who attends" note: expert + developer initials overlapping on the end side. */
export function AttendeesCard() {
  const t = useTranslations("booking.attendeeCard");

  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3.5">
      <div className="flex flex-col gap-0.5">
        <p className="font-heading text-[0.90625rem] font-semibold text-white">{t("title")}</p>
        <p className="text-[0.78125rem] text-navy-300">{t("subtitle")}</p>
      </div>

      <div className="flex shrink-0" aria-hidden="true">
        <span className={cn(AVATAR_CLASS, "relative z-10 bg-accent")}>{t("developerInitial")}</span>
        <span className={cn(AVATAR_CLASS, "-ms-2.5 bg-secondary")}>{t("expertInitial")}</span>
      </div>
    </div>
  );
}
