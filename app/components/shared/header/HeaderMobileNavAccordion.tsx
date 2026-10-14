"use client";

import { useEffect, useId, useState } from "react";
import { useTranslations } from "next-intl";
import { FiChevronDown } from "react-icons/fi";
import type { MegaMenu } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { MegaMenuPromo } from "./MegaMenuPromo";
import { MegaMenuSection } from "./MegaMenuSection";
import { useActiveRoute } from "./useActiveRoute";

export interface HeaderMobileNavAccordionProps {
  /** Key inside the "nav" messages namespace. */
  labelKey: string;
  menu: MegaMenu;
}

/** Mega menu rendered as an accordion inside the drawer. Opens itself when a child page is active. */
export function HeaderMobileNavAccordion({ labelKey, menu }: HeaderMobileNavAccordionProps) {
  const t = useTranslations("nav");
  const panelId = useId();
  const isActive = useActiveRoute();
  const hasActiveChild = menu.sections.some((section) => section.items.some((item) => isActive(item.href)));
  const [isOpen, setIsOpen] = useState(hasActiveChild);

  useEffect(() => {
    if (hasActiveChild) setIsOpen(true);
  }, [hasActiveChild]);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={cn(
          "flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-3 text-body-lg transition-colors duration-200 ease-out-brand",
          hasActiveChild || isOpen ? "font-semibold text-secondary" : "font-medium text-ink-900 hover:bg-surface-alt"
        )}
      >
        <span>{t(labelKey)}</span>
        <FiChevronDown
          aria-hidden
          className={cn("size-5 transition-transform duration-300 ease-out-brand", isOpen && "rotate-180")}
        />
      </button>

      {/* Animates height with grid rows (0fr → 1fr), so no measuring is needed. */}
      <div
        id={panelId}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out-brand motion-reduce:transition-none",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden" inert={!isOpen}>
          <div className="space-y-5 pb-3 pt-1 ps-2">
            {menu.sections.map((section) => (
              <MegaMenuSection key={section.titleKey} section={section} />
            ))}
            <MegaMenuPromo promo={menu.promo} />
          </div>
        </div>
      </div>
    </div>
  );
}
