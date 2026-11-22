import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";
import type { TeamPanelTone } from "../data/homeData";

export interface TeamPointProps {
  icon: IconType;
  title: string;
  description: string;
  tone: TeamPanelTone;
}

/** One area of expertise in a team panel: icon tile, title and what it covers. */
export function TeamPoint({ icon: Icon, title, description, tone }: TeamPointProps) {
  const isDark = tone === "dark";

  return (
    <li className={cn("flex items-center gap-3.5 rounded-2xl px-4 py-3.5", isDark ? "bg-white/[0.06]" : "bg-surface-alt")}>
      <span
        className={cn("grid size-9 shrink-0 place-items-center rounded-lg", isDark ? "bg-secondary" : "bg-primary")}
        aria-hidden="true"
      >
        <Icon className="size-[1.125rem] text-white" />
      </span>
      <div className="flex flex-col gap-0.5">
        <h4 className={cn("text-base font-semibold leading-snug", isDark ? "text-white" : "text-body")}>{title}</h4>
        <p className={cn("text-caption", isDark ? "text-content-dark" : "text-content")}>{description}</p>
      </div>
    </li>
  );
}
