"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { Button } from "@/app/components/shared/Button";
import { Container } from "@/app/components/shared/Container";
import { Eyebrow } from "@/app/components/shared/Eyebrow";
import { fadeInUp, heroStagger, heroTextReveal } from "@/lib/animations";
import { COMPANY_INFO, ROUTES, type AppLocale } from "@/lib/constants";
import { PLATFORM_TOUR_HREF } from "../data/albiruniData";

/** The page's one orchestrated motion moment: eyebrow → title → paragraph → buttons rise one after another. */
export function PlatformHeroCopy() {
  const t = useTranslations("albiruni.hero");
  const brand = COMPANY_INFO.brandName[useLocale() as AppLocale];

  return (
    <Container>
      <motion.div
        variants={heroStagger}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-6 text-center"
      >
        <motion.div variants={fadeInUp}>
          <Eyebrow tone="dark">{t("eyebrow", { brand })}</Eyebrow>
        </motion.div>

        <motion.h1 variants={heroTextReveal} className="text-balance text-display text-white">
          {t.rich("title", { br: () => <br /> })}
        </motion.h1>

        <motion.p variants={fadeInUp} className="max-w-[45rem] text-body-lg text-content-dark">
          {t("subtitle")}
        </motion.p>

        <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3.5">
          <Button href={ROUTES.bookSession} variant="secondary" size="lg" icon={<FiArrowRight />} flipIconInRtl>
            {t("book")}
          </Button>
          {/* Figma "Ghost on dark": the glass button without its fill. */}
          <Button href={PLATFORM_TOUR_HREF} variant="glass" size="lg" className="border-white/35 bg-transparent">
            {t("tour")}
          </Button>
        </motion.div>
      </motion.div>
    </Container>
  );
}
