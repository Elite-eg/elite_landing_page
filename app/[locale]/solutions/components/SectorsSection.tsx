import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { SectionHeadingWithAside } from "@/app/components/shared/SectionHeadingWithAside";
import { SectorCard } from "@/app/components/shared/sectors/SectorCard";
import { SECTORS } from "@/app/components/shared/sectors/sectorsData";

/**
 * "Sectors ready today" (Figma "Industries · الحلول"): title with its note under it (owner request; the Figma puts the
 * note on the end side), then one card per sector (the same cards as the home page), each showing its workday at the
 * top of this page.
 */
export function SectorsSection() {
  const t = useTranslations("solutions.sectors");

  return (
    <section className="bg-surface-alt py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeadingWithAside
          layout="stacked"
          eyebrow={t("eyebrow")}
          title={t("title")}
          aside={
            <Reveal>
              <p className="max-w-prose leading-loose text-content sm:text-lg">{t("subtitle")}</p>
            </Reveal>
          }
        />

        <RevealGroup className="grid gap-5 md:grid-cols-3">
          {SECTORS.map((sector) => (
            <Reveal key={sector.key} inGroup className="h-full">
              <SectorCard sector={sector} />
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
