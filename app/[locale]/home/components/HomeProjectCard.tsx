import { useLocale, useTranslations } from "next-intl";
import { CARD_HOVER_CLASSES } from "@/app/components/shared/cardStyles";
import { StretchedLink } from "@/app/components/shared/StretchedLink";
import { COMPANY_INFO, type AppLocale } from "@/lib/constants";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { HomeProjectCover } from "./HomeProjectCover";
import { HomeProjectLinks } from "./HomeProjectLinks";

export interface HomeProjectCardProps {
  project: Project;
  /** The card's bottom row: "public" lists the project's public links, "page" names its page. */
  linkTo: "public" | "page";
}

/**
 * One project (Figma "Project"): cover, name, what it is, who it was built for, tags and links. The whole card links
 * to the project's page (its title is the link); the public links in the bottom row stay their own links.
 * Name and wordmark are the project's own (`projects.list.<key>`); the rest is home copy (`home.projects.items.<key>`).
 */
export function HomeProjectCard({ project, linkTo }: HomeProjectCardProps) {
  const t = useTranslations(`home.projects.items.${project.key}`);
  const tProject = useTranslations(`projects.list.${project.key}`);
  const brand = COMPANY_INFO.brandName[useLocale() as AppLocale];
  const tags = t.raw("tags") as string[];

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-edge bg-surface hover:border-primary/20",
        CARD_HOVER_CLASSES
      )}
    >
      <HomeProjectCover project={project} badge={t("badge")} />

      <div className="flex flex-1 flex-col items-start gap-3 px-6 pb-6 pt-6 sm:px-[1.625rem]">
        <h3 className="text-h3 font-bold text-body">
          {/* The card clips its corners, so the focus ring is drawn inside its edge. */}
          <StretchedLink href={project.href} className="after:rounded-3xl focus-visible:after:ring-inset">
            {tProject("name")}
          </StretchedLink>
        </h3>
        <p className="text-caption text-content">{t("description")}</p>
        <p className="text-caption font-medium text-primary">{t("credit", { brand })}</p>
        <ul className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <li key={tag} className="rounded-full border border-edge px-2.5 py-0.5 text-xs text-content">
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-1">
          <HomeProjectLinks project={project} linkTo={linkTo} />
        </div>
      </div>
    </article>
  );
}
