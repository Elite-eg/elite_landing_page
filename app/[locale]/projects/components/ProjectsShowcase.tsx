"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { PROJECTS, type ProjectFilterValue } from "../data/projectsData";
import { ProjectCategoryFilter } from "./ProjectCategoryFilter";
import { ProjectList } from "./ProjectList";
import { ProjectsHero } from "./ProjectsHero";

/** Hero with the category filter, and the project cards it filters. */
export function ProjectsShowcase() {
  const t = useTranslations("projects.filter");
  const [category, setCategory] = useState<ProjectFilterValue>("all");

  const projects =
    category === "all" ? PROJECTS : PROJECTS.filter((project) => project.categories.includes(category));

  return (
    <>
      <ProjectsHero filter={<ProjectCategoryFilter value={category} onChange={setCategory} />} />

      <section aria-label={t("listLabel")} className="bg-surface pt-5">
        <Container>
          {/* Screen readers hear the new count after a filter change. */}
          <p className="sr-only" aria-live="polite">
            {t("resultsCount", { count: projects.length })}
          </p>

          <ProjectList projects={projects} filterKey={category} />
        </Container>
      </section>
    </>
  );
}
