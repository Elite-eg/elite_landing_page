import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { AddonSectionId } from "../data/addonPageData";

export interface AddonDetailsSectionProps {
  id: AddonSectionId;
  title: string;
  /** Keep the title for screen readers only (the media section has no visible title in the Figma). */
  hideTitle?: boolean;
  children: ReactNode;
}

/** One section of the add-on page: its tab's anchor and a 24px document heading (Figma "Section/…"). */
export function AddonDetailsSection({ id, title, hideTitle = false, children }: AddonDetailsSectionProps) {
  const titleId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={titleId} className="flex flex-col gap-4">
      <h2 id={titleId} className={cn("text-h3 text-body", hideTitle && "sr-only")}>
        {title}
      </h2>
      {children}
    </section>
  );
}
