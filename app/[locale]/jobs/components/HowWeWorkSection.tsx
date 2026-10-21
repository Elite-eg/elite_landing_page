import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { HOW_WE_WORK } from "../data/jobsData";
import { HowWeWorkCard } from "./HowWeWorkCard";

/** How the team works: the hiring path (remote evaluation → office) and what you work on. */
export function HowWeWorkSection() {
  const t = useTranslations("jobs.howWeWork");

  return (
    <section className="bg-surface pb-16 pt-20 sm:pb-24 sm:pt-24">
      <Container>
        <SectionHeading title={t("title")} align="start" size="compact" headingClassName="text-body" />

        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_WE_WORK.map(({ key, icon }) => (
            <Reveal key={key} inGroup>
              <HowWeWorkCard icon={icon} title={t(`${key}.title`)} text={t(`${key}.text`)} />
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
