"use client";

import { motion } from "framer-motion";
import { fadeInUp, floatLoop, floatLoopOffset, withDelay } from "@/lib/animations";
import { PhoneMockup } from "./PhoneMockup";

/**
 * Two app screens that rise in after the hero copy, then drift apart gently, on a stage of soft rings
 * (the same ring language as the CTA banner). The dashed ring turns very slowly.
 * The smaller, lower screen sits on the start side (next to the copy), so the pair mirrors in RTL.
 */
export function BareeqHeroVisual() {
  return (
    <div
      className="relative isolate mx-auto flex w-full max-w-sm items-start justify-center gap-[4%] py-[6%] lg:max-w-[32.5rem]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 -z-10 grid place-items-center">
        <span className="col-start-1 row-start-1 aspect-square w-full rounded-full border border-white/10" />
        <span className="col-start-1 row-start-1 aspect-square w-[78%] rounded-full border border-dashed border-white/20 motion-safe:animate-[spin_60s_linear_infinite]" />
        <span className="col-start-1 row-start-1 aspect-square w-[56%] rounded-full bg-bareeq-200/20 blur-3xl" />
      </div>

      <motion.div
        className="mt-[11.5%] w-[35%]"
        variants={withDelay(fadeInUp, 0.6)}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={floatLoopOffset} animate="animate" className="will-change-transform">
          <PhoneMockup />
        </motion.div>
      </motion.div>

      <motion.div className="w-[38%]" variants={withDelay(fadeInUp, 0.45)} initial="hidden" animate="visible">
        <motion.div variants={floatLoop} animate="animate" className="will-change-transform">
          <PhoneMockup />
        </motion.div>
      </motion.div>
    </div>
  );
}
