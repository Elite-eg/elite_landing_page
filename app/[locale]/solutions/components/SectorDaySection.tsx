"use client";

import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedHeight } from "@/app/components/shared/AnimatedHeight";
import { Container } from "@/app/components/shared/Container";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { listSwap } from "@/lib/animations";
import { useSolutionsSector } from "../hooks/useSolutionsSector";
import { SectorDayFlow } from "./SectorDayFlow";

/** Titles keep the Figma's line break from sm up; on phones they wrap on their own (a space precedes every <br>). */
const lineBreak = () => <br className="max-sm:hidden" />;

/**
 * "A day in the life" (Figma "Day in the life"): the workday of the sector picked in the hero. Picking another
 * sector fades this one out and plays the new day in (title, then the steps along the line); the height follows,
 * so the sections below glide instead of jumping.
 */
export function SectorDaySection() {
  const t = useTranslations("solutions.day");
  const { sector } = useSolutionsSector();

  return (
    <section className="bg-surface py-20 sm:py-24 lg:py-[6.25rem]">
      <Container>
        <AnimatedHeight>
          <AnimatePresence mode="wait">
            <motion.div key={sector} variants={listSwap} exit="exit">
              <SectionHeading
                eyebrow={t(`${sector}.eyebrow`)}
                title={t.rich(`${sector}.title`, { br: lineBreak })}
                align="start"
                size="compact"
                headingClassName="text-body"
                className="mb-10 max-w-3xl sm:mb-11"
              />
              <SectorDayFlow sector={sector} />
            </motion.div>
          </AnimatePresence>
        </AnimatedHeight>
      </Container>
    </section>
  );
}
