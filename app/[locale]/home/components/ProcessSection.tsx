import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { cn } from "@/lib/utils";
import { PROCESS_STEPS } from "../data/homeData";
import { lineBreak } from "../utils/richText";
import { SECTION_TITLE_LEADING } from "@/app/components/shared/sectionTitleClasses";
import { ProcessStep } from "./ProcessStep";

/**
 * "From a free session to full operation" (Figma "Process"): title with its subtitle under it on the start side, then
 * four numbered steps on one orange line, across the row from lg (the line runs on past the last step: support is
 * ongoing), down the start side below that.
 */
export function ProcessSection() {
  const t = useTranslations("home.process");

  return (
    <section className="bg-surface-alt py-20 sm:py-24 lg:pb-28">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t.rich("title", { br: lineBreak })}
          subtitle={t("subtitle")}
          align="start"
          headingClassName={cn("text-body", SECTION_TITLE_LEADING)}
          className="mb-10 max-w-4xl sm:mb-11 lg:mb-14"
        />

        <RevealGroup className="relative">
          <span
            className="absolute bottom-0 start-[1.625rem] top-0 w-0.5 bg-secondary/60 lg:bottom-auto lg:end-20 lg:top-[1.625rem] lg:h-0.5 lg:w-auto"
            aria-hidden="true"
          />
          <ol className="relative grid gap-9 lg:grid-cols-4 lg:gap-x-[3.75rem]">
            {PROCESS_STEPS.map((step, index) => (
              <ProcessStep key={step} step={step} index={index} />
            ))}
          </ol>
        </RevealGroup>
      </Container>
    </section>
  );
}
