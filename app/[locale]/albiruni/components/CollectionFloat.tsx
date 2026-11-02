import { useTranslations } from "next-intl";
import { FiCreditCard } from "react-icons/fi";

/**
 * Today's collections under the dashboard (Figma "Float/Collection").
 * Feather has no wallet (the Figma's Lucide icon), so it uses the card glyph.
 */
export function CollectionFloat() {
  const t = useTranslations("albiruni.mockup.floats.collection");

  return (
    <div className="flex flex-col items-start gap-[5px] whitespace-nowrap rounded-[21px] bg-surface px-[18px] py-4 leading-tight shadow-widget">
      <p className="flex items-center gap-2 text-[13.5px] text-content">
        {t("label")}
        <FiCreditCard className="size-[17px] text-albiruni" />
      </p>
      <div className="flex items-end gap-2.5">
        <p className="font-heading text-[23.5px] font-bold text-body">{t("value")}</p>
        <span className="rounded-full bg-success/10 px-2 py-[2.5px] text-xs font-medium text-success">{t("trend")}</span>
      </div>
    </div>
  );
}
