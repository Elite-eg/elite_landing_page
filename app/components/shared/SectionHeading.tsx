import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

export interface SectionHeadingProps {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  align?: "center" | "start";
  /** "dark" renders on navy backgrounds, "brand" on orange CTA backgrounds (white text). */
  tone?: "light" | "dark" | "brand";
  as?: "h1" | "h2";
  /** "compact" is the smaller 32px title used under busy heroes (e.g. book-session). */
  size?: "default" | "compact";
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<SectionHeadingProps["size"]>, { wrapper: string; heading: string }> = {
  default: {
    wrapper: "mb-12 sm:mb-14",
    heading: "text-3xl leading-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]",
  },
  compact: {
    wrapper: "mb-7",
    heading: "text-2xl leading-snug sm:text-[2rem]",
  },
};

/** The only way to render section titles (elite-design-rules.txt, "Typography"). */
export function SectionHeading({
  title,
  eyebrow,
  subtitle,
  align = "center",
  tone = "light",
  as: Heading = "h2",
  size = "default",
  className,
}: SectionHeadingProps) {
  const isDark = tone !== "light";

  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        SIZE_CLASSES[size].wrapper,
        align === "center" ? "mx-auto text-center" : "text-start",
        className
      )}
    >
      {eyebrow && (
        <Eyebrow tone={isDark ? "dark" : "light"} className="mb-4">
          {eyebrow}
        </Eyebrow>
      )}

      <Heading
        className={cn(
          "text-balance font-bold",
          SIZE_CLASSES[size].heading,
          isDark ? "text-white" : "text-primary"
        )}
      >
        {title}
      </Heading>

      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base leading-loose sm:text-lg",
            tone === "brand" ? "text-white/90" : isDark ? "text-white/75" : "text-content"
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
