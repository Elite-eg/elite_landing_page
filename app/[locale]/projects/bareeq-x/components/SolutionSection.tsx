import { useTranslations } from "next-intl";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { PROJECTS } from "@/lib/projects";
import { CaseStudySection } from "./CaseStudySection";
import { InterfaceCard } from "./InterfaceCard";

export function SolutionSection() {
  const t = useTranslations("caseStudies");

  return (
    <CaseStudySection tone="alt" eyebrow={t("sections.solution")} title={t("bareeqX.solution.title")}>
      <RevealGroup className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {PROJECTS.bareeq.caseStudy.interfaces.map(({ key, icon }) => (
          <Reveal key={key} inGroup>
            <InterfaceCard
              icon={icon}
              title={t(`bareeqX.solution.interfaces.${key}.title`)}
              text={t(`bareeqX.solution.interfaces.${key}.text`)}
            />
          </Reveal>
        ))}
      </RevealGroup>

      <Reveal className="mt-8">
        <h3 className="text-caption font-semibold text-content">{t("bareeqX.solution.techTitle")}</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {PROJECTS.bareeq.caseStudy.tech.map((key) => (
            <li
              key={key}
              className="rounded-lg border border-edge bg-surface px-3 py-1 text-caption font-medium text-primary transition-colors duration-200 hover:border-bareeq/40 hover:bg-bareeq-50 hover:text-bareeq"
            >
              {t(`bareeqX.solution.tech.${key}`)}
            </li>
          ))}
        </ul>
      </Reveal>
    </CaseStudySection>
  );
}
