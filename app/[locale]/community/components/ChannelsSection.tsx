import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { COMMUNITY_CHANNELS } from "../data/communityData";
import { CommunityTile } from "./CommunityTile";

/** "Join via the channel that suits you": three linked tiles (WhatsApp group, monthly meetup, knowledge base). */
export function ChannelsSection() {
  const t = useTranslations("community.channels");

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading title={t("title")} align="start" size="compact" headingClassName="text-body" className="mb-8" />

        <RevealGroup className="grid gap-4 md:grid-cols-3">
          {COMMUNITY_CHANNELS.map(({ key, href, external }) => (
            <Reveal key={key} inGroup>
              <CommunityTile
                title={t(`items.${key}.title`)}
                text={t(`items.${key}.text`)}
                href={href}
                external={external}
              />
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
