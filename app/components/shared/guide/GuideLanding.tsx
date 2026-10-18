"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/app/components/shared/Container";
import { Eyebrow } from "@/app/components/shared/Eyebrow";
import { fadeInUp, floatLoop, heroStagger, heroTextReveal, slideInFromEnd, withDelay } from "@/lib/animations";
import { GuideContentsList } from "./GuideContentsList";
import { GuideCover } from "./GuideCover";
import { GuideRequestForm } from "./GuideRequestForm";
import { GUIDES, type GuideKey } from "./guidesData";

export interface GuideLandingProps {
  guide: GuideKey;
}

/** Free PDF guide landing: pitch + contents + request form, with the book cover on the end side. */
export function GuideLanding({ guide }: GuideLandingProps) {
  const t = useTranslations(`guides.${guide}`);
  const tCommon = useTranslations("guides.common");
  const isRtl = useLocale() === "ar";
  const contents = GUIDES[guide].contents.map((key) => t(`contents.${key}`));

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-surface-alt to-surface py-12 sm:py-16 lg:py-20">
      <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-dot-grid [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />

      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <motion.div className="lg:col-span-7" variants={heroStagger} initial="hidden" animate="visible">
          <motion.div variants={fadeInUp}>
            <Eyebrow>{tCommon("eyebrow")}</Eyebrow>
          </motion.div>
          <motion.h1 variants={heroTextReveal} className="mt-5 text-balance text-display text-primary">
            {t("title")}
          </motion.h1>
          <motion.p variants={fadeInUp} className="mt-5 max-w-prose text-body-lg text-content">
            {t("description")}
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-8">
            <GuideContentsList title={tCommon("contentsTitle")} items={contents} />
          </motion.div>
          <motion.div variants={fadeInUp} className="mt-8 max-w-xl">
            <GuideRequestForm guide={guide} />
          </motion.div>
        </motion.div>

        <motion.div
          className="lg:col-span-5"
          variants={withDelay(slideInFromEnd(isRtl), 0.45)}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={floatLoop} animate="animate" className="will-change-transform">
            <GuideCover title={t("cover.title")} edition={t("cover.edition")} />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
