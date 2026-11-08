import { CARD_HOVER_CLASSES } from "@/app/components/shared/cardStyles";
import { cn } from "@/lib/utils";
import { CommunityTileLink } from "./CommunityTileLink";

export interface CommunityTileProps {
  title: string;
  text: string;
  /** Turns the whole tile into a link. */
  href?: string;
  external?: boolean;
}

/** White tile with a title and one line of detail (Figma "Tile"): join channels and field articles. */
export function CommunityTile({ title, text, href, external }: CommunityTileProps) {
  return (
    <article
      className={cn(
        "relative flex h-full flex-col gap-2.5 rounded-2xl border border-edge bg-surface p-7 hover:border-primary/20",
        CARD_HOVER_CLASSES
      )}
    >
      <h3 className="text-lg font-semibold leading-snug text-body">
        {href ? (
          <CommunityTileLink href={href} external={external}>
            {title}
          </CommunityTileLink>
        ) : (
          title
        )}
      </h3>
      <p className="text-caption text-ink-700">{text}</p>
    </article>
  );
}
