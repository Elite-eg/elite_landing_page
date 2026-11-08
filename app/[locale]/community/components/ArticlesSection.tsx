import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { SAMPLE_FIELD_ARTICLES } from "../data/communityData";
import { CommunityTile } from "./CommunityTile";

/** "From the field": three article teasers with their reading time. */
export function ArticlesSection() {
  const t = useTranslations("community.articles");

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading title={t("title")} align="start" size="compact" headingClassName="text-body" className="mb-8" />

        <RevealGroup className="grid gap-4 md:grid-cols-3">
          {SAMPLE_FIELD_ARTICLES.map(({ key, type, minutes }) => (
            <Reveal key={key} inGroup>
              <CommunityTile title={t(`items.${key}`)} text={t(`meta.${type}`, { minutes })} />
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
