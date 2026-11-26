"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FiArrowRight } from "react-icons/fi";
import { Button } from "@/app/components/shared/Button";
import { fadeInUp, heroStagger, heroTextReveal } from "@/lib/animations";
import { ROUTES } from "@/lib/constants";

/** Page title and what the page holds, with a way back to the store on the end side. */
export function MyPurchasesHeader() {
  const t = useTranslations("addons.myPurchases");

  return (
    <motion.header
      variants={heroStagger}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
    >
      <div className="flex max-w-2xl flex-col gap-3">
        <motion.h1 variants={heroTextReveal} className="text-balance text-h2 text-body">
          {t("title")}
        </motion.h1>
        <motion.p variants={fadeInUp} className="text-body-lg text-content">
          {t("text")}
        </motion.p>
      </div>
      <motion.div variants={fadeInUp} className="shrink-0">
        <Button href={ROUTES.albiruni.addons} variant="outline" icon={<FiArrowRight />} flipIconInRtl>
          {t("browse")}
        </Button>
      </motion.div>
    </motion.header>
  );
}
