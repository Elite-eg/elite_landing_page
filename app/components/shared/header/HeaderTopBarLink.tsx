"use client";

import { useClose } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { NavItem } from "@/lib/constants";
import { cn } from "@/lib/utils";

export interface HeaderTopBarLinkProps {
  item: NavItem;
  className?: string;
}

/** Small utility link (top bar / drawer footer), with optional leading icon. External links open in a new tab. */
export function HeaderTopBarLink({ item, className }: HeaderTopBarLinkProps) {
  const t = useTranslations("nav");
  const close = useClose();
  const Icon = item.icon;
  const classes = cn(
    "group inline-flex items-center gap-1.5 rounded-sm transition-colors duration-200 ease-out-brand",
    className
  );
  const content = (
    <>
      {Icon && (
        <Icon
          aria-hidden
          className="size-3.5 shrink-0 text-secondary transition-transform duration-200 ease-back group-hover:scale-110"
        />
      )}
      <span>{t(item.labelKey)}</span>
    </>
  );

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={close} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={item.href} onClick={close} className={classes}>
      {content}
    </Link>
  );
}
