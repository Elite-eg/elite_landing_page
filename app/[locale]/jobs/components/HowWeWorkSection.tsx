import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { HOW_WE_WORK } from "../data/jobsData";
import { HowWeWorkCard } from "./HowWeWorkCard";

export function HowWeWorkSection() {
  const t = useTranslations("jobs.howWeWork");

  return (
    <section className="bg-surface-alt py-16 sm:py-24">
      <Container>
        {/* The jobs page keeps its original darker heading color (surface-dark). */}
        <SectionHeading title={t("title")} className="[&_h2]:text-surface-dark" />

        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_WE_WORK.map(({ key, icon, hasMaherBadge }) => (
            <Reveal key={key} inGroup>
              <HowWeWorkCard
                icon={icon}
                title={t(`${key}.title`)}
                text={t(`${key}.subtitle`)}
                badge={hasMaherBadge ? t("maherBadge") : undefined}
              />
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
