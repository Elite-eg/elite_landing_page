"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Badge } from "@/app/components/shared/Badge";
import { Container } from "@/app/components/shared/Container";
import { fadeInUp, heroStagger, heroTextReveal } from "@/lib/animations";
import { BAREEQ_HERO_IMAGE, BAREEQ_TAGS } from "../data/bareeqData";
import { BareeqHeroVisual } from "./BareeqHeroVisual";
import { HeroBreadcrumb } from "./HeroBreadcrumb";
import { HeroFacts } from "./HeroFacts";
import { LiveDot } from "./LiveDot";

/**
 * The page's one bold moment, in the client's teal identity: the client's team photo under a teal overlay.
 * Copy staggers in (breadcrumb → tags → name → tagline → facts), then the app screens rise.
 */
export function BareeqHero() {
  const t = useTranslations("caseStudies.bareeqX.hero");

  return (
    <section className="relative isolate overflow-hidden bg-bareeq-950 py-16 sm:py-20">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image src={BAREEQ_HERO_IMAGE} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-bareeq/85 to-bareeq-950/95" />
        {/* Fades the photo's own slogan and logo, which sit at its edges and get cropped. */}
        <div className="absolute inset-0 bg-gradient-to-r from-bareeq-950 via-transparent to-bareeq-950" />
        <div className="absolute inset-0 bg-dot-grid-light opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </div>

      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <motion.div className="lg:col-span-7" variants={heroStagger} initial="hidden" animate="visible">
          <motion.div variants={fadeInUp}>
            <HeroBreadcrumb current={t("name")} />
          </motion.div>

          <motion.ul variants={fadeInUp} aria-label={t("tagsLabel")} className="mt-5 flex flex-wrap gap-2">
            {BAREEQ_TAGS.map((key) => (
              <li key={key}>
                <Badge
                  variant="glass"
                  icon={key === "live" ? <LiveDot /> : undefined}
                  className="rounded-full border-transparent bg-white/[0.12] font-medium"
                >
                  {t(`tags.${key}`)}
                </Badge>
              </li>
            ))}
          </motion.ul>

          <motion.h1 variants={heroTextReveal} className="mt-5 font-logo text-display font-semibold text-white">
            {t("name")}
          </motion.h1>

          <motion.p variants={fadeInUp} className="mt-4 max-w-xl text-balance font-heading text-h3 font-medium text-bareeq-50">
            {t("tagline")}
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-8">
            <HeroFacts />
          </motion.div>
        </motion.div>

        <div className="lg:col-span-5">
          <BareeqHeroVisual />
        </div>
      </Container>
    </section>
  );
}
