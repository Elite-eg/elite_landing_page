import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { AGENCY_STEPS } from "../data/agentsData";
import { StepCard } from "./StepCard";

/** The four steps from application to first sales (a real sequence, so the tiles are numbered). */
export function StepsSection() {
  const t = useTranslations("agents.steps");

  return (
    <section className="bg-surface py-20 sm:py-24">
      <Container>
        <SectionHeading title={t("title")} align="start" size="compact" headingClassName="text-body" className="mb-8" />

        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AGENCY_STEPS.map((key, index) => (
            <Reveal key={key} inGroup>
              <StepCard step={index + 1} title={t(`items.${key}.title`)} text={t(`items.${key}.text`)} />
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
