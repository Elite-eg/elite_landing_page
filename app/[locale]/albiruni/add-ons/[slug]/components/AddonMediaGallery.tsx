"use client";

import { useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { FiImage, FiPlay } from "react-icons/fi";
import type { AddonMedia } from "@/lib/addons";
import { formatDuration } from "@/lib/duration";
import { AddonMediaFrame } from "./AddonMediaFrame";

export interface AddonMediaGalleryProps {
  media: AddonMedia[];
}

/** Intro video and screenshots (Figma "Media"): the chosen item large with its caption, thumbnails to switch below. */
export function AddonMediaGallery({ media }: AddonMediaGalleryProps) {
  const t = useTranslations("addons.details.media");
  const [selected, setSelected] = useState(0);
  const screenshotCount = media.filter((item) => item.kind === "image").length;

  /** "Intro video", or "Screenshot 2" (screenshots are numbered on their own). */
  const describe = (index: number) => {
    const item = media[index];
    if (item?.kind === "video") return t("videoCaption", { duration: formatDuration(item.duration) });
    const number = media.slice(0, index + 1).filter((entry) => entry.kind === "image").length;
    return t("screenshotCaption", { index: number, count: screenshotCount });
  };

  const current = media[selected];
  if (!current) return null;

  return (
    <div className="flex flex-col gap-3">
      <AddonMediaFrame item={current} />
      <p aria-live="polite" className="text-caption text-content">
        {describe(selected)}
      </p>

      {media.length > 1 && (
        <RadioGroup value={selected} onChange={setSelected} aria-label={t("choose")} className="grid grid-cols-4 gap-2 sm:gap-3">
          {media.map((item, index) => (
            <Radio
              key={index}
              value={index}
              aria-label={describe(index)}
              className="grid h-16 cursor-pointer place-items-center rounded-xl border border-edge bg-surface-alt text-ink-400 transition-colors duration-200 hover:border-primary/30 data-[checked]:border-secondary data-[checked]:ring-1 data-[checked]:ring-inset data-[checked]:ring-secondary sm:h-[6.25rem]"
            >
              {item.kind === "video" ? <FiPlay className="size-5" aria-hidden="true" /> : <FiImage className="size-5" aria-hidden="true" />}
            </Radio>
          ))}
        </RadioGroup>
      )}
    </div>
  );
}
