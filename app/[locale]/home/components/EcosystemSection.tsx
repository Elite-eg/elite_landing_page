import { useTranslations } from "next-intl";
import { FiBriefcase, FiUsers } from "react-icons/fi";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import {
  COMMUNITY_URLS,
  COMPANY_INFO,
  MEDIA,
  type AppLocale,
} from "@/lib/constants";
import { EcosystemCard } from "./EcosystemCard";

const POINT_KEYS = ["one", "two", "three"] as const;

interface EcosystemSectionProps {
  locale: AppLocale;
}

export function EcosystemSection({ locale }: EcosystemSectionProps) {
  const t = useTranslations("home.ecosystem");

  return (
    <section
      id="ecosystem"
      className="relative scroll-mt-20 overflow-hidden bg-surface-alt py-20 sm:py-28"
    >
      <div
        className="bg-dot-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
        aria-hidden="true"
      />

      <Container className="relative">
        <Reveal preset="fadeInUp">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>

        <RevealGroup className="grid gap-8 lg:grid-cols-2">
          <Reveal inGroup preset="slideInLeft">
            <EcosystemCard
              tone="primary"
              icon={FiBriefcase}
              image={MEDIA.enterprise}
              imageAlt={t("enterprise.imageAlt")}
              tag={t("enterprise.tag")}
              title={t("enterprise.title")}
              description={t("enterprise.description")}
              points={POINT_KEYS.map((key) => t(`enterprise.points.${key}`))}
              ctaLabel={t("enterprise.cta")}
              href="/solutions"
            />
          </Reveal>
          <Reveal inGroup preset="slideInRight">
            <EcosystemCard
              tone="secondary"
              icon={FiUsers}
              image={MEDIA.community}
              imageAlt={t("community.imageAlt")}
              tag={t("community.tag")}
              title={t("community.title", {
                brand: COMPANY_INFO.brandName[locale],
              })}
              description={t("community.description")}
              points={POINT_KEYS.map((key) => t(`community.points.${key}`))}
              ctaLabel={t("community.cta")}
              href={COMMUNITY_URLS.home}
              external
            />
          </Reveal>
        </RevealGroup>
      </Container>
    </section>
  );
}
