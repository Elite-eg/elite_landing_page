"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedHeight } from "@/app/components/shared/AnimatedHeight";
import { FilterPills } from "@/app/components/shared/FilterPills";
import { Reveal } from "@/app/components/shared/Reveal";
import { MOTION, listSwap, scaleIn, viewportOnce, withDelay } from "@/lib/animations";
import { APP_FILTERS, PLATFORM_APPS, type AppFilter } from "../data/homeData";
import { PlatformAppCard } from "./PlatformAppCard";
import { ScrollablePills } from "./ScrollablePills";

/** Tiles after this many share the last delay, so a full grid never takes long to appear. */
const APPS_STAGGER_CAP = 6;

/**
 * Team filter (segmented pills) over the Albiruni apps grid. A filter change fades the grid out, brings the matching
 * apps in, and the height follows so the line below glides. The grid's bottom padding (cancelled by the negative
 * margin) keeps the hover shadow of the last row inside AnimatedHeight's clip.
 */
export function AppsExplorer() {
  const t = useTranslations("home.apps");
  const [filter, setFilter] = useState<AppFilter>("all");
  const apps = filter === "all" ? PLATFORM_APPS : PLATFORM_APPS.filter((app) => app.category === filter);

  return (
    <div className="flex flex-col gap-10">
      <Reveal>
        <ScrollablePills>
          <FilterPills
            options={APP_FILTERS}
            value={filter}
            onChange={setFilter}
            getLabel={(option) => t(`filters.${option}`)}
            label={t("filterLabel")}
            size="segmented"
          />
        </ScrollablePills>
      </Reveal>

      <AnimatedHeight className="-mb-8">
        <AnimatePresence mode="wait">
          <motion.ul
            key={filter}
            variants={listSwap}
            exit="exit"
            className="grid grid-cols-2 gap-4 pb-8 sm:grid-cols-3 lg:grid-cols-6"
          >
            {apps.map((app, index) => (
              <motion.li
                key={app.key}
                variants={withDelay(scaleIn, Math.min(index, APPS_STAGGER_CAP) * MOTION.staggerCard)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                <PlatformAppCard app={app} />
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </AnimatedHeight>
    </div>
  );
}
