import { useTranslations } from "next-intl";
import { FiClock } from "react-icons/fi";
import { Badge } from "@/app/components/shared/Badge";
import { CARD_HOVER_CLASSES } from "@/app/components/shared/cardStyles";
import type { Article } from "@/app/components/shared/learn/learnData";
import { cn } from "@/lib/utils";

export interface ArticleCardProps {
  article: Article;
}

/** One article (the community "Tile", with more room): topic, title, excerpt, then type and reading time. */
export function ArticleCard({ article: { key, topic, type, minutes } }: ArticleCardProps) {
  const t = useTranslations("learn");

  return (
    <article
      className={cn(
        "flex h-full flex-col items-start gap-3 rounded-2xl border border-edge bg-surface p-7 hover:border-primary/20",
        CARD_HOVER_CLASSES
      )}
    >
      <Badge variant="primary" size="sm">
        {t(`topics.${topic}`)}
      </Badge>
      <h3 className="text-lg font-semibold leading-snug text-body">{t(`articles.items.${key}.title`)}</h3>
      <p className="text-caption text-content">{t(`articles.items.${key}.excerpt`)}</p>
      <p className="mt-auto flex items-center gap-1.5 pt-2 text-xs font-medium text-secondary-dark">
        <FiClock className="size-3.5 shrink-0" aria-hidden="true" />
        {t(`articles.types.${type}`, { minutes })}
      </p>
    </article>
  );
}
