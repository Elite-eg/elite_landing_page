import { useLocale, useTranslations } from "next-intl";
import { FiFile } from "react-icons/fi";
import type { AddonFile } from "@/lib/addons";
import { intlLocale } from "@/lib/locale";

export interface AddonFileCardProps {
  file: Pick<AddonFile, "name" | "sizeBytes">;
}

const MEGABYTE = 1024 * 1024;

/** A bought add-on's file (Figma "File"): file icon tile, file name, "Full source code · 6.4 MB". */
export function AddonFileCard({ file }: AddonFileCardProps) {
  const t = useTranslations("addons.file");
  const locale = useLocale();
  const size = new Intl.NumberFormat(intlLocale(locale), { maximumFractionDigits: 1 }).format(file.sizeBytes / MEGABYTE);

  return (
    <div className="flex items-center gap-3 rounded-xl border border-edge px-4 py-3.5">
      <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center rounded-xl bg-surface-alt text-primary">
        <FiFile className="size-5" />
      </span>
      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="text-[0.9375rem] font-medium text-body [overflow-wrap:anywhere]">{file.name}</p>
        <p className="text-caption text-content">{t("description", { size })}</p>
      </div>
    </div>
  );
}
