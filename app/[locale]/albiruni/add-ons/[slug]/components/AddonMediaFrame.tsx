import { FiImage, FiPlay } from "react-icons/fi";
import type { AddonMedia } from "@/lib/addons";

export interface AddonMediaFrameProps {
  item: AddonMedia;
}

/**
 * The big frame of the gallery, drawn in code until add-ons have files: the intro video as a navy frame with a play
 * mark (Figma "Video"), a screenshot as a grey frame with an image mark. Decorative: the caption below names it.
 */
export function AddonMediaFrame({ item }: AddonMediaFrameProps) {
  if (item.kind === "video") {
    return (
      <div className="grid aspect-video place-items-center rounded-2xl bg-primary-dark" aria-hidden="true">
        {/* The play mark points right in both languages, like any media control (nudged right to look centred). */}
        <span className="grid size-[4.5rem] place-items-center rounded-full bg-surface text-primary-dark shadow-lift">
          <FiPlay className="size-7 translate-x-0.5 fill-current" />
        </span>
      </div>
    );
  }

  return (
    <div className="grid aspect-video place-items-center rounded-2xl border border-edge bg-surface-alt text-ink-400" aria-hidden="true">
      <FiImage className="size-10" />
    </div>
  );
}
