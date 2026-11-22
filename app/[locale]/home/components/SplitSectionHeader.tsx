import type { ReactNode } from "react";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { cn } from "@/lib/utils";
import { SECTION_TITLE_LEADING } from "../utils/titleClasses";

export interface SplitSectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  /** Shown on the end side from lg (a paragraph, a link or chips), under the title below that. */
  aside: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}

/** Section title on the start side with a short aside on the end side, bottoms aligned (Figma section headers). */
export function SplitSectionHeader({ eyebrow, title, aside, tone = "light", className }: SplitSectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-5 sm:mb-11 lg:flex-row lg:items-end lg:justify-between lg:gap-10",
        className
      )}
    >
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        align="start"
        tone={tone}
        className="mb-0 sm:mb-0 lg:max-w-none lg:flex-1"
        headingClassName={cn(SECTION_TITLE_LEADING, tone === "light" && "text-body")}
      />
      <div className="lg:max-w-[27.5rem] lg:shrink-0 lg:pb-1">{aside}</div>
    </div>
  );
}
