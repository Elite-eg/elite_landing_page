import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/app/components/shared/Button";
import { COMPANY_INFO, ROUTES, type AppLocale } from "@/lib/constants";

/** Warm note under the apps (Figma "Add-ons link"): a missing feature → browse the add-ons store. */
export function AddonsStoreNote() {
  const t = useTranslations("albiruniPricing.apps.store");
  const locale = useLocale() as AppLocale;

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-surface-warm px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="text-lg font-semibold leading-relaxed text-body">{t("title")}</h3>
        <p className="mt-1 text-caption text-ink-700">{t("text", { brand: COMPANY_INFO.brandName[locale] })}</p>
      </div>
      <Button href={ROUTES.albiruni.addons} className="shrink-0 self-start sm:self-auto">
        {t("action")}
      </Button>
    </div>
  );
}
