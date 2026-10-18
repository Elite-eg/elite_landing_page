"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { fadeInUp } from "@/lib/animations";

const OUTCOME_KEYS = ["one", "two", "three"] as const;

/** "What you get" heading + check list. Children of the hero stagger, so they reveal one by one. */
export function SessionOutcomes() {
  const t = useTranslations("booking");

  return (
    <>
      <motion.h2 variants={fadeInUp} className="text-[1.0625rem] font-semibold text-white">
        {t("whatYouGetTitle")}
      </motion.h2>

      {OUTCOME_KEYS.map((key) => (
        <motion.div key={key} variants={fadeInUp} className="flex items-start gap-3">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-secondary text-white" aria-hidden="true">
            <FiCheck className="size-3.5" strokeWidth={5} />
          </span>
          <div className="flex flex-col gap-0.5">
            <p className="font-heading text-[0.96875rem] font-semibold text-white">{t(`outcomes.${key}.title`)}</p>
            <p className="text-[0.84375rem] text-navy-300">{t(`outcomes.${key}.subtitle`)}</p>
          </div>
        </motion.div>
      ))}
    </>
  );
}
