import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SECTION_TITLE_LEADING } from "./sectionTitleClasses";
import { SectionHeading } from "./SectionHeading";

/** "split": aside on the end side from lg, bottoms aligned (Figma). "stacked": aside under the title at every size. */
export type SectionHeadingWithAsideLayout = "split" | "stacked";

const LAYOUT_CLASSES: Record<SectionHeadingWithAsideLayout, { wrapper: string; heading: string; aside: string }> = {
  split: {
    wrapper: "lg:flex-row lg:items-end lg:justify-between lg:gap-10",
    heading: "lg:flex-1",
    aside: "lg:max-w-[27.5rem] lg:shrink-0 lg:pb-1",
  },
  stacked: { wrapper: "", heading: "", aside: "" },
};

export interface SectionHeadingWithAsideProps {
  eyebrow: string;
  title: ReactNode;
  /** A paragraph, a link or chips: beside the title or under it, per `layout`. */
  aside: ReactNode;
  layout?: SectionHeadingWithAsideLayout;
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Section header with a short aside: eyebrow + title (the Figma's 135% leading, its own line breaks) and a paragraph,
 * link or chips beside it or under it. Home sections, solutions sectors.
 */
export function SectionHeadingWithAside({
  eyebrow,
  title,
  aside,
  layout = "split",
  tone = "light",
  className,
}: SectionHeadingWithAsideProps) {
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
