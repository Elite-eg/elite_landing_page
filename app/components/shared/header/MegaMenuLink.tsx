"use client";

import { useClose } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { NavItem } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useActiveRoute } from "./useActiveRoute";

export interface MegaMenuLinkProps {
  item: NavItem;
}

/** Mega menu entry: bold title + gray description line. Closes the surrounding popover / drawer on click. */
export function MegaMenuLink({ item }: MegaMenuLinkProps) {
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
        "group block rounded-xl p-2.5 transition-colors duration-200 ease-out-brand hover:bg-surface-alt",
        active && "bg-surface-alt"
      )}
    >
      <span className="block transition-transform duration-200 ease-out-brand group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 motion-reduce:transform-none">
        <span className="block text-sm font-semibold text-ink-900 transition-colors duration-200 ease-out-brand group-hover:text-primary">
          {t(item.labelKey)}
        </span>
        {item.descriptionKey && (
          <span className="mt-0.5 block text-xs leading-relaxed text-content">{t(item.descriptionKey)}</span>
        )}
      </span>
    </Link>
  );
}
