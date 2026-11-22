"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { floatLoop, floatLoopOffset, popIn, withDelay } from "@/lib/animations";
import { cn } from "@/lib/utils";

export interface FloatingCardProps {
  children: ReactNode;
  /** Seconds after the stage starts, so the card pops in once the line leading to it is drawn. */
  delay: number;
  /** Which way the gentle loop goes first, so neighbouring cards drift apart. */
  drift?: "up" | "down";
  /** Position on the hero stage. */
  className?: string;
}

/** A live card on the hero product: pops in with a slight overshoot, then floats. */
export function FloatingCard({ children, delay, drift = "up", className }: FloatingCardProps) {
  return (
    <motion.div variants={withDelay(popIn, delay)} className={cn("absolute", className)}>
      <motion.div
        variants={drift === "up" ? floatLoop : floatLoopOffset}
        animate="animate"
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
