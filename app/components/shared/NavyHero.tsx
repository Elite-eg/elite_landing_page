"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeInUp, heroStagger, heroTextReveal } from "@/lib/animations";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";

export interface NavyHeroProps {
  eyebrow: string;
  /** Plain text, or rich text with line breaks (`t.rich("title", { br: () => <br /> })`). */
  title: ReactNode;
  subtitle: string;
  /** The hero's buttons (one orange `secondary` action at most, the other `glass`). */
  children?: ReactNode;
}

/**
 * Navy hero with start-aligned copy (Figma v4 "Agents", "Partners"): the page's one orchestrated motion moment.
 * Eyebrow → title → paragraph → buttons rise one after another.
 */
export function NavyHero({ eyebrow, title, subtitle, children }: NavyHeroProps) {
  return (
    <section className="bg-primary-dark py-20 sm:py-[6.875rem]">
      <Container>
        <motion.div variants={heroStagger} initial="hidden" animate="visible" className="flex flex-col items-start">
          <motion.div variants={fadeInUp}>
            <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          </motion.div>

          <motion.h1 variants={heroTextReveal} className="mt-3.5 max-w-3xl text-balance text-display text-white">
            {title}
          </motion.h1>

          <motion.p variants={fadeInUp} className="mt-3.5 max-w-prose text-body-lg text-content-dark">
            {subtitle}
          </motion.p>

          {children && (
            <motion.div variants={fadeInUp} className="mt-7 flex flex-wrap gap-3">
              {children}
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
