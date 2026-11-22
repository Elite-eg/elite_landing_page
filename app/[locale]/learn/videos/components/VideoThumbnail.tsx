import { FiPlay } from "react-icons/fi";
import { LEARN_TOPIC_ICONS, type LearnTopic } from "@/app/components/shared/learn/learnData";

export interface VideoThumbnailProps {
  topic: LearnTopic;
}

/**
 * Code-drawn video frame (navy gradient + dot grid + soft glow, like the guide cover): the topic's icon large and
 * faint, a play mark in the middle. Decorative: the card title names the video.
 */
export function VideoThumbnail({ topic }: VideoThumbnailProps) {
  const TopicIcon = LEARN_TOPIC_ICONS[topic];

  return (
    <div
      className="relative isolate grid aspect-video place-items-center overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-primary-deep"
      aria-hidden="true"
    >
      <div className="absolute inset-0 -z-10 bg-dot-grid-light opacity-40" />
      <div className="absolute -end-12 -top-12 -z-10 size-40 rounded-full bg-accent/40 blur-3xl" />
      <TopicIcon className="absolute -bottom-4 start-4 -z-10 size-24 text-white/[0.07]" />

      {/* The play mark points right in both languages, like any media control (nudged right to look centred). */}
      <span className="grid size-14 place-items-center rounded-full bg-white/95 text-primary shadow-lift">
        <FiPlay className="size-6 translate-x-0.5 fill-current" />
      </span>
    </div>
  );
}
