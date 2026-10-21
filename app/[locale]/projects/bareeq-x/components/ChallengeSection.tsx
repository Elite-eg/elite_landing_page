import { useTranslations } from "next-intl";
import { Reveal } from "@/app/components/shared/Reveal";
import { CaseStudySection } from "./CaseStudySection";

export function ChallengeSection() {
  const t = useTranslations("caseStudies");

  return (
    <CaseStudySection eyebrow={t("sections.challenge")} title={t("bareeqX.challenge.title")}>
      <Reveal>
        <p className="max-w-prose text-body-lg text-ink-700">
          {t.rich("bareeqX.challenge.text", {
            partner: (chunks) => (
              <mark className="rounded-md bg-bareeq-50 px-1.5 font-medium text-bareeq box-decoration-clone">
                {chunks}
              </mark>
            ),
          })}
        </p>
      </Reveal>
    </CaseStudySection>
  );
}
