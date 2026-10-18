"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { setCookie } from "cookies-next";
import { FiGlobe } from "react-icons/fi";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export interface LocaleSwitcherProps {
  /** "dark" = over the hero video (white text). */
  tone?: "light" | "dark";
  className?: string;
}

export function LocaleSwitcher({ tone = "light", className }: LocaleSwitcherProps) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLocale = () => {
    const nextLocale = locale === "ar" ? "en" : "ar";
    setCookie("NEXT_LOCALE", nextLocale, { maxAge: 60 * 60 * 24 * 365, path: "/" });
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", nextLocale);
    }
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <button
      type="button"
      onClick={toggleLocale}
      disabled={isPending}
      aria-label={t("switchLanguage")}
      className={cn(
        "group inline-flex min-h-10 items-center gap-1.5 rounded-xl border px-3 text-sm font-bold transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-60",
        tone === "dark"
          ? "border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:border-white/40 shadow-sm"
          : "border-edge bg-surface text-primary hover:border-primary/30 hover:bg-surface-info hover:text-secondary-dark shadow-sm",
        className
      )}
    >
      <FiGlobe className="size-4 shrink-0 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" aria-hidden="true" />
      <span lang={locale === "ar" ? "en" : "ar"}>{t("languageName")}</span>
    </button>
  );
}
