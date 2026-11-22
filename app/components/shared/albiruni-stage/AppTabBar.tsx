import { useTranslations } from "next-intl";
import { LuFingerprint } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { APP_TABS, type AppTabKey } from "./stageData";

/**
 * The super app's tab bar (Figma "Mobile · Super app", bottom): home (active), apps, the round check-in button
 * (fingerprint, Lucide: Feather has none; its cyan is white here like the attendance card), tasks, account.
 */
export function AppTabBar() {
  const t = useTranslations("albiruni.mockup.app.tabs");
  const tab = (key: AppTabKey) => (
    <span key={key} className={cn("whitespace-nowrap text-[10.5px]", key === "home" ? "font-medium text-albiruni" : "text-content")}>
      {t(key)}
    </span>
  );

  return (
    <div className="mt-auto flex w-full shrink-0 items-center justify-between gap-1.5 rounded-[23px] border border-edge bg-surface px-[13px] py-2">
      {APP_TABS.before.map(tab)}
      <span className="rounded-full bg-albiruni p-[11px] text-white">
        <LuFingerprint className="size-[21px]" />
      </span>
      {APP_TABS.after.map(tab)}
    </div>
  );
}
