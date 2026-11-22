import type { ReactNode } from "react";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { cn } from "@/lib/utils";
import { SECTION_TITLE_LEADING } from "../utils/titleClasses";

/** "split": aside on the end side from lg, bottoms aligned (Figma). "stacked": aside under the title at every size. */
export type HomeSectionHeaderLayout = "split" | "stacked";

const LAYOUT_CLASSES: Record<HomeSectionHeaderLayout, { wrapper: string; heading: string; aside: string }> = {
  split: {
    wrapper: "lg:flex-row lg:items-end lg:justify-between lg:gap-10",
    heading: "lg:flex-1",
    aside: "lg:max-w-[27.5rem] lg:shrink-0 lg:pb-1",
  },
  stacked: { wrapper: "", heading: "", aside: "" },
};

export interface HomeSectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  /** A paragraph, a link or chips: beside the title or under it, per `layout`. */
  aside: ReactNode;
  layout?: HomeSectionHeaderLayout;
  tone?: "light" | "dark";
  className?: string;
}

/** Home section header: eyebrow + title (the Figma's 135% leading, its own line breaks) and a short aside. */
export function HomeSectionHeader({ eyebrow, title, aside, layout = "split", tone = "light", className }: HomeSectionHeaderProps) {
  const classes = LAYOUT_CLASSES[layout];

  return (
    <div className={cn("mb-10 flex flex-col gap-5 sm:mb-11", classes.wrapper, className)}>
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        align="start"
        tone={tone}
        className={cn("mb-0 sm:mb-0 lg:max-w-none", classes.heading)}
        headingClassName={cn(SECTION_TITLE_LEADING, tone === "light" && "text-body")}
      />
      <div className={classes.aside}>{aside}</div>
    </div>
  );
}
