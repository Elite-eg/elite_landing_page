import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { PLATFORM_EXPERIENCES, PLATFORM_EXPERIENCES_ID } from "../data/albiruniData";
import { ExperienceCard } from "./ExperienceCard";

/** "Two experiences, one set of data": the mobile app (navy) and the web dashboard (grey), side by side from lg. */
export function ExperiencesSection() {
  const t = useTranslations("albiruni.experiences");

  return (
    <section id={PLATFORM_EXPERIENCES_ID} className="bg-surface py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} headingClassName="text-body" />

        <RevealGroup className="grid gap-6 lg:grid-cols-2">
          {PLATFORM_EXPERIENCES.map(({ key, icon, tone }) => (
            <Reveal key={key} inGroup>
              <ExperienceCard
                icon={icon}
                tone={tone}
                tag={t(`${key}.tag`)}
                title={t(`${key}.title`)}
                description={t(`${key}.description`)}
                points={t.raw(`${key}.points`) as string[]}
              />
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
