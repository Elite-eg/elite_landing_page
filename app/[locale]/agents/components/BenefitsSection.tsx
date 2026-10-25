import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { AGENCY_BENEFITS } from "../data/agentsData";
import { BenefitCard } from "./BenefitCard";

/** What an agent gets: four white tiles on the grey band. */
export function BenefitsSection() {
  const t = useTranslations("agents.benefits");

  return (
    <section className="bg-surface-alt py-20 sm:py-24">
      <Container>
        <SectionHeading title={t("title")} align="start" size="compact" headingClassName="text-body" className="mb-8" />

        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AGENCY_BENEFITS.map((key) => (
            <Reveal key={key} inGroup>
              <BenefitCard title={t(`items.${key}.title`)} text={t(`items.${key}.text`)} />
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
