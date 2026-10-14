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
  className?: string;
}

/** The only way to render section titles (elite-rules.txt §7). */
export function SectionHeading({
  title,
  eyebrow,
  subtitle,
  align = "center",
  tone = "light",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  const isDark = tone !== "light";

  return (
    <Reveal
      className={cn(
        "mb-12 max-w-2xl sm:mb-14",
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
          "text-balance text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]",
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
