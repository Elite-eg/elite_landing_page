"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeInUp, heroStagger, heroTextReveal } from "@/lib/animations";

export function JobsHero() {
  const t = useTranslations("jobs");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0d2240] via-[#122e54] to-[#0a1b33] text-surface py-16 sm:py-24 lg:py-32">
      {/* Background Image */}
      <Image
        src="/images/enterprise-meeting.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 z-0 object-cover object-center opacity-30 mix-blend-overlay select-none pointer-events-none"
      />

      {/* Balanced Navy Radial Overlay Gradient */}
      <div
        className="absolute inset-0 z-0 bg-gradient-to-r from-[#0d2240]/80 via-[#122e54]/65 to-[#0a1b33]/85"
        aria-hidden="true"
      />

      {/* Top & Bottom Vignette Fade */}
      <div
        className="absolute inset-0 z-0 bg-gradient-to-b from-[#0d2240]/60 via-transparent to-[#0a1b33]/75"
        aria-hidden="true"
      />

      {/* Ambient glowing pulse effects */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 start-1/3 size-[500px] bg-accent/20 blur-[150px] rounded-full pointer-events-none z-0"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          variants={heroStagger}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Top Pill Badge */}
          <motion.div variants={fadeInUp} className="inline-block">
            <div className="inline-flex items-center gap-2 bg-surface-dark/90 border border-edge/30 px-4 py-1.5 rounded-full text-xs font-semibold text-secondary backdrop-blur-md shadow-sm">
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
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-surface leading-tight tracking-tight max-w-3xl mx-auto"
          >
            {t("heroTitle")}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="text-sm sm:text-lg text-surface/80 leading-relaxed max-w-2xl mx-auto font-normal"
          >
            {t("heroSubtitle")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
