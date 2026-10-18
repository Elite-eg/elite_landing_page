"use client";

import { useClose } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { NavItem } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useActiveRoute } from "./useActiveRoute";

export interface HeaderMobileNavLinkProps {
  item: NavItem;
}

const BASE =
  "flex items-center rounded-lg px-3 py-3 text-body-lg transition-colors duration-200 ease-out-brand";

/** Top-level link inside the mobile drawer (closes the drawer on click). */
export function HeaderMobileNavLink({ item }: HeaderMobileNavLinkProps) {
  const t = useTranslations("nav");
  const close = useClose();
  const isActive = useActiveRoute();
  const active = isActive(item.href);

  return (
    <Link
      href={item.href}
      onClick={close}
      aria-current={active ? "page" : undefined}
      className={cn(
        BASE,
        active ? "bg-orange-50 font-semibold text-secondary" : "font-medium text-ink-900 hover:bg-surface-alt hover:text-primary"
      )}
    >
      {t(item.labelKey)}
    </Link>
  );
}
