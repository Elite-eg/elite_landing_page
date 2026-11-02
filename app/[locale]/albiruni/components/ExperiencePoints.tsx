import { FiCheck } from "react-icons/fi";
import { cn } from "@/lib/utils";
import type { ExperienceTone } from "../data/albiruniData";

export interface ExperiencePointsProps {
  points: string[];
  tone: ExperienceTone;
}

/** Orange checks on the navy card, green checks on the grey one. */
const TONE_CLASSES: Record<ExperienceTone, { text: string; check: string }> = {
  dark: { text: "text-navy-100", check: "text-secondary" },
  light: { text: "text-ink-700", check: "text-success" },
};

/** What an experience includes, one check per line. */
export function ExperiencePoints({ points, tone }: ExperiencePointsProps) {
  const styles = TONE_CLASSES[tone];

  return (
    <ul className="flex flex-col gap-3">
      {points.map((point) => (
        <li key={point} className={cn("flex items-start gap-2.5 leading-snug", styles.text)}>
          <FiCheck aria-hidden="true" strokeWidth={3} className={cn("mt-0.5 size-[1.125rem] shrink-0", styles.check)} />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  );
}
