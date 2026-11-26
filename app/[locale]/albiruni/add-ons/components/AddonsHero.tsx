"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/app/components/shared/Container";
import { Eyebrow } from "@/app/components/shared/Eyebrow";
import { fadeInUp, heroStagger, heroTextReveal } from "@/lib/animations";
import { AddonsSearchForm } from "./AddonsSearchForm";
import { PopularSearches } from "./PopularSearches";

/**
 * Navy hero (Figma "Hero"): the store's name as the page title, one line on what the store is, then the search box
 * and the popular searches. The page's one orchestrated entrance.
 */
export function AddonsHero() {
  const t = useTranslations("addons");

  return (
    <section className="bg-primary-dark pb-14 pt-14 sm:pb-16 sm:pt-[4.5rem]">
      <Container>
        <motion.div variants={heroStagger} initial="hidden" animate="visible" className="flex flex-col items-start gap-3.5">
          <motion.div variants={fadeInUp}>
            <Eyebrow as="h1" tone="dark">
              {t("storeName")}
            </Eyebrow>
          </motion.div>

          <motion.p variants={heroTextReveal} className="max-w-4xl text-balance text-body-lg text-white">
            {t("hero.subtitle")}
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-3.5 flex w-full flex-col gap-7">
            <AddonsSearchForm />
            <PopularSearches />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
