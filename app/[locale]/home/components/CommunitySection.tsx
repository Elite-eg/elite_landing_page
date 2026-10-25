import Image from "next/image";
import { useTranslations } from "next-intl";
import type { IconType } from "react-icons";
import {
  FiAward,
  FiCheck,
  FiFolder,
  FiStar,
  FiUserPlus,
  FiUsers,
} from "react-icons/fi";
import { Container } from "@/app/components/shared/Container";
import { Button } from "@/app/components/shared/Button";
import { CARD_HOVER_CLASSES } from "@/app/components/shared/cardStyles";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { COMMUNITY_URLS, MEDIA } from "@/lib/constants";
import { cn } from "@/lib/utils";

const POINT_KEYS = ["one", "two", "three"] as const;

const FEATURES: {
  key: "projects" | "experts" | "mentoring";
  icon: IconType;
  tileClass: string;
}[] = [
  { key: "projects", icon: FiFolder, tileClass: "bg-primary text-white" },
  {
    key: "experts",
    icon: FiUsers,
    tileClass: "bg-gradient-to-br from-secondary to-secondary-dark text-white",
  },
  { key: "mentoring", icon: FiAward, tileClass: "bg-accent text-white" },
];

export function CommunitySection() {
  const t = useTranslations("home.community");

  return (
    <section className="overflow-hidden bg-surface py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Photo composition */}
          <Reveal
            preset="slideInLeft"
            className="relative mx-auto w-full max-w-lg lg:order-last"
          >
            <div
              className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-secondary/20 via-surface-info to-accent/10 blur-2xl"
              aria-hidden="true"
            />

            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lift">
              <Reveal preset="imageReveal" className="absolute inset-0">
                <Image
                  src={MEDIA.mentoring}
                  alt={t("imageAlt")}
                  fill
                  sizes="(min-width: 1024px) 32rem, 90vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </Reveal>
            </div>

            <Reveal
              preset="slideInLeft"
              delay={0.3}
              className="absolute -bottom-8 -start-4 w-44 overflow-hidden rounded-2xl border-4 border-surface shadow-lift sm:-start-10 sm:w-56 transition-transform duration-300 hover:scale-105"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={MEDIA.community}
                  alt=""
                  fill
                  sizes="14rem"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal
              preset="scaleIn"
              delay={0.5}
              className="absolute -end-3 top-8 sm:-end-8"
            >
              <p className="inline-flex items-center gap-2 rounded-2xl border border-white/60 bg-surface/90 px-4 py-3 text-sm font-bold text-primary shadow-lift backdrop-blur-md transition-transform duration-300 hover:scale-105">
                <FiStar
                  className="size-4 text-secondary"
                  aria-hidden="true"
                />
                {t("imageBadge")}
              </p>
            </Reveal>
          </Reveal>

          {/* Copy */}
          <Reveal preset="slideInRight">
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              subtitle={t("description")}
              align="start"
              className="mb-8 sm:mb-8"
            />

            <RevealGroup className="space-y-3">
              {POINT_KEYS.map((key) => (
                <Reveal key={key} inGroup preset="slideInRight">
                  <p className="flex items-center gap-3 text-lg font-semibold text-body group">
                    <span
                      className="grid size-7 shrink-0 place-items-center rounded-full bg-secondary/15 text-secondary-dark transition-transform duration-300 group-hover:scale-110 group-hover:bg-secondary group-hover:text-white"
                      aria-hidden="true"
                    >
                      <FiCheck className="size-4 stroke-[3]" />
                    </span>
                    {t(`points.${key}`)}
                  </p>
                </Reveal>
              ))}
            </RevealGroup>

            <Reveal delay={0.2} preset="slideInRight" className="mt-9">
              <Button
                href={COMMUNITY_URLS.register}
                external
                variant="secondary"
                size="lg"
                icon={<FiUserPlus />}
                iconPosition="start"
              >
                {t("cta")}
              </Button>
            </Reveal>
          </Reveal>
        </div>

        {/* Feature tiles (navy / orange / sky, as on the community site) */}
        <RevealGroup className="mt-24 grid gap-5 md:grid-cols-3">
          {FEATURES.map(({ key, icon: Icon, tileClass }, idx) => (
            <Reveal
              key={key}
              inGroup
              preset={
                idx === 0
                  ? "slideInLeft"
                  : idx === 1
                    ? "scaleIn"
                    : "slideInRight"
              }
            >
              <article className={cn("group h-full rounded-2xl border border-edge bg-surface-alt p-7 hover:border-secondary/30 hover:bg-surface", CARD_HOVER_CLASSES)}>
                <span
                  className={cn(
                    "grid size-14 place-items-center rounded-2xl shadow-card transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:shadow-lg",
                    tileClass,
                  )}
                  aria-hidden="true"
                >
                  <Icon className="size-7" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-primary transition-colors duration-200 group-hover:text-secondary-dark">
                  {t(`features.${key}.title`)}
                </h3>
                <p className="mt-2 leading-loose text-content">
                  {t(`features.${key}.description`)}
                </p>
              </article>
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
