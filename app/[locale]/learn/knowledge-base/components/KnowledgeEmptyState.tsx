import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { Button } from "@/app/components/shared/Button";
import { whatsappUrl } from "@/lib/constants";

export interface KnowledgeEmptyStateProps {
  query: string;
}

/** No article matches: ask support on WhatsApp, with the question prefilled. */
export function KnowledgeEmptyState({ query }: KnowledgeEmptyStateProps) {
  const t = useTranslations("learn.knowledgeBase.empty");

  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-edge bg-surface-alt px-6 py-12 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-surface-muted text-primary" aria-hidden="true">
        <FiSearch className="size-5" />
      </span>
      <h3 className="text-lg font-semibold text-body">{t("title")}</h3>
      <p className="max-w-md text-caption text-content">{t("text")}</p>
      <Button
        href={whatsappUrl(t("message", { query }))}
        external
        variant="outline"
        icon={<FaWhatsapp />}
        iconPosition="start"
        className="mt-2"
      >
        {t("action")}
      </Button>
    </div>
  );
}
