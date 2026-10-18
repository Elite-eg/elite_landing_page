"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FiCalendar, FiCheckSquare, FiMessageSquare } from "react-icons/fi";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";

export function WhatHappensNextSection() {
  const t = useTranslations("booking.whatHappensNext");

  const cards = [
    {
      num: t("step1.num"),
      title: t("step1.title"),
      desc: t("step1.desc"),
      icon: FiCalendar,
    },
    {
      num: t("step2.num"),
      title: t("step2.title"),
      desc: t("step2.desc"),
      icon: FiMessageSquare,
    },
    {
      num: t("step3.num"),
      title: t("step3.title"),
      desc: t("step3.desc"),
      icon: FiCheckSquare,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-surface-alt border-t border-edge/60 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 size-[32rem] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        <Reveal preset="fadeInUp">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-body text-center mb-12 sm:mb-16 tracking-tight">
            {t("title")}
          </h2>
        </Reveal>

        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.num} inGroup preset="fadeInUp" delay={idx * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-surface rounded-3xl p-7 sm:p-8 shadow-sm border border-edge/60 hover:shadow-2xl hover:border-secondary/40 transition-all duration-300 relative overflow-hidden group h-full flex flex-col justify-between"
                >
                  {/* Decorative background step watermark */}
                  <span className="absolute -end-3 -bottom-4 text-7xl font-black text-surface-muted/40 select-none pointer-events-none transition-transform duration-500 group-hover:scale-110">
                    0{idx + 1}
                  </span>

                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-3xl sm:text-4xl font-black text-secondary font-mono tracking-tighter">
                        {card.num}
                      </span>
                      <motion.div
                        whileHover={{ rotate: 12, scale: 1.15 }}
                        className="size-11 rounded-2xl bg-surface-info text-secondary flex items-center justify-center shadow-inner transition-colors duration-300 group-hover:bg-secondary group-hover:text-surface"
                      >
                        <Icon className="size-5" />
                      </motion.div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-body mb-2.5 group-hover:text-secondary transition-colors duration-200">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-content leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
