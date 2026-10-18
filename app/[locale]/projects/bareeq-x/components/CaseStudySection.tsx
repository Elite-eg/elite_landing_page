import type { ReactNode } from "react";
import { Container } from "@/app/components/shared/Container";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

interface CaseStudySectionProps {
  /** Chapter label: challenge / solution / result. */
  eyebrow: string;
  title: string;
  children: ReactNode;
  /** "alt" = light grey band, used for the middle chapter. */
  tone?: "surface" | "alt";
  className?: string;
}

const TONE_CLASSES: Record<NonNullable<CaseStudySectionProps["tone"]>, string> = {
  surface: "bg-surface",
  alt: "bg-surface-alt",
};

/** One chapter of the case study: title column on the start side, content on the end side. */
export function CaseStudySection({ eyebrow, title, children, tone = "surface", className }: CaseStudySectionProps) {
  return (
    <section className={cn("py-20 sm:py-24", TONE_CLASSES[tone], className)}>
      <Container className="grid gap-8 lg:grid-cols-12 lg:gap-16">
        <SectionHeading eyebrow={eyebrow} title={title} align="start" size="compact" className="mb-0 lg:col-span-4" />
        <div className="lg:col-span-8">{children}</div>
      </Container>
    </section>
  );
}
