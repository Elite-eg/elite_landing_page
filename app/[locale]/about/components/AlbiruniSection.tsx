import { useTranslations } from "next-intl";
import { FiArrowRight, FiPlayCircle } from "react-icons/fi";
import { Button } from "@/app/components/shared/Button";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { ROUTES } from "@/lib/constants";
import { ALBIRUNI_FEATURES } from "../data/aboutData";
import { AlbiruniFeatureCard } from "./AlbiruniFeatureCard";

export function AlbiruniSection() {
  const t = useTranslations("about.albiruni");

  return (
    <section className="border-t border-edge bg-surface py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} align="start" />

        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ALBIRUNI_FEATURES.map(({ key, icon }) => (
            <Reveal key={key} inGroup>
              <AlbiruniFeatureCard
                icon={icon}
                title={t(`features.${key}.title`)}
                text={t(`features.${key}.text`)}
              />
            </Reveal>
          ))}
        </RevealGroup>

        <Reveal className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href={ROUTES.albiruni.trial} variant="secondary" size="lg" icon={<FiPlayCircle />} iconPosition="start">
            {t("primaryCta")}
          </Button>
          <Button href={ROUTES.albiruni.platform} variant="outline" size="lg" icon={<FiArrowRight />} flipIconInRtl>
            {t("secondaryCta")}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
