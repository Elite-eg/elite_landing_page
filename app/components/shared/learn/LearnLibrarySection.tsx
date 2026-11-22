import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { LEARN_NAV_ITEMS } from "@/lib/constants";
import { LearnLibraryCard } from "./LearnLibraryCard";

export interface LearnLibrarySectionProps {
  /** Route of the page showing the section; its own resource is left out. */
  current: string;
}

/** "More from the learning library" on the grey band: the other resources of the footer's learn group. */
export function LearnLibrarySection({ current }: LearnLibrarySectionProps) {
  const t = useTranslations("learn.library");
  const items = LEARN_NAV_ITEMS.filter((item) => item.href !== current);

  return (
    <section className="bg-surface-alt py-20 sm:py-24">
      <Container>
        <SectionHeading title={t("title")} align="start" size="compact" headingClassName="text-body" className="mb-8" />

        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {items.map((item) => (
            <Reveal key={item.href} inGroup className="h-full">
              <LearnLibraryCard item={item} />
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
