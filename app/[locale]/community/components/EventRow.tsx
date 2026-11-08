import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/app/components/shared/Button";
import { CARD_HOVER_CLASSES } from "@/app/components/shared/cardStyles";
import { whatsappUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { CommunityEvent } from "../data/communityData";
import { formatEventDate } from "../utils/formatEventDate";

export interface EventRowProps {
  event: CommunityEvent;
}

/** One upcoming event (Figma "Event"): title, date · place, and "Register" on WhatsApp with the event prefilled. */
export function EventRow({ event }: EventRowProps) {
  const t = useTranslations("community.events");
  const title = t(`items.${event.key}`);
  const date = formatEventDate(event.date, useLocale());
  const titleId = `event-${event.key}-title`;

  return (
    <article
      className={cn(
        "flex flex-col gap-3 rounded-2xl border border-transparent bg-surface px-6 py-5 hover:border-edge md:flex-row md:items-center md:gap-6",
        CARD_HOVER_CLASSES
      )}
    >
      <h3 id={titleId} className="flex-1 text-lg font-semibold leading-snug text-body">
        {title}
      </h3>
      <p className="shrink-0 text-caption font-medium text-secondary-dark">
        {t("when", { date, place: t(`places.${event.place}`) })}
      </p>
      {/* aria-describedby: the three "Register" buttons stay distinguishable for screen readers. */}
      <Button
        href={whatsappUrl(t("registerMessage", { event: title, date }))}
        external
        variant="outline"
        aria-describedby={titleId}
        className="shrink-0 self-start md:self-center"
      >
        {t("register")}
      </Button>
    </article>
  );
}
