import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { ABOUT_VALUES } from "../data/aboutData";
import { ValueCard } from "./ValueCard";

export function ValuesSection() {
  const t = useTranslations("about.values");

  return (
    <section className="bg-surface-alt py-20 sm:py-24">
      <Container>
        <SectionHeading title={t("title")} align="start" />

        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_VALUES.map((key, index) => (
            <Reveal key={key} inGroup>
              <ValueCard index={index} title={t(`items.${key}.title`)} text={t(`items.${key}.text`)} />
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
