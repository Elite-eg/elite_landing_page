"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { staggerContainer, viewportOnce } from "@/lib/animations";

export interface RevealGroupProps {
  children: ReactNode;
  className?: string;
}

/** Staggers its <Reveal inGroup> children when the group scrolls into view (once). */
export function RevealGroup({ children, className }: RevealGroupProps) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  );
}
