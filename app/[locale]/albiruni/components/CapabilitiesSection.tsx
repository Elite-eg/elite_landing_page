import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { PLATFORM_CAPABILITIES } from "../data/albiruniData";
import { CapabilityCard } from "./CapabilityCard";

/** "Built for businesses in our region": six white tiles on the grey band (one row from lg). */
export function CapabilitiesSection() {
  const t = useTranslations("albiruni.capabilities");

  return (
    <section className="bg-surface-alt py-20 sm:py-24">
      <Container>
        <SectionHeading title={t("title")} size="compact" headingClassName="text-body" className="mb-9" />

        <RevealGroup className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {PLATFORM_CAPABILITIES.map(({ key, icon }) => (
            <Reveal key={key} inGroup>
              <CapabilityCard icon={icon} title={t(`items.${key}.title`)} text={t(`items.${key}.text`)} />
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
