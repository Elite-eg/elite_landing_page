import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { PRICING_FAQ, planByKey } from "../data/pricingData";
import { FaqItem } from "./FaqItem";

/** "Frequently asked questions" on the grey band: title on the start side, the questions beside it (stacked below lg). */
export function PricingFaqSection() {
  const t = useTranslations("albiruniPricing.faq");

  return (
    <section className="bg-surface-alt py-20 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[21.25rem_1fr] lg:items-start lg:gap-20">
        <SectionHeading
          title={t("title")}
          subtitle={t("subtitle")}
          size="compact"
          align="start"
          headingClassName="text-body"
          className="mb-0 sm:mb-0"
        />

        <RevealGroup className="flex flex-col gap-3">
          {PRICING_FAQ.map((key, index) => (
            <Reveal key={key} inGroup>
              <FaqItem
                question={t(`items.${key}.question`)}
                answer={t(`items.${key}.answer`, { limit: planByKey("basic").appLimit ?? 0 })}
                defaultOpen={index === 0}
              />
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
