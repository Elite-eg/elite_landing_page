import { useLocale, useTranslations } from "next-intl";
import type { ProjectKey } from "@/lib/projects";
import { cn } from "@/lib/utils";

export interface ProjectWordmarkProps {
  projectKey: ProjectKey;
  /** Size, spacing and placement on the cover; the font and colour come from here. */
  className?: string;
}

/**
 * A project's name on its cover, in the visitor's language (`projects.list.<key>.wordmark`): Arabic in the heading
 * font, English in the Poppins logo font. Decorative: the card's title already names the project.
 * Home project cards, projects page covers.
 */
export function ProjectWordmark({ projectKey, className }: ProjectWordmarkProps) {
  const t = useTranslations("projects.list");
  const isArabic = useLocale() === "ar";

  return (
    <p
      aria-hidden="true"
      className={cn("font-semibold text-white", isArabic ? "font-heading" : "font-logo", className)}
    >
      {t(`${projectKey}.wordmark`)}
    </p>
  );
}
