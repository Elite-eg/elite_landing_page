"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiArrowRight, FiBriefcase } from "react-icons/fi";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { JOBS_OPEN_POSITIONS_ID } from "@/lib/constants";
import { OPEN_JOB_POSITIONS, type JobOpening } from "../data/jobsData";
import { JobApplyModal } from "./JobApplyModal";

export function OpenPositionsSection() {
  const t = useTranslations("jobs.openPositions");
  const locale = useLocale() as "ar" | "en";
  const isRtl = locale === "ar";

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobOpening | null>(null);

  const categories = [
    { key: "all", label: t("categories.all") },
    { key: "engineering", label: t("categories.engineering") },
    { key: "product", label: t("categories.product") },
    { key: "design", label: t("categories.design") },
    { key: "sales", label: t("categories.sales") },
    { key: "qa", label: t("categories.qa") },
  ];

  const filteredJobs = OPEN_JOB_POSITIONS.filter(
    (job) => selectedCategory === "all" || job.category === selectedCategory
  );

  const ArrowIcon = isRtl ? FiArrowLeft : FiArrowRight;

  return (
    <section id={JOBS_OPEN_POSITIONS_ID} className="py-16 sm:py-24 bg-surface relative overflow-hidden">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          className="mb-8"
        >
          <h2 className="text-2xl sm:text-4xl font-extrabold text-surface-dark tracking-tight">
            {t("title")}
          </h2>
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10"
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <motion.button
                key={cat.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-primary-deep text-surface shadow-md"
                    : "bg-surface-muted text-content hover:bg-surface-alt hover:text-surface-dark"
                }`}
              >
                {cat.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Job Listings */}
        <AnimatePresence mode="wait">
          {filteredJobs.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center py-12 p-8 rounded-2xl bg-surface-alt border border-edge/60 text-content text-sm"
            >
              {t("noJobsFound")}
            </motion.div>
          ) : (
            <motion.div
              key={selectedCategory}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-4"
            >
              {filteredJobs.map((job) => {
                const titleText = job.title[locale] ?? job.title.ar ?? job.title.en ?? "";
                return (
                  <motion.div
                    key={job.id}
                    variants={fadeInUp}
                    whileHover={{ y: -4, scale: 1.005 }}
                    className="p-6 sm:p-8 rounded-2xl bg-surface-alt border border-edge/60 hover:border-secondary/40 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
                  >
                    {/* Left (AR right): Title & Meta Tags */}
                    <div className="space-y-3">
                      <h3 className="text-lg sm:text-xl font-bold text-surface-dark leading-snug group-hover:text-primary transition-colors">
                        {titleText}
                      </h3>

                    {/* Meta Tags */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      {job.tags[locale].map((tag, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface border border-edge/50 text-xs font-medium text-content shadow-2xs"
                        >
                          {i === 0 && <FiBriefcase className="size-3 text-secondary shrink-0" />}
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="shrink-0">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setSelectedJobForModal(job)}
                      className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-secondary hover:bg-secondary-dark text-surface font-bold text-sm transition-all duration-200 shadow-md hover:shadow-xl"
                    >
                      <span>{t("applyNow")}</span>
                      <ArrowIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                    </motion.button>
                  </div>
                </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Application Modal */}
      {selectedJobForModal && (
        <JobApplyModal
          isOpen={Boolean(selectedJobForModal)}
          onClose={() => setSelectedJobForModal(null)}
          job={selectedJobForModal}
          locale={locale}
        />
      )}
    </section>
  );
}
