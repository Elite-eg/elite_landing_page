"use client";

import { motion } from "framer-motion";
import { AddonDeveloperLabel } from "@/app/components/shared/addons/AddonDeveloperLabel";
import { AddonIcon } from "@/app/components/shared/addons/AddonIcon";
import { Container } from "@/app/components/shared/Container";
import type { AddonDetails } from "@/lib/addons";
import { fadeInUp, heroStagger, heroTextReveal } from "@/lib/animations";
import { AddonBreadcrumb } from "./AddonBreadcrumb";
import { AddonMetaLine } from "./AddonMetaLine";

export type AddonHeroData = Pick<
  AddonDetails,
  "name" | "category" | "icon" | "developer" | "rating" | "reviewCount" | "installs" | "version" | "versions"
>;

export interface AddonDetailsHeroProps {
  addon: AddonHeroData;
}

/**
 * Grey band (Figma "Top"): breadcrumb, then the add-on's icon beside its name, developer and meta line.
 * The page's one orchestrated entrance.
 */
export function AddonDetailsHero({ addon }: AddonDetailsHeroProps) {
  return (
    <section className="bg-surface-alt py-8">
      <Container>
        <motion.div variants={heroStagger} initial="hidden" animate="visible" className="flex flex-col gap-6">
          <motion.div variants={fadeInUp}>
            <AddonBreadcrumb category={addon.category} name={addon.name} />
          </motion.div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
            <motion.div variants={fadeInUp}>
              <AddonIcon icon={addon.icon} size="lg" />
            </motion.div>

            <div className="flex min-w-0 flex-col gap-2.5">
              <motion.h1
                variants={heroTextReveal}
                className="text-balance text-4xl font-bold leading-[1.3] text-body sm:text-[2.75rem] sm:leading-[1.3] lg:text-5xl lg:leading-[1.3]"
              >
                {addon.name}
              </motion.h1>
              <motion.div variants={fadeInUp}>
                <AddonDeveloperLabel developer={addon.developer} showCertified className="font-medium text-primary" />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <AddonMetaLine
                  rating={addon.rating}
                  reviewCount={addon.reviewCount}
                  installs={addon.installs}
                  version={addon.version}
                  versions={addon.versions}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
