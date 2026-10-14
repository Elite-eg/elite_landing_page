"use client";

import { useCallback, useMemo } from "react";
import { usePathname } from "@/i18n/navigation";
import { NAV_LINKS, ROUTES } from "@/lib/constants";

/** Every internal href the header can highlight (top-level links + mega menu items). */
const HEADER_HREFS: readonly string[] = NAV_LINKS.flatMap((entry) =>
  entry.type === "link"
    ? [entry.href]
    : entry.menu.sections.flatMap((section) => [
        ...section.items.map((item) => item.href),
        ...(section.moreLink ? [section.moreLink.href] : []),
      ])
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
