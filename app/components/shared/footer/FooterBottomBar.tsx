import { useLocale, useTranslations } from "next-intl";
import { COMPANY_INFO, LEGAL_NAV_ITEMS, type AppLocale } from "@/lib/constants";
import { FooterLink } from "./FooterLink";

export function FooterBottomBar() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale() as AppLocale;

  return (
    <div className="flex flex-col gap-4 border-t border-surface/10 pt-6 text-xs text-content-dark/80 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
        <p>{t("rights", { year: new Date().getFullYear(), brand: COMPANY_INFO.brandName[locale] })}</p>
        <nav aria-label={t("legalLabel")}>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <FooterLink href={item.href} nudge={false} className="text-content-dark/80">
                  {tNav(item.labelKey)}
                </FooterLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p title={t("commercialRegister")}>
        {t("commercialRegisterShort", { number: COMPANY_INFO.commercialRegister })}
      </p>
    </div>
  );
}
