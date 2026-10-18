"use client";

import { useTranslations } from "next-intl";
import { FiArrowLeft, FiArrowRight, FiHome, FiHelpCircle } from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function LocalizedNotFound() {
  const t = useTranslations("notFound");
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-surface-alt relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 size-96 bg-secondary/10 blur-[130px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 end-10 size-72 bg-accent/10 blur-[100px] rounded-full pointer-events-none animate-pulse" />

      <div className="max-w-xl w-full text-center space-y-8 relative z-10">
        {/* Animated Badge & Hero Graphic */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-edge/60 text-secondary text-xs font-bold shadow-sm transition-transform duration-300 hover:scale-105">
            <FiHelpCircle className="size-4 animate-bounce text-secondary" />
            <span>404 · {t("title")}</span>
          </div>

          <h1 className="text-7xl sm:text-9xl font-black bg-gradient-to-r from-secondary to-secondary-dark bg-clip-text text-transparent tracking-tighter drop-shadow-sm select-none transition-transform duration-500 hover:scale-105">
            404
          </h1>
        </div>

        {/* Localized Content */}
        <div className="bg-surface rounded-3xl p-8 sm:p-10 shadow-xl border border-edge/60 space-y-4 backdrop-blur-md transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-body">
            {t("title")}
          </h2>
          <p className="text-content leading-relaxed text-sm sm:text-base max-w-md mx-auto">
            {t("description")}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/home"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-secondary to-secondary-dark hover:from-secondary-dark hover:to-secondary text-surface font-bold px-6 py-3.5 rounded-2xl text-sm shadow-md shadow-secondary/20 hover:shadow-secondary/30 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
            >
              <FiHome className="size-4" />
              <span>{t("home")}</span>
              {isRtl ? <FiArrowLeft className="size-4" /> : <FiArrowRight className="size-4" />}
            </Link>

            <Link
              href="/book-session"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-surface-alt border border-edge/80 text-body font-bold px-6 py-3.5 rounded-2xl text-sm hover:bg-surface-muted transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
            >
              <span>{t("contact")}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
