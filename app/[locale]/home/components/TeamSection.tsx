import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { cn } from "@/lib/utils";
import { TEAM_JOIN_ICON as JoinIcon, TEAM_PANELS } from "../data/homeData";
import { hardBreak, lineBreak } from "../utils/richText";
import { SECTION_TITLE_LEADING } from "../utils/titleClasses";
import { TeamPanel } from "./TeamPanel";

/**
 * "Our team is made of operations experts and developers" (Figma "Team"): the two halves side by side from lg,
 * joined in the middle by an orange disc ("a system that fits your procedures"); stacked below lg.
 */
export function TeamSection() {
  const t = useTranslations("home.team");
  const [first, second] = TEAM_PANELS;

  return (
    <section className="bg-surface-alt py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t.rich("title", { br: lineBreak })}
          subtitle={t("subtitle")}
          headingClassName={cn("text-body", SECTION_TITLE_LEADING)}
          className="max-w-4xl"
        />

        <div className="flex flex-col items-stretch gap-5 lg:flex-row lg:items-center lg:gap-0">
          <Reveal preset="slideInFromStart" className="lg:flex-1">
            <TeamPanel panel={first} />
          </Reveal>

          <Reveal preset="scaleIn" delay={0.2} className="flex flex-col items-center gap-2.5 lg:w-[7.25rem] lg:shrink-0">
            <span className="grid size-[3.875rem] place-items-center rounded-full bg-secondary shadow-glow" aria-hidden="true">
              <JoinIcon className="size-[1.625rem] text-white" />
            </span>
            <p className="text-center font-heading text-caption font-semibold leading-snug text-primary">
              {t.rich("join", { br: hardBreak })}
            </p>
          </Reveal>

          <Reveal preset="slideInFromEnd" className="lg:flex-1">
            <TeamPanel panel={second} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
