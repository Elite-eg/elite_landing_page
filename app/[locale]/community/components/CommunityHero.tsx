"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/app/components/shared/Container";
import { Eyebrow } from "@/app/components/shared/Eyebrow";
import { fadeInUp, heroStagger, heroTextReveal } from "@/lib/animations";

/** Grey band with start-aligned copy (Figma v4 "Community" hero), the page's one orchestrated entrance. */
export function CommunityHero() {
  const t = useTranslations("community.hero");

  return (
    <section className="bg-surface-alt pb-20 pt-20 sm:pb-24 sm:pt-[6.875rem]">
      <Container>
        <motion.div variants={heroStagger} initial="hidden" animate="visible" className="flex flex-col items-start gap-3.5">
          <motion.div variants={fadeInUp}>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
          </motion.div>

          <motion.h1 variants={heroTextReveal} className="text-balance text-display text-body">
            {t.rich("title", { br: () => <br /> })}
          </motion.h1>

          <motion.p variants={fadeInUp} className="max-w-prose text-body-lg text-content">
            {t("subtitle")}
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
