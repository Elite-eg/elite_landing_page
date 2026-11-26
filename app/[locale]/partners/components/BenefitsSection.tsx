import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { InfoTile } from "@/app/components/shared/tiles/InfoTile";
import { PARTNER_BENEFITS, PARTNER_COMMISSION_MONTHS, PARTNER_COMMISSION_PERCENT } from "../data/partnersData";

/** What the office gains: four grey tiles on white (Figma "What you gain"). */
export function BenefitsSection() {
  const t = useTranslations("partners.benefits");
  const commission = { rate: PARTNER_COMMISSION_PERCENT, months: PARTNER_COMMISSION_MONTHS };

  return (
    <section className="bg-surface py-20 sm:py-24">
      <Container>
        <SectionHeading title={t("title")} align="start" size="compact" headingClassName="text-body" className="mb-8" />

        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PARTNER_BENEFITS.map((key) => (
            <Reveal key={key} inGroup>
              <InfoTile tone="muted" title={t(`items.${key}.title`)} text={t(`items.${key}.text`, commission)} />
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
