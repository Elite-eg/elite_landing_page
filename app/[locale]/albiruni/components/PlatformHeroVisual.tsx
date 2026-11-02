"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { fadeInUp, scaleIn, slideInFromEnd, withDelay } from "@/lib/animations";
import { ApprovalFloat } from "./ApprovalFloat";
import { CollectionFloat } from "./CollectionFloat";
import { FloatingCard } from "./FloatingCard";
import { HeroConnectors } from "./HeroConnectors";
import { SuperAppMockup } from "./SuperAppMockup";
import { SyncFloat } from "./SyncFloat";
import { WebDashboardMockup } from "./WebDashboardMockup";

/**
 * The product, composed on the Figma's 936×850px stage and scaled as one picture per breakpoint (CSS only, so the
 * first render is already right). That's why sizes inside the mockups are px. Positions are measured from the end
 * side, so the composition mirrors in English. The wrapper shows the top 791px, like the Figma, where the hero ends.
 *
 * Motion: the stage rises after the hero copy, then the screens, their charts, the connector lines and the live
 * cards come in one after another (each child carries its own delay; the stage passes "visible" down to them).
 */
export function PlatformHeroVisual() {
  const isRtl = useLocale() === "ar";

  return (
    <div className="flex h-[285px] justify-center sm:h-[490px] md:h-[601px] lg:h-[791px]" aria-hidden="true">
      <div className="h-[850px] w-[936px] shrink-0 origin-top scale-[0.36] sm:scale-[0.62] md:scale-[0.76] lg:scale-100 xl:me-20">
        <motion.div
          className="relative size-full"
          variants={withDelay(fadeInUp, 0.45)}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={withDelay(scaleIn, 0.5)} className="absolute end-[153px] top-[91px] w-[783px]">
            <WebDashboardMockup />
          </motion.div>

          <motion.div variants={withDelay(slideInFromEnd(isRtl), 0.6)} className="absolute end-0 top-[239px]">
            <SuperAppMockup />
          </motion.div>

          <HeroConnectors />

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
    </div>
  );
}
