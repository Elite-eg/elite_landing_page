"use client";

import { motion } from "framer-motion";
import { viewportOnce } from "@/lib/animations";
import type { SectorKey } from "@/lib/sectors";
import { SECTOR_DAYS } from "../data/solutionsData";
import { SectorDayStep } from "./SectorDayStep";

export interface SectorDayFlowProps {
  sector: SectorKey;
}

/**
 * The sector's workday as connected steps (Figma "Flow (connected)"): one row from lg, a column below that.
 * Once in view, the steps rise one after another while the orange line draws from each to the next.
 */
export function SectorDayFlow({ sector }: SectorDayFlowProps) {
  const steps = SECTOR_DAYS[sector];

  return (
    <motion.ol
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="grid gap-8 lg:auto-cols-fr lg:grid-flow-col lg:gap-0"
    >
      {steps.map((step, index) => (
        <SectorDayStep key={step.key} sector={sector} step={step} index={index} isLast={index === steps.length - 1} />
      ))}
    </motion.ol>
  );
}
