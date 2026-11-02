"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AnimatedHeight } from "@/app/components/shared/AnimatedHeight";
import { Reveal } from "@/app/components/shared/Reveal";
import { listSwap } from "@/lib/animations";
import type { Project } from "../data/projectsData";
import { ProjectCard } from "./ProjectCard";

export interface ProjectListProps {
  projects: Project[];
  /** Changes with the filter: the current list fades out, then the new cards rise in. */
  filterKey: string;
}

/**
 * Cards rise in as they scroll into view (Figma motion). A filter change swaps the whole list, and the height
 * follows smoothly, so the CTA below glides instead of jumping. The list's bottom padding (cancelled by the
 * negative margin) keeps the last card's hover shadow inside AnimatedHeight's vertical clip.
 */
export function ProjectList({ projects, filterKey }: ProjectListProps) {
  return (
    <AnimatedHeight className="-mb-12">
      <AnimatePresence mode="wait">
        <motion.ul key={filterKey} variants={listSwap} exit="exit" className="flex flex-col gap-8 pb-12">
          {projects.map((project, index) => (
            <li key={project.key}>
              <Reveal>
                <ProjectCard project={project} priority={index === 0} />
              </Reveal>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </AnimatedHeight>
  );
}
