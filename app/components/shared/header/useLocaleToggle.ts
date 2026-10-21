"use client";

import { useCallback, useTransition } from "react";
import { useLocale } from "next-intl";
import { setCookie } from "cookies-next/client";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LOCALE_COOKIE } from "@/i18n/routing";

const ONE_YEAR = 60 * 60 * 24 * 365;

/** Switches between Arabic and English on the current page and remembers the choice. */
export function useLocaleToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLocale = useCallback(() => {
    const nextLocale = locale === "ar" ? "en" : "ar";
    setCookie(LOCALE_COOKIE, nextLocale, { maxAge: ONE_YEAR, path: "/" });
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }, [locale, pathname, router]);

  return { toggleLocale, isPending, nextLocale: locale === "ar" ? "en" : "ar" } as const;
}
