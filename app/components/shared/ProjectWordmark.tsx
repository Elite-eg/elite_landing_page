import { useLocale, useTranslations } from "next-intl";
import type { ProjectKey, ProjectTone } from "@/lib/projects";
import { cn } from "@/lib/utils";

export interface ProjectWordmarkProps {
  projectKey: ProjectKey;
  /** The cover's tone: a client with its own identity gets its colour (white otherwise). */
  tone?: ProjectTone;
  /** Size, spacing and placement on the cover; the font and colour come from here. */
  className?: string;
}

/** Wordmark colour per cover tone, where the client's identity has one (TURSA: gold on emerald). */
const TONE_TEXT_CLASSES: Partial<Record<ProjectTone, string>> = {
  tursa: "text-tursa-gold",
};

/**
 * A project's name on its cover, in the visitor's language (`projects.list.<key>.wordmark`): Arabic in the heading
 * font, English in the Poppins logo font. Decorative: the card's title already names the project.
 * Home project cards, projects page covers.
 */
export function ProjectWordmark({ projectKey, tone, className }: ProjectWordmarkProps) {
  const t = useTranslations("projects.list");
  const isArabic = useLocale() === "ar";

  return (
    <p
      aria-hidden="true"
      className={cn(
        "font-semibold",
        (tone && TONE_TEXT_CLASSES[tone]) ?? "text-white",
        isArabic ? "font-heading" : "font-logo",
        className
      )}
    >
      {t(`${projectKey}.wordmark`)}
    </p>
  );
}
