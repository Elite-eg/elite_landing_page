"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatedHeight } from "@/app/components/shared/AnimatedHeight";
import { Container } from "@/app/components/shared/Container";
import { LearnHero } from "@/app/components/shared/learn/LearnHero";
import { Reveal } from "@/app/components/shared/Reveal";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { SAMPLE_KNOWLEDGE_TOPICS } from "../data/knowledgeBaseData";
import { searchKnowledgeBase, type SearchableTopic } from "../utils/searchKnowledgeBase";
import { KnowledgeEmptyState } from "./KnowledgeEmptyState";
import { KnowledgeSearch } from "./KnowledgeSearch";
import { KnowledgeTopicCard } from "./KnowledgeTopicCard";

/**
 * Hero with the search box, and the topic cards it narrows: while searching, only topics with matching articles
 * stay, each listing just those articles; no match shows the WhatsApp fallback. The height follows the results, so
 * the sections below glide.
 */
export function KnowledgeBaseExplorer() {
  const t = useTranslations("learn");
  const [query, setQuery] = useState("");

  const topics: SearchableTopic[] = SAMPLE_KNOWLEDGE_TOPICS.map(({ key, articles }) => ({
    key,
    name: t(`topics.${key}`),
    articles: articles.map((article) => ({
      key: article,
      title: t(`knowledgeBase.topics.items.${key}.articles.${article}`),
    })),
  }));
  const trimmedQuery = query.trim();
  const results = searchKnowledgeBase(topics, trimmedQuery);
  const resultCount = results.reduce((sum, topic) => sum + topic.articles.length, 0);

  return (
    <>
      <LearnHero
        eyebrow={t("knowledgeBase.hero.eyebrow")}
        title={t("knowledgeBase.hero.title")}
        subtitle={t("knowledgeBase.hero.subtitle")}
      >
        <KnowledgeSearch value={query} onChange={setQuery} />
      </LearnHero>

      <section className="pb-20 pt-4 sm:pb-24">
        <Container>
          <SectionHeading
            title={trimmedQuery ? t("knowledgeBase.topics.resultsTitle", { query: trimmedQuery }) : t("knowledgeBase.topics.title")}
            align="start"
            size="compact"
            headingClassName="text-body"
            className="mb-8"
          />

          {/* Screen readers hear how many articles match after each change of the query. */}
          <p className="sr-only" aria-live="polite">
            {trimmedQuery && t("knowledgeBase.topics.resultsCount", { count: resultCount })}
          </p>

          <AnimatedHeight className="-mb-8">
            <div className="pb-8">
              {results.length > 0 ? (
                <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {results.map((topic) => (
                    <li key={topic.key}>
                      <Reveal className="h-full">
                        <KnowledgeTopicCard topic={topic} />
                      </Reveal>
                    </li>
                  ))}
                </ul>
              ) : (
                <KnowledgeEmptyState query={trimmedQuery} />
              )}
            </div>
          </AnimatedHeight>
        </Container>
      </section>
    </>
  );
}
