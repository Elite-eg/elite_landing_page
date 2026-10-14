"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { NavItem } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { NAV_ITEM_ACTIVE, NAV_ITEM_BASE, NAV_ITEM_IDLE } from "./navItemStyles";
import { useActiveRoute } from "./useActiveRoute";

export interface HeaderNavLinkProps {
  item: NavItem;
}

/** Single top-level link in the desktop navbar. */
export function HeaderNavLink({ item }: HeaderNavLinkProps) {
  const t = useTranslations("nav");
  const isActive = useActiveRoute();
  const active = isActive(item.href);

  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(NAV_ITEM_BASE, active ? NAV_ITEM_ACTIVE : NAV_ITEM_IDLE)}
    >
      {t(item.labelKey)}
    </Link>
  );
}
