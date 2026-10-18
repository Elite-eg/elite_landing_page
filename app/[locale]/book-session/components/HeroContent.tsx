"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Eyebrow } from "@/app/components/shared/Eyebrow";
import { fadeInUp, heroStagger, heroTextReveal } from "@/lib/animations";
import { AttendeesCard } from "./AttendeesCard";
import { SessionOutcomes } from "./SessionOutcomes";

export function HeroContent() {
  const t = useTranslations("booking");

  return (
    <motion.div
      className="flex min-w-0 flex-1 flex-col items-start gap-[1.375rem]"
      variants={heroStagger}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={fadeInUp}>
        <Eyebrow tone="dark">{t("badge")}</Eyebrow>
      </motion.div>

      <motion.h1 variants={heroTextReveal} className="text-balance text-4xl font-bold leading-[1.28] text-white sm:text-5xl sm:leading-[1.28]">
        {t.rich("title", { br: () => <br /> })}
      </motion.h1>

      <motion.p variants={fadeInUp} className="max-w-[32.5rem] text-body-lg leading-[1.75] text-content-dark">
        {t("subtitle")}
      </motion.p>

      <SessionOutcomes />

      <motion.div variants={fadeInUp}>
        <AttendeesCard />
      </motion.div>
    </motion.div>
  );
}
