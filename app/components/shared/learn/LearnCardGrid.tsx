"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedHeight } from "@/app/components/shared/AnimatedHeight";
import { MOTION, listSwap, scaleIn, viewportOnce, withDelay } from "@/lib/animations";
import { cn } from "@/lib/utils";

/** Cards after this many share the last delay, so a full grid never takes long to appear. */
const STAGGER_CAP = 6;

export interface LearnCardGridProps<T> {
  items: readonly T[];
  /** Changes with the filter: the current grid fades out, then the new cards come in. */
  filterKey: string;
  getKey: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  /** Column classes, e.g. "sm:grid-cols-2 lg:grid-cols-3". */
  className?: string;
}

/**
 * Filterable card grid of a learn page (videos, articles), like the home apps grid: a filter change fades the grid
 * out and brings the matching cards in, and the height follows so the sections below glide. The bottom padding
 * (cancelled by the negative margin) keeps the last row's hover shadow inside AnimatedHeight's clip.
 */
export function LearnCardGrid<T>({ items, filterKey, getKey, renderItem, className }: LearnCardGridProps<T>) {
  return (
    <AnimatedHeight className="-mb-8">
      <AnimatePresence mode="wait">
        <motion.ul key={filterKey} variants={listSwap} exit="exit" className={cn("grid gap-5 pb-8", className)}>
          {items.map((item, index) => (
            <motion.li
              key={getKey(item)}
              variants={withDelay(scaleIn, Math.min(index, STAGGER_CAP) * MOTION.staggerCard)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {renderItem(item)}
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </AnimatedHeight>
  );
}
