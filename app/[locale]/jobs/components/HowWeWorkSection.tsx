"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FiBriefcase, FiHome, FiDollarSign, FiCode, FiMessageSquare } from "react-icons/fi";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function HowWeWorkSection() {
  const t = useTranslations("jobs.howWeWork");

  const cards = [
    {
      icon: FiBriefcase,
      title: t("card1.title"),
      subtitle: t("card1.subtitle"),
    },
    {
      icon: FiHome,
      title: t("card2.title"),
      subtitle: t("card2.subtitle"),
    },
    {
      icon: FiDollarSign,
      title: t("card3.title"),
      subtitle: t("card3.subtitle"),
    },
    {
      icon: FiCode,
      title: t("card4.title"),
      subtitle: t("card4.subtitle"),
      hasMaherBadge: true,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-surface-alt relative overflow-hidden">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-4xl font-extrabold text-surface-dark tracking-tight">
            {t("title")}
          </h2>
        </motion.div>

        {/* 4 Feature Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="relative p-6 sm:p-7 rounded-2xl bg-surface border border-edge/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Box */}
                  <div className="size-12 rounded-xl bg-surface-info flex items-center justify-center text-primary mb-5 shadow-inner">
                    <Icon className="size-6 text-primary" />
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-base sm:text-lg font-bold text-surface-dark mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-content leading-relaxed font-normal">
                    {card.subtitle}
                  </p>
                </div>

                {/* Maher AI Callout Badge on Card 4 */}
                {card.hasMaherBadge && (
                  <div className="mt-6 pt-4 border-t border-edge/40">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary/15 to-primary/10 border border-secondary/30 px-3 py-1.5 rounded-full text-xs font-semibold text-secondary-dark">
                      <FiMessageSquare className="size-3.5 text-secondary shrink-0" />
                      <span>{t("maherBadge")}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
