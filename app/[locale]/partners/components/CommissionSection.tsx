import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { PRICING_PLANS } from "../../albiruni/pricing/data/pricingData";
import { CommissionTile } from "./CommissionTile";

/** The commission per client of each Albiruni plan (grey tiles on white), then the preliminary-rates note. */
export function CommissionSection() {
  const t = useTranslations("partners.commission");

  return (
    <section className="bg-surface py-20 sm:py-24">
      <Container>
        <SectionHeading title={t("title")} align="start" size="compact" headingClassName="text-body" className="mb-8" />

        <RevealGroup className="grid gap-4 md:grid-cols-3">
          {PRICING_PLANS.map(({ key }) => (
            <Reveal key={key} inGroup>
              <CommissionTile plan={key} />
            </Reveal>
          ))}
        </RevealGroup>

        <p className="mt-8 text-caption text-content">{t("note")}</p>
      </Container>
    </section>
  );
}
