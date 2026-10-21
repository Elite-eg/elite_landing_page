"use client";

import type { ReactNode } from "react";
import { useLocale } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  fadeIn,
  fadeInUp,
  imageReveal,
  scaleIn,
  slideInFromEnd,
  slideInFromStart,
  slideInLeft,
  slideInRight,
  viewportOnce,
  withDelay,
} from "@/lib/animations";

const PRESETS = {
  fadeInUp,
  fadeIn,
  scaleIn,
  imageReveal,
  slideInLeft,
  slideInRight,
  slideLeft: slideInLeft,
  slideRight: slideInRight,
} satisfies Record<string, Variants>;

/** Logical slides (from the start / end side): built per direction, so they mirror in RTL. */
const DIRECTIONAL_PRESETS = {
  slideInFromStart,
  slideInFromEnd,
} satisfies Record<string, (isRtl: boolean) => Variants>;

type DirectionalPreset = keyof typeof DIRECTIONAL_PRESETS;

export type RevealPreset = keyof typeof PRESETS | DirectionalPreset;

const isDirectional = (preset: RevealPreset): preset is DirectionalPreset => preset in DIRECTIONAL_PRESETS;

export interface RevealProps {
  children: ReactNode;
  className?: string;
  preset?: RevealPreset;
  delay?: number;
  /** Set when rendered inside <RevealGroup>, so the group controls timing (stagger). */
  inGroup?: boolean;
}

/**
 * Scroll-triggered reveal (runs once). Lets server components use shared motion presets
 * without becoming client components themselves.
 */
export function Reveal({ children, className, preset = "fadeInUp", delay = 0, inGroup = false }: RevealProps) {
  const isRtl = useLocale() === "ar";
  const base = isDirectional(preset) ? DIRECTIONAL_PRESETS[preset](isRtl) : PRESETS[preset];
  const variants = withDelay(base ?? fadeInUp, delay);

  if (inGroup) {
    return (
      <motion.div className={cn("transform-gpu", className)} variants={variants}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn("transform-gpu", className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  );
}
