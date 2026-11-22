import { useTranslations } from "next-intl";
import { APP_COUNTERS, SUPER_APP_TILES } from "./stageData";
import { AppTabBar } from "./AppTabBar";
import { AppTile } from "./AppTile";
import { AttendanceCard } from "./AttendanceCard";

/** Status bar dots (signal). */
const SIGNAL_DOTS = [0, 1, 2];

/**
 * The Albiruni super app on a phone (Figma "Mobile · Super app"): greeting, attendance, today's counters, the mini
 * apps and the tab bar. The Albiruni platform hero crops the phone above its tab bar; the home hero shows all of it.
 * Labels stay on one line (an ellipsis if a translation is too long), and only the apps grid may give way, under the
 * tab bar like a scrolled list, so the screen fits in both languages.
 */
export function SuperAppMockup() {
  const t = useTranslations("albiruni.mockup.app");

  return (
    <div className="relative h-[624px] w-[307px] rounded-[49px] border-2 border-navy-700 bg-primary-deep shadow-widget">
      <div className="absolute inset-[7px] flex flex-col items-start gap-3 overflow-hidden rounded-[40px] bg-surface-alt p-4 leading-tight text-body">
        <div className="flex w-full items-center justify-between">
          <span className="text-[11.5px] font-medium">{t("clock")}</span>
          <span className="h-[21px] w-[75px] rounded-[13px] bg-primary-deep" />
          <span className="flex gap-0.5">
            {SIGNAL_DOTS.map((dot) => (
              <span key={dot} className="size-[3px] rounded-full bg-body" />
            ))}
          </span>
        </div>

        <div className="flex max-w-full items-center gap-2.5">
          <div className="min-w-0">
            <p className="truncate font-heading text-[15px] font-semibold">{t("greeting")}</p>
            <p className="truncate text-[10.5px] text-content">{t("company")}</p>
          </div>
          <span className="rounded-full bg-albiruni/15 p-2 text-[11.5px] font-medium text-albiruni">{t("avatar")}</span>
        </div>

        <AttendanceCard />

        <ul className="grid w-full grid-cols-3 gap-2">
          {APP_COUNTERS.map((key) => (
            <li key={key} className="min-w-0 rounded-[13px] border border-edge bg-surface px-2.5 py-2">
              <p className="font-heading text-[15.5px] font-bold">{t(`counters.${key}.value`)}</p>
              <p className="truncate text-[10px] text-content">{t(`counters.${key}.label`)}</p>
            </li>
          ))}
        </ul>

        <p className="font-heading text-[14.5px] font-semibold">{t("appsTitle")}</p>
        <ul className="grid min-h-0 w-full grid-cols-2 gap-2 overflow-hidden">
          {SUPER_APP_TILES.map((tile) => (
            <AppTile key={tile.key} tile={tile} />
          ))}
        </ul>

        <AppTabBar />
      </div>
    </div>
  );
}
