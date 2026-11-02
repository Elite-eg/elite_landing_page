"use client";

import { motion } from "framer-motion";
import { drawPath, fadeIn, withDelay } from "@/lib/animations";

type Point = readonly [x: number, y: number];

/** Dashboard → sync card, dashboard → collection card, phone → approval card (stage px, Arabic layout). */
const CONNECTORS: readonly (readonly Point[])[] = [
  [[390, 91], [390, 28.6], [429, 28.6]],
  [[728, 525.2], [728, 605.8]],
  [[306.8, 590.2], [468, 590.2], [468, 720.2]],
];

const toPath = (points: readonly Point[]) => points.map(([x, y], index) => `${index ? "L" : "M"}${x} ${y}`).join("");

/** A dot at both ends of every line. */
const NODES = CONNECTORS.flatMap((points) => [points[0], points[points.length - 1]]);

/**
 * Orange lines tying the screens to their live cards. Drawn in the Figma's Arabic coordinates and mirrored in
 * English, like the end-side positions of the cards. Lines draw one after another, then their dots fade in.
 */
export function HeroConnectors() {
  return (
    <svg viewBox="0 0 936 850" fill="none" className="pointer-events-none absolute inset-0 size-full ltr:-scale-x-100">
      {CONNECTORS.map((points, index) => (
        <motion.path
          key={index}
          d={toPath(points)}
          variants={withDelay(drawPath, 1.3 + index * 0.15)}
          className="stroke-secondary/75"
          strokeWidth={2}
          strokeLinecap="round"
        />
      ))}
      {NODES.map(([x, y]) => (
        <motion.circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={5.2}
          variants={withDelay(fadeIn, 1.4)}
          className="fill-secondary stroke-surface"
          strokeWidth={2.6}
        />
      ))}
    </svg>
  );
}
