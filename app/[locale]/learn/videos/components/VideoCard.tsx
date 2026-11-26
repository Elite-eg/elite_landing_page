import { useTranslations } from "next-intl";
import { CARD_HOVER_CLASSES } from "@/app/components/shared/cardStyles";
import { cn } from "@/lib/utils";
import type { TutorialVideo } from "../data/videosData";
import { formatDuration, isoDuration } from "@/lib/duration";
import { VideoThumbnail } from "./VideoThumbnail";

export interface VideoCardProps {
  video: TutorialVideo;
}

/** One tutorial: code-drawn frame with its length, then topic and title. */
export function VideoCard({ video: { key, topic, duration } }: VideoCardProps) {
  const t = useTranslations("learn");

  return (
    <article
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-2xl border border-edge bg-surface hover:border-primary/20",
        CARD_HOVER_CLASSES
      )}
    >
      <div className="relative">
        <VideoThumbnail topic={topic} />
        <p className="absolute bottom-3 end-3 rounded-md bg-primary-deep/80 px-2 py-0.5 text-xs font-medium text-white">
          <span className="sr-only">{t("videos.lengthLabel")} </span>
          <time dateTime={isoDuration(duration)} dir="ltr">
            {formatDuration(duration)}
          </time>
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <p className="text-xs font-medium text-secondary-dark">{t(`topics.${topic}`)}</p>
        <h3 className="text-base font-semibold leading-snug text-body">{t(`videos.items.${key}`)}</h3>
      </div>
    </article>
  );
}
