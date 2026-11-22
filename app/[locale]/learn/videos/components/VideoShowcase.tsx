"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { LearnCardGrid } from "@/app/components/shared/learn/LearnCardGrid";
import { LearnHero } from "@/app/components/shared/learn/LearnHero";
import { TopicFilter } from "@/app/components/shared/learn/TopicFilter";
import { useTopicFilter } from "@/app/components/shared/learn/useTopicFilter";
import { SAMPLE_VIDEOS } from "../data/videosData";
import { VideoCard } from "./VideoCard";

/** Hero with the topic filter, and the video grid it filters. */
export function VideoShowcase() {
  const t = useTranslations("learn.videos");
  const filter = useTopicFilter(SAMPLE_VIDEOS);

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
            getKey={(video) => video.key}
            renderItem={(video) => <VideoCard video={video} />}
            className="sm:grid-cols-2 lg:grid-cols-3"
          />
        </Container>
      </section>
    </>
  );
}
