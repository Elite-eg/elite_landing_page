"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { FiChevronDown } from "react-icons/fi";
import type { MegaMenu } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { MegaMenuPromo } from "./MegaMenuPromo";
import { MegaMenuSection } from "./MegaMenuSection";
import { NAV_ITEM_ACTIVE, NAV_ITEM_BASE, NAV_ITEM_IDLE, NAV_ITEM_OPEN } from "./navItemStyles";
import { useActiveRoute } from "./useActiveRoute";

export interface HeaderMegaMenuProps {
  /** Key inside the "nav" messages namespace. */
  labelKey: string;
  menu: MegaMenu;
}

/** Desktop nav trigger that opens a two-column mega menu with a promo card. */
export function HeaderMegaMenu({ labelKey, menu }: HeaderMegaMenuProps) {
  const t = useTranslations("nav");
  const isActive = useActiveRoute();
  const hasActiveChild = menu.sections.some((section) => section.items.some((item) => isActive(item.href)));

  return (
    <Popover className="group/menu relative">
      <PopoverButton
        className={cn(
          NAV_ITEM_BASE,
          "inline-flex items-center gap-1",
          "outline-none focus-visible:ring-0 focus-visible:ring-offset-0 data-[focus]:ring-2 data-[focus]:ring-secondary data-[focus]:ring-offset-2",
          hasActiveChild ? NAV_ITEM_ACTIVE : NAV_ITEM_IDLE,
          NAV_ITEM_OPEN
        )}
      >
        {t(labelKey)}
        <FiChevronDown
          aria-hidden
          className="size-4 transition-transform duration-200 ease-out-brand group-data-[open]/menu:rotate-180"
        />
      </PopoverButton>

      {/* Anchored (Floating UI): opens under the trigger and shifts to keep 16px from the viewport edges. */}
      <PopoverPanel
        transition
        anchor={{ to: "bottom start", gap: 12, padding: 16 }}
        className="z-[110] w-[46rem] max-w-[calc(100vw-2rem)] origin-top rounded-2xl border border-edge bg-surface p-5 shadow-lift transition duration-200 ease-out-brand data-[closed]:-translate-y-2 data-[closed]:opacity-0 motion-reduce:transition-none"
      >
        <div className="grid grid-cols-[1fr_1fr_14rem] gap-5">
          {menu.sections.map((section) => (
            <MegaMenuSection key={section.titleKey} section={section} />
          ))}
          <MegaMenuPromo promo={menu.promo} />
        </div>
      </PopoverPanel>
    </Popover>
  );
}
