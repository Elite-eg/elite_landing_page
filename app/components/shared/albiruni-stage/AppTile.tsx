import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { AppTileTone, SuperAppTile } from "../data/albiruniData";

export interface AppTileProps {
  tile: SuperAppTile;
}

/** The Figma's app colors mapped to the closest design-system tokens. */
const TONE_CLASSES: Record<AppTileTone, string> = {
  albiruni: "bg-albiruni",
  accent: "bg-accent",
  warning: "bg-warning",
  secondaryDark: "bg-secondary-dark",
};

/** A mini app in the super app grid: colored icon tile, name and today's detail. */
export function AppTile({ tile: { key, icon: Icon, tone } }: AppTileProps) {
  const t = useTranslations(`albiruni.mockup.app.apps.${key}`);

  return (
    <li className="flex flex-col items-start gap-[5px] rounded-2xl border border-edge bg-surface p-3">
      <span className={cn("rounded-[10px] p-[6.5px] text-white", TONE_CLASSES[tone])}>
        <Icon className="size-[17px]" strokeWidth={2.6} />
      </span>
      <p className="text-[11.5px] font-medium">{t("name")}</p>
      <p className="text-[10px] text-content">{t("detail")}</p>
    </li>
  );
}
