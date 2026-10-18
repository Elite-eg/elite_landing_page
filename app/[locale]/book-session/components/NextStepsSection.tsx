import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { NEXT_STEP_KEYS } from "../data/bookingData";
import { NextStepCard } from "./NextStepCard";

export function NextStepsSection() {
  const t = useTranslations("booking.whatHappensNext");

  return (
    <section className="bg-surface pb-16 pt-14 sm:pb-[5.625rem] sm:pt-20">
      <Container>
        <SectionHeading title={t("title")} size="compact" />

        <RevealGroup className="grid gap-5 md:grid-cols-3">
          {NEXT_STEP_KEYS.map((key) => (
            <Reveal key={key} inGroup>
              <NextStepCard num={t(`${key}.num`)} title={t(`${key}.title`)} desc={t(`${key}.desc`)} />
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
