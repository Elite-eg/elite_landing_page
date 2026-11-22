"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Eyebrow } from "@/app/components/shared/Eyebrow";
import { fadeInUp, heroStagger, heroTextReveal } from "@/lib/animations";
import { HERO_PATHS } from "../data/homeData";
import { lineBreak } from "../utils/richText";
import { HeroPathCard } from "./HeroPathCard";
import { HeroProof } from "./HeroProof";

/** The page's one orchestrated entrance: eyebrow → title → paragraph → paths → proof rise one after another. */
export function HeroCopy() {
  const t = useTranslations("home.hero");

  return (
    <motion.div
      variants={heroStagger}
      initial="hidden"
      animate="visible"
      className="relative z-10 flex max-w-[40rem] flex-col items-start gap-7 xl:w-[35rem] min-[1440px]:w-[40rem]"
    >
      <motion.div variants={fadeInUp}>
        <Eyebrow tone="dark">{t("eyebrow")}</Eyebrow>
      </motion.div>

      {/*
        From xl the copy shares the row with the product, so the title keeps the Figma's 48px (122%) there; from
        1440px it also stays clear of the dashboard's edge, which tucks 24px under the copy.
      */}
      <motion.h1
        variants={heroTextReveal}
        className="text-balance text-display text-white xl:text-5xl xl:leading-[1.22] min-[1440px]:max-w-[36rem]"
      >
        {t.rich("title", { accent: (chunks) => <span className="text-secondary">{chunks}</span>, br: lineBreak })}
      </motion.h1>

      <motion.p variants={fadeInUp} className="max-w-[35rem] text-body-lg text-content-dark">
        {t("subtitle")}
      </motion.p>

      <motion.div variants={fadeInUp} className="flex w-full flex-col gap-4">
        <h2 className="font-heading text-caption font-semibold text-navy-300">{t("pathsTitle")}</h2>
        <div className="grid gap-3.5 sm:grid-cols-2">
          {HERO_PATHS.map((path) => (
            <HeroPathCard key={path.key} path={path} />
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <HeroProof />
      </motion.div>
    </motion.div>
  );
}
