import { useLocale, useTranslations } from "next-intl";
import { CARD_HOVER_CLASSES } from "@/app/components/shared/cardStyles";
import { COMPANY_INFO, ROUTES, type AppLocale } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Project } from "../data/projectsData";
import { ProjectCover } from "./ProjectCover";
import { ProjectFeatureList } from "./ProjectFeatureList";
import { ProjectLinks } from "./ProjectLinks";
import { ProjectTags } from "./ProjectTags";
import { ProjectTechList } from "./ProjectTechList";

export interface ProjectCardProps {
  project: Project;
  /** Loads the cover photo eagerly: set for the first card, which sits above the fold. */
  priority?: boolean;
}

/**
 * One project (Figma "Case"): details on the start side, cover on the end side from lg; cover on top below.
 * Rests on a small shadow; hover: the border darkens and the shadow grows.
 */
export function ProjectCard({ project: { key, cover, links }, priority }: ProjectCardProps) {
  const t = useTranslations(`projects.list.${key}`);
  const brand = COMPANY_INFO.brandName[useLocale() as AppLocale];
  const titleId = `project-${key}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "grid overflow-hidden rounded-3xl border border-edge bg-surface hover:border-primary/20 lg:grid-cols-12",
        CARD_HOVER_CLASSES
      )}
    >
      <ProjectCover
        cover={cover}
        wordmark={t("wordmark")}
        priority={priority}
        className="lg:order-last lg:col-span-5"
      />

      <div className="flex flex-col items-start gap-4 p-6 sm:p-8 lg:col-span-7 lg:p-11">
        <ProjectTags tags={t.raw("tags") as string[]} />
        <h2 id={titleId} className="text-2xl font-bold text-body sm:text-3xl">
          {t("name")}
        </h2>
        <p className="font-heading font-medium text-primary">{t("tagline")}</p>
        <p className="max-w-prose text-content">{t("description", { brand })}</p>
        <ProjectFeatureList features={t.raw("features") as string[]} />
        <ProjectTechList tech={t.raw("tech") as string[]} />
        <p className="text-caption text-content">{t("meta", { brand })}</p>
        <ProjectLinks detailsHref={ROUTES.projects[key]} links={links} siteName={t("wordmark")} describedBy={titleId} />
      </div>
    </article>
  );
}
