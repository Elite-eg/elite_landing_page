import { useLocale, useTranslations } from "next-intl";
import { LuShieldCheck } from "react-icons/lu";
import { AddonContactDeveloperButton } from "@/app/components/shared/addons/AddonContactDeveloperButton";
import { Button } from "@/app/components/shared/Button";
import { PlanFeatureList } from "@/app/components/shared/PlanFeatureList";
import type { AddonDetails } from "@/lib/addons";
import { COMPANY_INFO, whatsappUrl, type AppLocale } from "@/lib/constants";
import { AddonFacts } from "./AddonFacts";
import { AddonPurchasePrice } from "./AddonPurchasePrice";

export interface AddonPurchaseCardProps {
  addon: AddonDetails;
}

/**
 * Purchase card (Figma "Purchase"): price, buy (orange, the page's one main action) and contact the developer,
 * what's included, the facts, and the review note.
 * TBD: there is no add-ons checkout or developer messaging yet, so both actions open WhatsApp with a prefilled message.
 */
export function AddonPurchaseCard({ addon }: AddonPurchaseCardProps) {
  const t = useTranslations("addons.details.purchase");
  const locale = useLocale() as AppLocale;
  const isFree = addon.price === null;
  const message = { name: addon.name, developer: addon.developer.name };

  return (
    <aside
      aria-label={t("label")}
      className="flex w-full shrink-0 flex-col gap-4 rounded-3xl border border-edge bg-surface p-6 sm:p-7 lg:w-[23.75rem]"
    >
      <AddonPurchasePrice price={addon.price} />

      <Button href={whatsappUrl(t(isFree ? "installMessage" : "buyMessage", message))} external variant="secondary" size="lg" fullWidth>
        {isFree ? t("install") : t("buy")}
      </Button>
      <AddonContactDeveloperButton addon={addon} size="lg" fullWidth />

      <hr className="border-edge" />
      <p className="text-caption font-medium text-body">{isFree ? t("includesFree") : t("includes")}</p>
      <PlanFeatureList features={addon.includes} marker="circle" />

      <hr className="border-edge" />
      <AddonFacts
        developer={addon.developer}
        updatedAt={addon.updatedAt}
        version={addon.version}
        versions={addon.versions}
        license={addon.license}
        languages={addon.languages}
      />

      <p className="flex items-start gap-2.5 rounded-xl bg-surface-alt px-3.5 py-3 text-caption text-ink-700">
        <LuShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
        {t("reviewed", { brand: COMPANY_INFO.brandName[locale] })}
      </p>
    </aside>
  );
}
