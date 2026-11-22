import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { COMMUNITY_EVENTS_ID, SAMPLE_COMMUNITY_EVENTS } from "../data/communityData";
import { EventRow } from "./EventRow";

/** "Upcoming events" on the grey band: one white row per event. Target of the monthly meetup tile. */
export function EventsSection() {
  const t = useTranslations("community.events");

  return (
    <section id={COMMUNITY_EVENTS_ID} className="bg-surface-alt py-20 sm:py-24">
      <Container>
        <SectionHeading title={t("title")} align="start" size="compact" headingClassName="text-body" className="mb-4" />

        <RevealGroup className="flex flex-col gap-4">
          {SAMPLE_COMMUNITY_EVENTS.map((event) => (
            <Reveal key={event.key} inGroup>
              <EventRow event={event} />
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
