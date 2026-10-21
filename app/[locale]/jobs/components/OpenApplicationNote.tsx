import { useLocale, useTranslations } from "next-intl";
import { COMPANY_INFO, whatsappUrl, type AppLocale } from "@/lib/constants";
import { WhatsAppApplyButton } from "./WhatsAppApplyButton";

export interface OpenApplicationNoteProps {
  /** false when there are no openings at all: the note then doubles as the empty state. */
  hasOpenings: boolean;
}

/** Quiet row under the openings: send a CV on WhatsApp when no role fits (or none is open). */
export function OpenApplicationNote({ hasOpenings }: OpenApplicationNoteProps) {
  const t = useTranslations("jobs.openPositions.openApplication");
  const brand = COMPANY_INFO.brandName[useLocale() as AppLocale];

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-surface-alt px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
      <div className="space-y-1">
        <p className="font-heading font-semibold text-body">{hasOpenings ? t("title") : t("emptyTitle")}</p>
        <p className="text-caption text-content">{t("text")}</p>
      </div>
      <WhatsAppApplyButton href={whatsappUrl(t("whatsappMessage", { brand }))} className="shrink-0 self-start sm:self-center">
        {t("cta")}
      </WhatsAppApplyButton>
    </div>
  );
}
