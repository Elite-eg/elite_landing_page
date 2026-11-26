"use client";

import { useCallback, useMemo } from "react";
import { usePathname } from "@/i18n/navigation";
import { NAV_LINKS, ROUTES, type MegaMenu } from "@/lib/constants";

/** Every link of a mega menu: its items and its sections' "see all" links. */
export const megaMenuHrefs = (menu: MegaMenu): string[] =>
  menu.sections.flatMap((section) => [
    ...section.items.map((item) => item.href),
    ...(section.moreLink ? [section.moreLink.href] : []),
  ]);

/** Every internal href the header can highlight (top-level links + mega menu links). */
const HEADER_HREFS: readonly string[] = NAV_LINKS.flatMap((entry) =>
  entry.type === "link" ? [entry.href] : megaMenuHrefs(entry.menu)
).filter((href) => href.startsWith("/"));

const matches = (pathname: string, href: string) => {
  if (href === ROUTES.home) return pathname === ROUTES.home || pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
};

/**
 * Returns a matcher for the single most specific header link of the current page.
 * e.g. on /albiruni/add-ons only "Add-ons store" is active, not its parent "/albiruni".
 */
export function useActiveRoute() {
  const pathname = usePathname();

  const activeHref = useMemo(() => {
    if (!pathname) return null;
    return HEADER_HREFS.filter((href) => matches(pathname, href)).sort((a, b) => b.length - a.length)[0] ?? null;
  }, [pathname]);

  return useCallback((href: string) => href === activeHref, [activeHref]);
}
