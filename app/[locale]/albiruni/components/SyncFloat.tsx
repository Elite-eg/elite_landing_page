import { useTranslations } from "next-intl";
import { FiCheck } from "react-icons/fi";

/** "Synced · updated a minute ago" pill above the dashboard (Figma "Float/Sync"). */
export function SyncFloat() {
  const t = useTranslations("albiruni.mockup.floats");

  return (
    <p className="flex items-center gap-2.5 whitespace-nowrap rounded-full bg-surface py-3 pe-4 ps-[18px] text-[15.5px] font-medium leading-tight text-body shadow-widget">
      <span className="rounded-full bg-success/10 p-[5px] text-success">
        <FiCheck className="size-4" strokeWidth={3} />
      </span>
      {t("sync")}
    </p>
  );
}
