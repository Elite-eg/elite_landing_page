import { useLocale, useTranslations } from "next-intl";
import { AppLinkBadge } from "@/app/components/shared/AppLinkBadge";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { COMPANY_INFO, type AppLocale } from "@/lib/constants";
import { BAREEQ_LINKS, BAREEQ_TIMELINE } from "../data/bareeqData";
import { CaseStudySection } from "./CaseStudySection";
import { SitePreview } from "./SitePreview";
import { TimelineItem } from "./TimelineItem";

/**
 * Last chapter: timeline, the live website, then the project links.
 * No bottom padding: the CTA banner below brings its own top spacing.
 */
export function ResultSection() {
  const t = useTranslations("caseStudies");
  const brand = COMPANY_INFO.brandName[useLocale() as AppLocale];

  return (
    <CaseStudySection eyebrow={t("sections.result")} title={t("bareeqX.result.title")} className="pb-0 sm:pb-0">
      <RevealGroup>
        <ol>
          {BAREEQ_TIMELINE.map(({ key, status }, index) => (
            <TimelineItem
              key={key}
              status={status}
              isLast={index === BAREEQ_TIMELINE.length - 1}
              date={t(`bareeqX.result.timeline.${key}.date`)}
              title={t(`bareeqX.result.timeline.${key}.title`)}
              text={t(`bareeqX.result.timeline.${key}.text`, { brand })}
            />
          ))}
        </ol>
      </RevealGroup>

      <Reveal className="mt-8">
        <h3 className="text-caption font-semibold text-content">{t("bareeqX.result.preview.title")}</h3>
        <div className="mt-3">
          <SitePreview />
        </div>
      </Reveal>

      <Reveal className="mt-6">
        <ul aria-label={t("bareeqX.result.linksLabel")} className="flex flex-wrap gap-3">
          {BAREEQ_LINKS.map((link) => (
            <li key={link.kind}>
              <AppLinkBadge tone="light" link={link} siteName={t("bareeqX.hero.name")} />
            </li>
          ))}
        </ul>
      </Reveal>
    </CaseStudySection>
  );
}
