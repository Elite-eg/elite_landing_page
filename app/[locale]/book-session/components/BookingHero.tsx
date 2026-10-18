"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import {
  fadeInUp,
  heroStagger,
  heroTextReveal,
  slideInFromEnd,
  staggerContainer,
} from "@/lib/animations";
import { BookingCalendarCard } from "./BookingCalendarCard";

export function BookingHero() {
  const t = useTranslations("booking");
  const isRtl = useLocale() === "ar";

  const outcomes = [
    {
      title: t("outcomes.one.title"),
      subtitle: t("outcomes.one.subtitle"),
    },
    {
      title: t("outcomes.two.title"),
      subtitle: t("outcomes.two.subtitle"),
    },
    {
      title: t("outcomes.three.title"),
      subtitle: t("outcomes.three.subtitle"),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0d2240] via-[#122e54] to-[#0a1b33] text-surface py-12 lg:py-20">
      {/* Background Image */}
      <Image
        src="/images/enterprise-meeting.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 z-0 object-cover object-center opacity-30 mix-blend-overlay select-none pointer-events-none"
      />

      {/* Balanced Navy Overlay Gradient */}
      <div
        className="absolute inset-0 z-0 bg-gradient-to-r from-[#0d2240]/75 via-[#122e54]/60 to-[#0a1b33]/80"
        aria-hidden="true"
      />

      {/* Top & Bottom Vignette Fade */}
      <div
        className="absolute inset-0 z-0 bg-gradient-to-b from-[#0d2240]/50 via-transparent to-[#0a1b33]/65"
        aria-hidden="true"
      />

      {/* Ambient glowing pulse effects */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 start-1/3 size-[450px] bg-accent/20 blur-[140px] rounded-full pointer-events-none z-0"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 end-10 size-80 bg-secondary/15 blur-[110px] rounded-full pointer-events-none z-0"
      />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          {/* Right Column: Hero Content & Bullets */}
          <div className="lg:col-span-6 space-y-6 lg:pe-4">
            {/* Top Pill Badge */}
            <motion.div variants={fadeInUp}>
              <div className="inline-flex items-center gap-2 bg-surface-dark/90 border border-edge/30 px-4 py-1.5 rounded-full text-xs font-semibold text-secondary backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-105 hover:border-secondary/40">
                <span className="relative flex size-2" aria-hidden="true">
                  <span className="absolute inline-flex size-full rounded-full bg-secondary opacity-75 animate-ping" />
                  <span className="relative inline-flex size-2 rounded-full bg-secondary" />
                </span>
                <span>{t("badge")}</span>
              </div>
            </motion.div>

            {/* Main H1 Title */}
            <motion.h1
              variants={heroTextReveal}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-surface leading-tight tracking-tight"
            >
              {t("title")}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-sm sm:text-base text-surface/80 leading-relaxed max-w-xl"
            >
              {t("subtitle")}
            </motion.p>

            {/* What you get section */}
            <motion.div variants={fadeInUp} className="pt-4 space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-surface flex items-center gap-2">
                <span>{t("whatYouGetTitle")}</span>
              </h2>

              <motion.ul variants={staggerContainer} className="space-y-3.5">
                {outcomes.map((item, index) => (
                  <motion.li
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ x: isRtl ? -4 : 4 }}
                    className="flex items-start gap-3 group transition-colors duration-200"
                  >
                    <div className="size-6 rounded-full bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center text-surface shrink-0 mt-0.5 shadow-md shadow-secondary/20 transition-transform duration-300 group-hover:scale-110">
                      <FiCheckCircle className="size-4" />
                    </div>
                    <div>
                      <span className="font-bold text-surface text-sm sm:text-base">
                        {item.title}
                      </span>
                      <span className="text-surface/60 text-xs sm:text-sm ms-2 font-normal">
                        — {item.subtitle}
                      </span>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Attendee Info Card */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -3, scale: 1.01 }}
              className="mt-8 p-4 sm:p-5 rounded-2xl bg-surface-dark/95 border border-edge/20 backdrop-blur-md flex items-center justify-between gap-4 max-w-md shadow-lg transition-all duration-300 hover:border-secondary/40 hover:shadow-2xl"
            >
              <div className="space-y-1">
                <div className="text-xs sm:text-sm font-bold text-surface">
                  {t("attendeeCard.title")}
                </div>
                <div className="text-[11px] sm:text-xs text-surface/70">
                  {t("attendeeCard.subtitle")}
                </div>
              </div>

              <div className="flex items-center -space-x-2 rtl:space-x-reverse shrink-0">
                <motion.div
                  whileHover={{ scale: 1.15, zIndex: 10 }}
                  className="size-9 rounded-full bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center font-bold text-surface text-xs border-2 border-surface-dark shadow-md"
                >
                  م
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.15, zIndex: 10 }}
                  className="size-9 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center font-bold text-surface text-xs border-2 border-surface-dark shadow-md"
                >
                  خ
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Left Column: Interactive Booking Widget */}
          <motion.div
            className="lg:col-span-6 flex justify-center lg:justify-end"
            variants={slideInFromEnd(isRtl)}
          >
            <BookingCalendarCard />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
