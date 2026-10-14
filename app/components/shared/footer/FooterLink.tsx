import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export interface FooterLinkProps {
  href: string;
  /** Opens in a new tab (other sites). */
  external?: boolean;
  /** Slight horizontal nudge on hover; off for contact details. */
  nudge?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Footer text link. Internal paths ("/...") go through the locale-aware Link;
 * everything else (tel:, mailto:, other sites) is a plain anchor.
 */
export function FooterLink({ href, external = false, nudge = true, className, children }: FooterLinkProps) {
  const classes = cn(
    "inline-block rounded-sm text-content-dark transition-[color,transform] duration-200 ease-out-brand hover:text-surface focus-visible:ring-offset-ink-900",
    nudge && "hover:translate-x-0.5 rtl:hover:-translate-x-0.5",
    className
  );

  if (!href.startsWith("/")) {
    return (
      <a
        href={href}
        className={classes}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
