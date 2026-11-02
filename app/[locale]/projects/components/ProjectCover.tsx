import type { ReactNode } from "react";
import { PhoneMockup } from "@/app/components/shared/PhoneMockup";
import { Reveal } from "@/app/components/shared/Reveal";
import { cn } from "@/lib/utils";
import type { Project, ProjectCoverTone, ProjectMockup } from "../data/projectsData";
import { DashboardMockup } from "./DashboardMockup";
import { ProjectCoverPhoto } from "./ProjectCoverPhoto";

export interface ProjectCoverProps {
  cover: Project["cover"];
  /** The client's Latin wordmark: LTR text, so it sits top left in both languages. */
  wordmark: string;
  priority?: boolean;
  className?: string;
}

const TONE_CLASSES: Record<ProjectCoverTone, string> = {
  bareeq: "from-bareeq from-15% to-bareeq-950 to-85%",
  navy: "from-primary from-15% to-primary-dark to-85%",
  midnight: "from-primary-dark to-primary-deep to-70%",
};

/** Sizes follow the Figma screens (153 / 170 px phones, a 420 px dashboard) and shrink with the cover. */
const MOCKUPS: Record<ProjectMockup, { layout: string; screens: ReactNode }> = {
  /** Two app screens; the smaller one on the start side (as on the Bareeq X case study). */
  phones: {
    layout: "items-end gap-2.5 pb-4 pt-8",
    screens: (
      <>
        <PhoneMockup className="w-[30%] max-w-[9.5625rem]" />
        <PhoneMockup className="w-[33.5%] max-w-[10.625rem]" />
      </>
    ),
  },
  dashboard: {
    layout: "items-center px-6 pb-10 pt-6",
    screens: <DashboardMockup className="w-[83%] max-w-[26.25rem]" />,
  },
};

/**
 * Decorative project cover: tone gradient over the project's photo (when it has one), wordmark,
 * and code-drawn screens that rise in after the card.
 */
export function ProjectCover({ cover: { tone, mockup, image }, wordmark, priority, className }: ProjectCoverProps) {
  const { layout, screens } = MOCKUPS[mockup];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative isolate flex min-h-72 flex-col overflow-hidden bg-gradient-to-br sm:min-h-96 lg:min-h-[32.5rem]",
        TONE_CLASSES[tone],
        className
      )}
    >
      {image && <ProjectCoverPhoto src={image} priority={priority} />}

      <p dir="ltr" className="px-6 pt-6 font-logo text-2xl font-semibold text-white sm:px-8 sm:pt-10 sm:text-3xl">
        {wordmark}
      </p>

      <Reveal delay={0.3} className={cn("flex flex-1 justify-center", layout)}>
        {screens}
      </Reveal>
    </div>
  );
}
