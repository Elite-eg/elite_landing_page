import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { TeamPanel as TeamPanelData } from "../data/homeData";
import { TeamPoint } from "./TeamPoint";

export interface TeamPanelProps {
  panel: TeamPanelData;
}

/** Half of the team split (Figma "Half"): operations experts on white, developers on the navy gradient. */
export function TeamPanel({ panel: { key, tone, points } }: TeamPanelProps) {
  const t = useTranslations(`home.team.panels.${key}`);
  const isDark = tone === "dark";

  return (
    <article
      className={cn(
        "flex h-full flex-col gap-4 rounded-3xl p-6 sm:p-9",
        isDark ? "bg-gradient-to-br from-primary to-primary-dark shadow-lift" : "border border-edge bg-surface"
      )}
    >
      <h3 className={cn("text-h3 font-bold", isDark ? "text-white" : "text-body")}>{t("title")}</h3>
      <p className={cn("text-caption sm:text-base", isDark ? "text-content-dark" : "text-content")}>{t("description")}</p>
      <ul className="mt-1 flex flex-col gap-3.5">
        {points.map(({ key: point, icon }) => (
          <TeamPoint
            key={point}
            icon={icon}
            title={t(`points.${point}.title`)}
            description={t(`points.${point}.description`)}
            tone={tone}
          />
        ))}
      </ul>
    </article>
  );
}
