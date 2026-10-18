"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  fadeIn,
  fadeInUp,
  imageReveal,
  scaleIn,
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

export type RevealPreset = keyof typeof PRESETS;

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
  const variants = withDelay(PRESETS[preset] ?? fadeInUp, delay);

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

