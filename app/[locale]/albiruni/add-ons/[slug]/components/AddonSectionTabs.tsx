"use client";

import { useId } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useActiveSection } from "@/app/components/shared/useActiveSection";
import { layoutTransition } from "@/lib/animations";
import { cn } from "@/lib/utils";

export interface AddonSectionTab {
  /** Anchor id of the section. */
  id: string;
  label: string;
}

export interface AddonSectionTabsProps {
  items: readonly AddonSectionTab[];
}

/**
 * Tab bar over the page's sections (Figma "Tabs"): each tab jumps to its section, and the section being read gets
 * the orange underline, which glides between tabs. Scrolls sideways on narrow screens.
 */
export function AddonSectionTabs({ items }: AddonSectionTabsProps) {
  const t = useTranslations("addons.details.tabs");
  const [activeId, setActiveId] = useActiveSection(items.map(({ id }) => id));
  const indicatorId = useId();

  return (
    <nav
      aria-label={t("label")}
      className="-mx-4 overflow-x-auto border-b border-edge px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
    >
      <ul className="flex gap-7">
        {items.map(({ id, label }) => {
          const isActive = id === activeId;

          return (
            <li key={id} className="shrink-0">
              <a
                href={`#${id}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => setActiveId(id)}
                className={cn(
                  "relative block whitespace-nowrap px-1 py-3 text-caption font-medium transition-colors duration-200",
                  isActive ? "text-primary-dark" : "text-content hover:text-primary"
                )}
              >
                {label}
                {isActive && (
                  <motion.span
                    layoutId={indicatorId}
                    transition={layoutTransition}
                    className="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-secondary"
                    aria-hidden="true"
                  />
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
