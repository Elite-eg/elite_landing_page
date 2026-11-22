"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Container } from "@/app/components/shared/Container";
import { Eyebrow } from "@/app/components/shared/Eyebrow";
import { fadeInUp, heroStagger, heroTextReveal } from "@/lib/animations";

export interface LearnHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  /** The page's finder (topic filter or search), the hero's last line. */
  children?: ReactNode;
}

/**
 * Learning library hub hero: the guide landing's light band (grey fading into white over the dot grid) with
 * start-aligned copy, the page's one orchestrated entrance. Eyebrow → title → paragraph → finder.
 */
export function LearnHero({ eyebrow, title, subtitle, children }: LearnHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-surface-alt to-surface pb-10 pt-16 sm:pb-12 sm:pt-24">
      <div
        className="absolute inset-x-0 top-0 -z-10 h-96 bg-dot-grid [mask-image:linear-gradient(to_bottom,black,transparent)]"
        aria-hidden="true"
      />

      <Container>
        <motion.div variants={heroStagger} initial="hidden" animate="visible" className="flex flex-col items-start gap-5">
          <motion.div variants={fadeInUp}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </motion.div>

          <motion.h1 variants={heroTextReveal} className="max-w-4xl text-balance text-display text-primary">
            {title}
          </motion.h1>

          <motion.p variants={fadeInUp} className="max-w-prose text-body-lg text-content">
            {subtitle}
          </motion.p>

          {children && (
            <motion.div variants={fadeInUp} className="mt-2 w-full">
              {children}
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
