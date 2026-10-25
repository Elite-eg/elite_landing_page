"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Eyebrow } from "@/app/components/shared/Eyebrow";
import { fadeInUp, heroStagger, heroTextReveal } from "@/lib/animations";
import { cn } from "@/lib/utils";

export interface ContactIntroProps {
  className?: string;
}

/** Eyebrow → title → paragraph, rising one after another. */
export function ContactIntro({ className }: ContactIntroProps) {
  const t = useTranslations("contact");

  return (
    <motion.div variants={heroStagger} className={cn("flex flex-col items-start gap-5", className)}>
      <motion.div variants={fadeInUp}>
        <Eyebrow>{t("eyebrow")}</Eyebrow>
      </motion.div>

      <motion.h1
        variants={heroTextReveal}
        className="text-balance text-3xl font-bold leading-[1.32] text-body sm:text-4xl sm:leading-[1.32] lg:text-[2.75rem] lg:leading-[1.32]"
      >
        {t.rich("title", { br: () => <br /> })}
      </motion.h1>

      <motion.p variants={fadeInUp} className="max-w-[29.375rem] text-body-lg text-content">
        {t("subtitle")}
      </motion.p>
    </motion.div>
  );
}
