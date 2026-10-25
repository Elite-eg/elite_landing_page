"use client";

import { motion } from "framer-motion";
import { Container } from "@/app/components/shared/Container";
import { Eyebrow } from "@/app/components/shared/Eyebrow";
import { fadeInUp, heroStagger, heroTextReveal } from "@/lib/animations";

export interface PolicyHeroProps {
  eyebrow: string;
  title: string;
  /** "Last updated: …" line, plus the policy's scope when it has one. */
  meta: string;
}

/**
 * Light band with start-aligned copy (Figma v4 policy pages): the page's one orchestrated motion moment.
 * Eyebrow → title → updated line rise one after another.
 */
export function PolicyHero({ eyebrow, title, meta }: PolicyHeroProps) {
  return (
    <section className="bg-surface-alt pb-12 pt-14 sm:pb-14 sm:pt-20">
      <Container>
        <motion.div variants={heroStagger} initial="hidden" animate="visible" className="flex flex-col items-start gap-3.5">
          <motion.div variants={fadeInUp}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </motion.div>

          <motion.h1
            variants={heroTextReveal}
            className="max-w-4xl text-balance text-4xl font-bold leading-[1.3] text-body sm:text-[2.75rem] sm:leading-[1.3] lg:text-5xl lg:leading-[1.3]"
          >
            {title}
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-content">
            {meta}
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
