import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { FiArrowRight, FiHelpCircle, FiHome } from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/lib/constants";

/** Localized tab title; overrides the layout's "index, follow" so 404s carry a single noindex signal. */
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("notFound");
  return { title: t("title"), robots: { index: false, follow: false } };
}

/** Localized 404, rendered inside the locale layout (unmatched paths reach it through [...rest]). */
export default function LocalizedNotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-surface-alt px-4 py-16 sm:px-6 lg:px-8">
      {/* Background ambient glow (inset-0 + m-auto centres it in both directions) */}
      <div className="pointer-events-none absolute inset-0 m-auto size-96 rounded-full bg-secondary/10 blur-[130px] motion-safe:animate-pulse" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-10 end-10 size-72 rounded-full bg-accent/10 blur-[100px] motion-safe:animate-pulse" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-xl space-y-8 text-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-edge/60 bg-surface px-4 py-1.5 text-xs font-bold text-secondary shadow-sm transition-transform duration-300 hover:scale-105">
            <FiHelpCircle className="size-4 text-secondary motion-safe:animate-bounce" aria-hidden="true" />
            <span>404 · {t("title")}</span>
          </div>

          <p
            dir="ltr"
            aria-hidden="true"
            className="select-none bg-gradient-to-r from-secondary to-secondary-dark bg-clip-text text-7xl font-black tracking-tighter text-transparent drop-shadow-sm transition-transform duration-500 hover:scale-105 sm:text-9xl"
          >
            404
          </p>
        </div>

        <div className="space-y-4 rounded-3xl border border-edge/60 bg-surface p-8 shadow-xl backdrop-blur-md transition-all duration-300 hover:shadow-2xl sm:p-10">
          <h1 className="text-2xl font-extrabold text-body sm:text-3xl">{t("title")}</h1>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-content sm:text-base">{t("description")}</p>

          <div className="flex flex-col items-center justify-center gap-3 pt-4 sm:flex-row">
            <Link
              href={ROUTES.home}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-secondary to-secondary-dark px-6 py-3.5 text-sm font-bold text-surface shadow-md shadow-secondary/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-secondary-dark hover:to-secondary hover:shadow-secondary/30 active:scale-95 motion-reduce:transform-none sm:w-auto"
            >
              <FiHome className="size-4" aria-hidden="true" />
              <span>{t("home")}</span>
              <FiArrowRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
            </Link>

            <Link
              href={ROUTES.bookSession}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-edge/80 bg-surface-alt px-6 py-3.5 text-sm font-bold text-body transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface-muted active:scale-95 motion-reduce:transform-none sm:w-auto"
            >
              <span>{t("contact")}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
