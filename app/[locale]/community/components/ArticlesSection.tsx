import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { SAMPLE_ARTICLES } from "@/app/components/shared/learn/learnData";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { CommunityTile } from "./CommunityTile";

const COMMUNITY_ARTICLES = SAMPLE_ARTICLES.filter((article) => article.community);

/** "From the field": three article teasers with their reading time (articles from the learning library). */
export function ArticlesSection() {
  const t = useTranslations("community.articles");
  const tArticles = useTranslations("learn.articles");

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading title={t("title")} align="start" size="compact" headingClassName="text-body" className="mb-8" />

        <RevealGroup className="grid gap-4 md:grid-cols-3">
          {COMMUNITY_ARTICLES.map(({ key, type, minutes }) => (
            <Reveal key={key} inGroup>
              <CommunityTile title={tArticles(`items.${key}.title`)} text={tArticles(`types.${type}`, { minutes })} />
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
