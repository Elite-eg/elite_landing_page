import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

export interface CommunityTileLinkProps {
  href: string;
  external?: boolean;
  children: ReactNode;
}

/** The ::after stretches over the tile, so the whole card is one click target; the focus ring is drawn around it. */
const STRETCHED_LINK_CLASSES =
  "after:absolute after:inset-0 after:rounded-2xl focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:after:ring-2 focus-visible:after:ring-secondary";

/** Tile title as a link: internal paths go through i18n navigation, external ones open in a new tab. */
export function CommunityTileLink({ href, external = false, children }: CommunityTileLinkProps) {
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={STRETCHED_LINK_CLASSES}>
      {children}
    </a>
  ) : (
    <Link href={href} className={STRETCHED_LINK_CLASSES}>
      {children}
    </Link>
  );
}
