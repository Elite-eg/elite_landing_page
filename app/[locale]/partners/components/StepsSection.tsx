import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { InfoTile } from "@/app/components/shared/tiles/InfoTile";
import { StepNumber } from "@/app/components/shared/tiles/StepNumber";
import { PARTNER_STEPS } from "../data/partnersData";

/** How referral and commission work: four numbered white tiles on the grey band (a real sequence). */
export function StepsSection() {
  const t = useTranslations("partners.steps");

  return (
    <section className="bg-surface-alt py-20 sm:py-24">
      <Container>
        <SectionHeading title={t("title")} align="start" size="compact" headingClassName="text-body" className="mb-8" />

        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PARTNER_STEPS.map((key, index) => (
            <Reveal key={key} inGroup>
              <InfoTile lead={<StepNumber step={index + 1} />} title={t(`items.${key}.title`)} text={t(`items.${key}.text`)} />
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
