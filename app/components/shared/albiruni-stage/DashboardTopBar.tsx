import Image from "next/image";
import { useTranslations } from "next-intl";
import { FiBell } from "react-icons/fi";
import { MEDIA } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { DASHBOARD_NAV } from "../data/albiruniData";

/** Dashboard header: Albiruni mark, module tabs (the first one active), then notifications and the user's initials. */
export function DashboardTopBar() {
  const t = useTranslations("albiruni.mockup.dashboard");

  return (
    <div className="flex items-center gap-[13px] border-b border-edge/60 bg-surface px-3.5 py-2.5">
      <p className="flex items-center gap-2 font-heading text-base font-semibold text-albiruni">
        {t("brand")}
        <Image src={MEDIA.albiruniMark} alt="" width={21} height={21} />
      </p>

      <ul className="flex gap-0.5 text-xs">
        {DASHBOARD_NAV.map((key, index) => (
          <li
            key={key}
            className={cn("rounded-lg px-2 py-1.5", index === 0 ? "bg-surface-alt font-medium text-albiruni" : "text-ink-700")}
          >
            {t(`nav.${key}`)}
          </li>
        ))}
      </ul>

      <span className="flex-1" />
      <FiBell className="size-[17px] text-content" />
      <span className="rounded-full bg-albiruni/15 p-1.5 text-[10.5px] font-medium text-albiruni">{t("avatar")}</span>
    </div>
  );
}
