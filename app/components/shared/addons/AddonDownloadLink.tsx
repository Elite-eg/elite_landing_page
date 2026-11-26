import type { AnchorHTMLAttributes, ReactNode } from "react";
import { buttonClasses, renderButtonContent, type ButtonStyleOptions } from "@/app/components/shared/Button";

export interface AddonDownloadLinkProps
  extends ButtonStyleOptions,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children"> {
  /** The file's download link (from the backend). */
  url: string;
  children: ReactNode;
  /** Shown before the label. */
  icon?: ReactNode;
}

/**
 * Downloads a bought add-on's file. A plain <a> styled as a button: `Button` sends its links through the site's
 * locale routing, and the file comes from the backend, not from a site page.
 */
export function AddonDownloadLink({
  url,
  children,
  icon,
  variant = "secondary",
  size = "md",
  fullWidth,
  lift,
  className,
  ...anchorProps
}: AddonDownloadLinkProps) {
  return (
    <a href={url} {...anchorProps} className={buttonClasses({ variant, size, fullWidth, lift, className })}>
      {renderButtonContent({ children, icon, iconPosition: "start", size })}
    </a>
  );
}
