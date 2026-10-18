"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/app/components/shared/Container";
import { MEDIA } from "@/lib/constants";
import { fadeInUp, heroStagger, heroTextReveal } from "@/lib/animations";
import { OPEN_JOB_POSITIONS } from "../data/jobsData";

/** Navy photo hero with centred copy: the page's one orchestrated motion moment. */
export function JobsHero() {
  const t = useTranslations("jobs");

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#0d2240] via-[#122e54] to-[#0a1b33] py-16 text-surface sm:py-24 lg:py-32">
      <Image
        src={MEDIA.enterprise}
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none -z-10 select-none object-cover object-center opacity-30 mix-blend-overlay"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0d2240]/80 via-[#122e54]/65 to-[#0a1b33]/85" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0d2240]/60 via-transparent to-[#0a1b33]/75" aria-hidden="true" />
      <div className="pointer-events-none absolute start-1/3 top-1/4 -z-10 size-[500px] rounded-full bg-accent/20 blur-[150px]" aria-hidden="true" />

      <Container className="max-w-4xl text-center">
        <motion.div variants={heroStagger} initial="hidden" animate="visible">
          <motion.div variants={fadeInUp}>
            <p className="inline-flex items-center gap-2 rounded-full border border-edge/30 bg-surface-dark/90 px-4 py-1.5 text-xs font-semibold text-secondary shadow-sm backdrop-blur-md">
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full rounded-full bg-secondary opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-secondary" />
              </span>
              {t("badge", { count: OPEN_JOB_POSITIONS.length })}
            </p>
          </motion.div>

          <motion.h1 variants={heroTextReveal} className="mx-auto mt-6 max-w-3xl text-balance text-display text-surface">
            {t("heroTitle")}
          </motion.h1>

          <motion.p variants={fadeInUp} className="mx-auto mt-6 max-w-2xl text-body-lg text-surface/80">
            {t("heroSubtitle")}
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
