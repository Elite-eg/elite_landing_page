"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { drawPath, withDelay } from "@/lib/animations";

export interface SparklineProps {
  /** Readings in a box 34 high (y grows downward), evenly spaced, oldest first. */
  points: readonly number[];
  /** Seconds before the line draws. */
  delay: number;
  /** Size and color (the line and its fade use the text color). */
  className?: string;
}

const STEP = 30;
const HEIGHT = 34;

/** Area chart in the current text color: a soft fade under a line that draws from the oldest reading. */
export function Sparkline({ points, delay, className }: SparklineProps) {
  // useId may contain characters that break a url(#…) reference.
  const gradientId = `sparkline-${useId().replace(/[^\w-]/g, "")}`;
  const width = (points.length - 1) * STEP;
  const line = points.map((y, index) => `${index ? "L" : "M"}${index * STEP} ${y}`).join("");

  return (
    <svg viewBox={`0 0 ${width} ${HEIGHT}`} preserveAspectRatio="none" fill="none" className={className}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity={0.22} />
          <stop offset="1" stopColor="currentColor" stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={`${line}V${HEIGHT}H0Z`} fill={`url(#${gradientId})`} />
      <motion.path
        d={line}
        variants={withDelay(drawPath, delay)}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
