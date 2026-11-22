import { COMMUNITY_WHATSAPP_GROUP_URL, ROUTES } from "@/lib/constants";

/** Anchor of the upcoming events list (id set in EventsSection). */
export const COMMUNITY_EVENTS_ID = "events";

export interface CommunityChannel {
  /** Copy in `community.channels.items.<key>`. */
  key: "whatsappGroup" | "monthlyMeetup" | "knowledgeBase";
  href: string;
  external?: boolean;
}

/** "Join via the channel that suits you" tiles, in reading order. */
export const COMMUNITY_CHANNELS: readonly CommunityChannel[] = [
  { key: "whatsappGroup", href: COMMUNITY_WHATSAPP_GROUP_URL, external: true },
  { key: "monthlyMeetup", href: `${ROUTES.community}#${COMMUNITY_EVENTS_ID}` },
  { key: "knowledgeBase", href: ROUTES.learn.knowledgeBase },
];

export interface CommunityEvent {
  /** Title in `community.events.items.<key>`. */
  key: string;
  /** Calendar day (YYYY-MM-DD), formatted in APP_TIME_ZONE. */
  date: string;
  /** Label in `community.events.places.<place>`. */
  place: "online" | "cairo";
}

/** DRAFT SAMPLE / TBD: the events shown in the Figma, until the real community calendar exists. */
export const SAMPLE_COMMUNITY_EVENTS: readonly CommunityEvent[] = [
  { key: "custodyWorkshop", date: "2026-10-29", place: "online" },
  { key: "fieldSalesMeetup", date: "2026-11-12", place: "cairo" },
  { key: "eInvoicingQa", date: "2026-11-26", place: "online" },
];
