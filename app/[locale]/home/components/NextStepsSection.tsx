import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { NEXT_STEPS } from "../data/homeData";
import { HomeSectionHeader } from "./HomeSectionHeader";
import { NextStepCard } from "./NextStepCard";

/** "Start with the step that suits you" (Figma "Lead magnets"): the page's navy band with six free offers. */
export function NextStepsSection() {
  const t = useTranslations("home.nextSteps");

  return (
    <section className="bg-gradient-to-tr from-primary-deep to-primary py-20 sm:py-24">
      <Container>
        <HomeSectionHeader
          layout="stacked"
          tone="dark"
          eyebrow={t("eyebrow")}
          title={t("title")}
          aside={<p className="text-body-lg text-content-dark">{t("subtitle")}</p>}
        />

        <RevealGroup className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {NEXT_STEPS.map((step) => (
            <Reveal key={step.key} inGroup className="h-full">
              <NextStepCard step={step} />
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
