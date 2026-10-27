"use client";

import { useTranslations } from "next-intl";
import { Container } from "../Container";
import { CountrySwitcher } from "../country/CountrySwitcher";
import { HEADER_ACCOUNT_LINKS, HEADER_UTILITY_LINKS } from "@/lib/constants";
import { HeaderLanguageToggle } from "./HeaderLanguageToggle";
import { HeaderTopBarLink } from "./HeaderTopBarLink";

const LINK_CLASS = "hover:text-surface";

/** Thin ink bar above the navbar (desktop only): utility links on the start side, country, language + account links on the end side. */
export function HeaderTopBar() {
  const t = useTranslations("nav");

  return (
    <div className="hidden h-8 bg-ink-900 text-xs text-content-dark lg:block">
      <Container className="flex h-full items-center justify-between gap-6">
        <nav aria-label={t("utilityNav")} className="flex items-center gap-5">
          {HEADER_UTILITY_LINKS.map((item) => (
            <HeaderTopBarLink key={item.href} item={item} className={LINK_CLASS} />
          ))}
        </nav>

        {/* DOM order = reading order: country, language, support, login (right-to-left in Arabic). */}
        <div className="flex items-center gap-5">
          <CountrySwitcher className="text-surface" />
          <HeaderLanguageToggle className={LINK_CLASS} />
          {HEADER_ACCOUNT_LINKS.map((item) => (
            <HeaderTopBarLink key={item.href} item={item} className={LINK_CLASS} />
          ))}
        </div>
      </Container>
    </div>
  );
}
