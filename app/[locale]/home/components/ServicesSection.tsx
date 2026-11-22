import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { cn } from "@/lib/utils";
import { HOME_SERVICES, SERVICES_FIRST_ROW } from "../data/homeData";
import { SECTION_TITLE_LEADING } from "../utils/titleClasses";
import { ServiceTile } from "./ServiceTile";

/**
 * "Our services" (Figma "Services"): title with its subtitle under it on the start side, then seven tiles, four on
 * the first row and three on the second from lg.
 */
export function ServicesSection() {
  const t = useTranslations("home.services");

  return (
    <section className="bg-surface-alt py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
          align="start"
          headingClassName={cn("text-body", SECTION_TITLE_LEADING)}
          className="mb-10 sm:mb-11"
        />

        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
          {HOME_SERVICES.map((service, index) => (
            <Reveal
              key={service.key}
              inGroup
              className={cn("h-full", index < SERVICES_FIRST_ROW ? "lg:col-span-3" : "lg:col-span-4")}
            >
              <ServiceTile service={service} />
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
