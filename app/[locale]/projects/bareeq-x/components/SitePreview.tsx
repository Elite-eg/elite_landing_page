import { useLocale, useTranslations } from "next-intl";
import { FiExternalLink, FiLock } from "react-icons/fi";
import { PROJECT_LINKS, type AppLocale } from "@/lib/constants";

/** Shown in the address bar ("bareeqx.com"). */
const SITE_HOST = new URL(PROJECT_LINKS.bareeq.website).host;

/**
 * The live bareeqx.com in a browser frame, in the visitor's language. Lazy (below the fold) and sandboxed:
 * the site runs its own scripts but cannot navigate this page. The address bar opens the site in a new tab.
 */
export function SitePreview() {
  const t = useTranslations("caseStudies.bareeqX.result.preview");
  const src = PROJECT_LINKS.bareeq.preview[useLocale() as AppLocale];

  return (
    <div className="overflow-hidden rounded-2xl border border-edge bg-surface shadow-card">
      <div className="flex items-center gap-3 border-b border-edge bg-surface-alt px-4 py-2.5">
        <span className="flex shrink-0 gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-edge" />
          <span className="size-2.5 rounded-full bg-edge" />
          <span className="size-2.5 rounded-full bg-edge" />
        </span>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("open", { site: SITE_HOST })}
          className="flex min-w-0 max-w-md flex-1 items-center gap-2 rounded-lg border border-edge bg-surface px-3 py-1 text-caption text-content transition-colors duration-200 hover:border-bareeq/40 hover:text-bareeq"
        >
          <FiLock className="size-3.5 shrink-0" aria-hidden="true" />
          <span dir="ltr" className="truncate">
            {SITE_HOST}
          </span>
          <FiExternalLink className="ms-auto size-3.5 shrink-0" aria-hidden="true" />
        </a>
      </div>

      <iframe
        src={src}
        title={t("frameTitle")}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        className="block aspect-square w-full bg-surface sm:aspect-[16/10]"
      />
    </div>
  );
}
