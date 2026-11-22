"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { fadeInUp, scaleIn, slideInFromEnd, withDelay } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { ApprovalFloat } from "./ApprovalFloat";
import { CollectionFloat } from "./CollectionFloat";
import { FloatingCard } from "./FloatingCard";
import { StageConnectors } from "./StageConnectors";
import { SuperAppMockup } from "./SuperAppMockup";
import { SyncFloat } from "./SyncFloat";
import { WebDashboardMockup } from "./WebDashboardMockup";

export interface AlbiruniStageProps {
  /** Seconds before the stage rises, so it follows the hero copy. */
  delay?: number;
  /** Scale and placement of the stage (it is drawn at the Figma's 936×850px). */
  className?: string;
}

/**
 * The Albiruni product (Figma "Hero/Product"): web dashboard, super app phone and three live cards joined by
 * orange lines, composed on the Figma's 936×850px stage. The Albiruni platform hero shows it at full size, the
 * home hero at about 0.77. Callers scale it as one picture per breakpoint (CSS only, so the first render is
 * already right), which is why sizes inside the mockups are px. Positions are measured from the end side, so the
 * composition mirrors in English.
 *
 * Motion: the stage rises, then the screens, their charts, the connector lines and the live cards come in one
 * after another (each child carries its own delay; the stage passes "visible" down to them).
 */
export function AlbiruniStage({ delay = 0.45, className }: AlbiruniStageProps) {
  const isRtl = useLocale() === "ar";

  return (
    <div className={cn("h-[850px] w-[936px] shrink-0", className)} aria-hidden="true">
      <motion.div className="relative size-full" variants={withDelay(fadeInUp, delay)} initial="hidden" animate="visible">
        <motion.div variants={withDelay(scaleIn, 0.5)} className="absolute end-[153px] top-[91px] w-[783px]">
          <WebDashboardMockup />
        </motion.div>

        <motion.div variants={withDelay(slideInFromEnd(isRtl), 0.6)} className="absolute end-0 top-[239px]">
          <SuperAppMockup />
        </motion.div>

        <StageConnectors />

        <FloatingCard delay={1.7} className="end-[429px] top-0">
          <SyncFloat />
        </FloatingCard>
        <FloatingCard delay={1.9} drift="down" className="end-[611px] top-[606px]">
          <CollectionFloat />
        </FloatingCard>
        <FloatingCard delay={2.1} className="end-[325px] top-[720px]">
          <ApprovalFloat />
        </FloatingCard>
      </motion.div>
    </div>
  );
}
