import Image from "next/image";
import { useTranslations } from "next-intl";
import { FiMessageSquare, FiUserPlus } from "react-icons/fi";
import { Container } from "@/app/components/shared/Container";
import { Button } from "@/app/components/shared/Button";
import { Reveal } from "@/app/components/shared/Reveal";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { COMMUNITY_URLS, CONTACT_HREF, MEDIA } from "@/lib/constants";

export function CtaSection() {
  const t = useTranslations("home.cta");

  return (
    <section className="bg-surface py-20 sm:py-24">
      <Container>
        <Reveal preset="scaleIn">
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-primary-deep px-6 py-14 sm:px-12 lg:px-16 lg:py-16">
            <Image
              src={MEDIA.heroPoster}
              alt=""
              fill
              sizes="(min-width: 1280px) 80rem, 100vw"
              className="-z-10 object-cover opacity-30"
            />
            <div
              className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-deep via-primary-deep/90 to-primary/70"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-32 -end-24 -z-10 size-96 rounded-full bg-secondary/30 blur-3xl animate-pulse"
              aria-hidden="true"
            />
            <div
              className="absolute -top-32 -start-24 -z-10 size-80 rounded-full bg-accent/25 blur-3xl animate-pulse"
              aria-hidden="true"
            />

            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
              <Reveal preset="slideInLeft">
                <SectionHeading
                  title={t("title")}
                  subtitle={t("subtitle")}
                  tone="dark"
                  align="start"
                  className="mb-0 sm:mb-0"
                />
              </Reveal>
              <Reveal
                preset="slideInRight"
                className="flex shrink-0 flex-col gap-3 sm:flex-row"
              >
                <Button
                  href={COMMUNITY_URLS.register}
                  external
                  variant="secondary"
                  size="lg"
                  icon={<FiUserPlus />}
                  iconPosition="start"
                >
                  {t("primary")}
                </Button>
                <Button
                  href={CONTACT_HREF}
                  variant="glass"
                  size="lg"
                  icon={<FiMessageSquare />}
                  iconPosition="start"
                >
                  {t("secondary")}
                </Button>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
