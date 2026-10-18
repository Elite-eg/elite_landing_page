"use client";

import { useTranslations } from "next-intl";
import { FiGlobe } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { useLocaleToggle } from "./useLocaleToggle";

export interface HeaderLanguageToggleProps {
  className?: string;
}

/** Switches the page between Arabic and English. Label is shown in the target language. */
export function HeaderLanguageToggle({ className }: HeaderLanguageToggleProps) {
  const t = useTranslations("nav");
  const { toggleLocale, isPending, nextLocale } = useLocaleToggle();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      disabled={isPending}
      aria-label={t("switchLanguage")}
      className={cn(
        "group inline-flex cursor-pointer items-center gap-1.5 rounded-sm transition-colors duration-200 ease-out-brand disabled:opacity-60",
        className
      )}
    >
      <FiGlobe aria-hidden className="size-3.5 transition-transform duration-500 ease-out-brand group-hover:rotate-180" />
      <span lang={nextLocale}>{t("languageName")}</span>
    </button>
  );
}
