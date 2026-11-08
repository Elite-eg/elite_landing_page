import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { ALBIRUNI_APPS, PRICING_APPS_ID, planByKey } from "../data/pricingData";
import { AddonsStoreNote } from "./AddonsStoreNote";
import { AppCard } from "./AppCard";
import { CartSummary } from "./CartSummary";
import { StepLabel } from "./StepLabel";

/** Step 3 (Figma "Add-on apps store"): title + cart summary, the app cards, the add-ons store note and the price note. */
export function AppsSection() {
  const t = useTranslations("albiruniPricing.apps");

  return (
    <section id={PRICING_APPS_ID} className="bg-surface py-20 sm:py-24">
      <Container className="flex flex-col gap-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <StepLabel step={3}>{t("step", { limit: planByKey("basic").appLimit ?? 0 })}</StepLabel>
            </Reveal>
            <SectionHeading
              title={t("title")}
              size="compact"
              align="start"
              headingClassName="text-body"
              className="mb-0 mt-2.5"
            />
          </div>
          <Reveal preset="fadeIn">
            <CartSummary />
          </Reveal>
        </div>

        <RevealGroup className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {ALBIRUNI_APPS.map((app) => (
            <Reveal key={app} inGroup className="h-full">
              <AppCard app={app} />
            </Reveal>
          ))}
        </RevealGroup>

        <Reveal>
          <AddonsStoreNote />
        </Reveal>

        <p className="text-xs text-ink-400">{t("footnote")}</p>
      </Container>
    </section>
  );
}
