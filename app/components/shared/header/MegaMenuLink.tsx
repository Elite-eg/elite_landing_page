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

/**
 * Mega menu entry. "Rich" when it has a description (bold title + gray line, optional icon tile),
 * "plain" otherwise. Closes the surrounding popover / drawer on click.
 */
export function MegaMenuLink({ item }: MegaMenuLinkProps) {
  const t = useTranslations("nav");
  const close = useClose();
  const isActive = useActiveRoute();
  const active = isActive(item.href);
  const Icon = item.icon;

  if (!item.descriptionKey) {
    return (
      <Link
        href={item.href}
        onClick={close}
        aria-current={active ? "page" : undefined}
        className={cn(
          "block rounded-lg px-2.5 py-2 text-sm transition-[color,background-color,transform] duration-200 ease-out-brand hover:translate-x-0.5 hover:bg-surface-alt hover:text-primary rtl:hover:-translate-x-0.5 motion-reduce:transform-none",
          active ? "bg-surface-alt font-semibold text-primary" : "font-medium text-body"
        )}
      >
        {t(item.labelKey)}
      </Link>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={close}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group flex items-start gap-3 rounded-xl p-2.5 transition-colors duration-200 ease-out-brand hover:bg-surface-alt",
        active && "bg-surface-alt"
      )}
    >
      {Icon && (
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-navy-50 text-primary transition-[color,background-color,transform] duration-200 ease-back group-hover:scale-105 group-hover:bg-primary group-hover:text-surface">
          <Icon aria-hidden className="size-4" />
        </span>
      )}
      <span className="min-w-0 transition-transform duration-200 ease-out-brand group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 motion-reduce:transform-none">
        <span className="block text-sm font-semibold text-ink-900 transition-colors duration-200 ease-out-brand group-hover:text-primary">
          {t(item.labelKey)}
        </span>
        <span className="mt-0.5 block text-xs leading-relaxed text-content">{t(item.descriptionKey)}</span>
      </span>
    </Link>
  );
}
