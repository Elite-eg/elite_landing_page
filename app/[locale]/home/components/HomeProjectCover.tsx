import { ProjectCoverPhoto } from "@/app/components/shared/ProjectCoverPhoto";
import { ProjectWordmark } from "@/app/components/shared/ProjectWordmark";
import { cn } from "@/lib/utils";
import type { Project, ProjectTone } from "@/lib/projects";

export interface HomeProjectCoverProps {
  project: Project;
  badge: string;
}

const TONE_CLASSES: Record<ProjectTone, string> = {
  brand: "from-secondary to-secondary-dark",
  navy: "from-primary to-primary-dark",
  bareeq: "from-bareeq to-bareeq-950",
  midnight: "from-primary-dark to-primary-deep",
};

/**
 * Project cover (Figma "Cover"): the project's colour over its photo (when it has one), a glass badge on the start
 * side and the project's name in the visitor's language at the bottom, also on the start side.
 */
export function HomeProjectCover({ project: { key, cover, images }, badge }: HomeProjectCoverProps) {
  return (
    <div
      className={cn(
        "relative isolate flex h-48 flex-col justify-between overflow-hidden bg-gradient-to-br p-6 sm:h-[14.375rem]",
        TONE_CLASSES[cover.tone]
      )}
    >
      {images.photo && <ProjectCoverPhoto src={images.photo} />}
      <p className="self-start rounded-full bg-white/[0.16] px-2.5 py-1 text-xs font-medium text-white">{badge}</p>
      <ProjectWordmark projectKey={key} className="self-start text-3xl leading-none sm:text-4xl" />
    </div>
  );
}
