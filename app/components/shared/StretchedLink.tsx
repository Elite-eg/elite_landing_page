import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export interface StretchedLinkProps {
  href: string;
  external?: boolean;
  /** Matches the card: the rounding of the stretched area and its focus ring (default `after:rounded-2xl`). */
  className?: string;
  "aria-describedby"?: string;
  children: ReactNode;
}

/**
 * A link whose ::after stretches over the nearest positioned card, so the whole card is one click target; the focus
 * ring is drawn around the card. Put it on the card's title or action text (community tiles, home cards).
 * Internal paths go through i18n navigation, external ones open in a new tab.
 */
export function StretchedLink({ href, external = false, className, children, ...rest }: StretchedLinkProps) {
  const classes = cn(
    "after:absolute after:inset-0 after:rounded-2xl focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:after:ring-2 focus-visible:after:ring-secondary",
    className
  );

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
      {children}
    </a>
  ) : (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
