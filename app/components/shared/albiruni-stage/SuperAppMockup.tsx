import { useTranslations } from "next-intl";
import { APP_COUNTERS, SUPER_APP_TILES } from "../data/albiruniData";
import { AppTile } from "./AppTile";
import { AttendanceCard } from "./AttendanceCard";

/** Status bar dots (signal). */
const SIGNAL_DOTS = [0, 1, 2];

/**
 * The Albiruni super app on a phone (Figma "Mobile · Super app"): greeting, attendance, today's counters and the
 * mini apps. The hero fades out across the lower part of the phone, so its tab bar is never visible and isn't drawn.
 */
export function SuperAppMockup() {
  const t = useTranslations("albiruni.mockup.app");

  return (
    <div className="relative h-[624px] w-[307px] rounded-[49px] border-2 border-navy-700 bg-primary-deep shadow-widget">
      <div className="absolute inset-[7px] flex flex-col items-start gap-[13px] overflow-hidden rounded-[40px] bg-surface-alt p-4 leading-tight text-body">
        <div className="flex w-full items-center justify-between">
          <span className="text-[11.5px] font-medium">{t("clock")}</span>
          <span className="h-[21px] w-[75px] rounded-[13px] bg-primary-deep" />
          <span className="flex gap-0.5">
            {SIGNAL_DOTS.map((dot) => (
              <span key={dot} className="size-[3px] rounded-full bg-body" />
            ))}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <div>
            <p className="font-heading text-[15px] font-semibold">{t("greeting")}</p>
            <p className="text-[10.5px] text-content">{t("company")}</p>
          </div>
          <span className="rounded-full bg-albiruni/15 p-2 text-[11.5px] font-medium text-albiruni">{t("avatar")}</span>
        </div>

        <AttendanceCard />

        <ul className="grid w-full grid-cols-3 gap-2">
          {APP_COUNTERS.map((key) => (
            <li key={key} className="rounded-[13px] border border-edge bg-surface px-2.5 py-[9px]">
              <p className="font-heading text-[15.5px] font-bold">{t(`counters.${key}.value`)}</p>
              <p className="text-[10px] text-content">{t(`counters.${key}.label`)}</p>
            </li>
          ))}
        </ul>

        <p className="font-heading text-[14.5px] font-semibold">{t("appsTitle")}</p>
        <ul className="grid w-full grid-cols-2 gap-2">
          {SUPER_APP_TILES.map((tile) => (
            <AppTile key={tile.key} tile={tile} />
          ))}
        </ul>
      </div>
    </div>
  );
}
