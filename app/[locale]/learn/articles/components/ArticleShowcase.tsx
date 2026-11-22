"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { LearnCardGrid } from "@/app/components/shared/learn/LearnCardGrid";
import { LearnHero } from "@/app/components/shared/learn/LearnHero";
import { SAMPLE_ARTICLES } from "@/app/components/shared/learn/learnData";
import { TopicFilter } from "@/app/components/shared/learn/TopicFilter";
import { useTopicFilter } from "@/app/components/shared/learn/useTopicFilter";
import { ArticleCard } from "./ArticleCard";

/** Hero with the topic filter, and the article grid it filters. */
export function ArticleShowcase() {
  const t = useTranslations("learn.articles");
  const filter = useTopicFilter(SAMPLE_ARTICLES);

  return (
    <>
      <LearnHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} subtitle={t("hero.subtitle")}>
        <TopicFilter options={filter.options} value={filter.value} onChange={filter.setValue} label={t("filterLabel")} />
      </LearnHero>

      <section aria-label={t("listLabel")} className="pb-20 pt-4 sm:pb-24">
        <Container>
          {/* Screen readers hear the new count after a filter change. */}
          <p className="sr-only" aria-live="polite">
            {t("resultsCount", { count: filter.items.length })}
          </p>

          <LearnCardGrid
            items={filter.items}
            filterKey={filter.value}
            getKey={(article) => article.key}
            renderItem={(article) => <ArticleCard article={article} />}
            className="md:grid-cols-2 lg:grid-cols-3"
          />
        </Container>
      </section>
    </>
  );
}
