import { useTranslations } from "next-intl";
import { FiArrowUpRight } from "react-icons/fi";
import type { AppLink, Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

export interface HomeProjectLinksProps {
  project: Project;
  /** "public": the project's website and store listings (new tab); "page": the name of its page. */
  linkTo: "public" | "page";
}

const LABEL_CLASSES = "inline-flex items-center gap-1.5 font-heading text-caption font-semibold text-secondary-dark";

/**
 * The card's bottom row (Figma: orange text with ↗). The card itself links to the project's page, so "page" is only
 * the visible cue of that link; "public" lists the project's public links, raised above the card's link so they keep
 * their own target.
 */
export function HomeProjectLinks({ project, linkTo }: HomeProjectLinksProps) {
  const t = useTranslations("home.projects.items");
  const tStores = useTranslations("appLinks");

  if (linkTo === "page") {
    return (
      <p aria-hidden="true" className={cn(LABEL_CLASSES, "transition-colors group-hover:text-primary")}>
        <span>{t(`${project.key}.link`)}</span>
        <FiArrowUpRight className="size-3.5 shrink-0" />
      </p>
    );
  }

  const label = ({ kind, href }: AppLink) => (kind === "website" ? new URL(href).hostname : tStores(`${kind}.label`));

  return (
    <ul className="flex flex-wrap gap-x-3.5 gap-y-2">
      {project.links.map((link) => (
        <li key={link.kind}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(LABEL_CLASSES, "relative z-10 transition-colors hover:text-primary")}
          >
            <span dir="ltr">{label(link)}</span>
            <FiArrowUpRight className="size-3.5 shrink-0" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
