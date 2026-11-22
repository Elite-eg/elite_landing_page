import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { cn } from "@/lib/utils";
import { HOME_SECTORS } from "../data/homeData";
import { lineBreak } from "../utils/richText";
import { SECTION_TITLE_LEADING } from "../utils/titleClasses";
import { SectorCard } from "./SectorCard";

/**
 * "Designed around how you work" (Figma "Industries"): title with its subtitle under it on the start side, then one
 * card per sector, each linking to its page.
 */
export function SectorsSection() {
  const t = useTranslations("home.sectors");

  return (
    <section className="bg-surface py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t.rich("title", { br: lineBreak })}
          subtitle={t("subtitle")}
          align="start"
          headingClassName={cn("text-body", SECTION_TITLE_LEADING)}
          className="mb-10 max-w-4xl sm:mb-11"
        />

        <RevealGroup className="grid gap-5 md:grid-cols-3">
          {HOME_SECTORS.map((sector) => (
            <Reveal key={sector.key} inGroup className="h-full">
              <SectorCard sector={sector} />
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
