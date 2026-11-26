"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FiCheck } from "react-icons/fi";
import { fadeInUp, heroStagger, heroTextReveal, popIn } from "@/lib/animations";

/** Green check (pops in), the page title and what happens next (Figma "ok" + title + text). */
export function PurchaseCompleteHeader() {
  const t = useTranslations("addons.purchaseComplete");

  return (
    <motion.div variants={heroStagger} initial="hidden" animate="visible" className="flex flex-col items-center gap-6 text-center">
      <motion.span variants={popIn} aria-hidden="true" className="grid size-20 place-items-center rounded-full bg-success text-surface">
        <FiCheck className="size-9" strokeWidth={3} />
      </motion.span>
      <motion.h1
        variants={heroTextReveal}
        className="text-balance text-4xl font-bold leading-[1.3] text-body sm:text-[2.75rem] sm:leading-[1.3] lg:text-5xl lg:leading-[1.3]"
      >
        {t("title")}
      </motion.h1>
      <motion.p variants={fadeInUp} className="max-w-prose text-body-lg text-content">
        {t("text")}
      </motion.p>
    </motion.div>
  );
}
