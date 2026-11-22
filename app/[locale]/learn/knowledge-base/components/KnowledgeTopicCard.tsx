import { useTranslations } from "next-intl";
import { FiFileText } from "react-icons/fi";
import { CARD_HOVER_CLASSES } from "@/app/components/shared/cardStyles";
import { LEARN_TOPIC_ICONS } from "@/app/components/shared/learn/learnData";
import { cn } from "@/lib/utils";
import type { SearchableTopic } from "../utils/searchKnowledgeBase";

export interface KnowledgeTopicCardProps {
  topic: SearchableTopic;
}

/** A topic: icon tile (turns navy on hover) and article count, name, what it covers, then its articles. */
export function KnowledgeTopicCard({ topic: { key, name, articles } }: KnowledgeTopicCardProps) {
  const t = useTranslations("learn.knowledgeBase.topics");
  const Icon = LEARN_TOPIC_ICONS[key];

  return (
    <article
      className={cn(
        "group flex h-full flex-col gap-4 rounded-2xl border border-edge bg-surface p-6 hover:border-primary/20 sm:p-7",
        CARD_HOVER_CLASSES
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className="grid size-11 place-items-center rounded-xl bg-surface-muted text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white"
          aria-hidden="true"
        >
          <Icon className="size-5" />
        </span>
        <p className="text-xs font-medium text-content">{t("articlesCount", { count: articles.length })}</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="text-lg font-semibold leading-snug text-body">{name}</h3>
        <p className="text-caption text-content">{t(`items.${key}.description`)}</p>
      </div>

      <ul className="mt-auto flex flex-col border-t border-edge/60 pt-2">
        {articles.map((article) => (
          <li key={article.key} className="flex items-start gap-2.5 py-2 text-caption text-ink-700">
            <FiFileText className="mt-1 size-4 shrink-0 text-navy-300" aria-hidden="true" />
            {article.title}
          </li>
        ))}
      </ul>
    </article>
  );
}
