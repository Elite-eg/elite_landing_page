import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { ServiceCard } from "@/app/components/shared/ServiceCard";
import { CONTACT_HREF } from "@/lib/constants";
import { HOME_SERVICES } from "../data/homeData";
import { ServiceFeatureCard } from "./ServiceFeatureCard";

export function ServicesSection() {
  const t = useTranslations("home.services");

  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container>
        <Reveal preset="fadeInUp">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
            align="start"
          />
        </Reveal>

        {/* Bento: feature tile spans two rows on desktop, service cards fill the rest */}
        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal
            inGroup
            preset="slideInLeft"
            className="sm:col-span-2 lg:col-span-1 lg:row-span-2"
          >
            <ServiceFeatureCard
              title={t("feature.title")}
              description={t("feature.description")}
              ctaLabel={t("feature.cta")}
              imageAlt={t("feature.imageAlt")}
            />
          </Reveal>

          {HOME_SERVICES.map(({ key, icon }, index) => (
            <Reveal
              key={key}
              inGroup
              preset={index % 2 === 0 ? "slideInLeft" : "slideInRight"}
            >
              <ServiceCard
                title={t(`items.${key}.title`)}
                description={t(`items.${key}.description`)}
                icon={icon}
                href={CONTACT_HREF}
                ctaLabel={t("cardCta")}
              />
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
