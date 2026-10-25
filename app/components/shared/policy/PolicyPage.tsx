import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { APP_TIME_ZONE } from "@/lib/constants";
import { intlLocale } from "@/lib/locale";
import { PolicyHero } from "./PolicyHero";
import { PolicySection } from "./PolicySection";
import { PolicyToc } from "./PolicyToc";
import { POLICIES, type PolicyKey } from "./policiesData";

export interface PolicyPageProps {
  policy: PolicyKey;
}

/**
 * Policy page template (Figma v4 "SLA", "Refund"): light hero band, then the sections with an
 * "On this page" list beside them (end side from lg, above the sections on smaller screens).
 */
export function PolicyPage({ policy }: PolicyPageProps) {
  const t = useTranslations(`policies.${policy}`);
  const tCommon = useTranslations("policies.common");
  const locale = useLocale();
  const { updatedAt, sections } = POLICIES[policy];

  // Noon UTC is the same calendar day in Cairo, so the date never shifts by a day.
  const date = new Intl.DateTimeFormat(intlLocale(locale), { dateStyle: "long", timeZone: APP_TIME_ZONE }).format(
    new Date(`${updatedAt}T12:00:00Z`)
  );
  const updated = tCommon("lastUpdated", { date });
  const tocItems = sections.map(({ key }) => ({ id: key, label: t(`sections.${key}.title`) }));

  return (
    <>
      <PolicyHero
        eyebrow={tCommon("eyebrow")}
        title={t("title")}
        meta={t.has("scope") ? `${updated} · ${t("scope")}` : updated}
      />

      <Container className="grid gap-10 pb-20 pt-10 sm:pb-24 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_18.75rem] lg:gap-14">
        <PolicyToc title={tCommon("tocTitle")} items={tocItems} className="lg:order-last" />

        <article className="flex min-w-0 flex-col gap-10">
          {sections.map((section) => (
            <PolicySection key={section.key} policy={policy} section={section} />
          ))}
        </article>
      </Container>
    </>
  );
}
