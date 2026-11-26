import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { cn } from "@/lib/utils";
import { lineBreak } from "../utils/richText";
import { SECTION_TITLE_LEADING } from "@/app/components/shared/sectionTitleClasses";
import { PricingTeaser } from "./PricingTeaser";

/** "Choose your sector, and pay for the size of your team" (Figma "Store teaser"). */
export function PricingTeaserSection() {
  const t = useTranslations("home.pricing");

  return (
    <section className="bg-surface-alt py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t.rich("title", { br: lineBreak })}
          headingClassName={cn("text-body", SECTION_TITLE_LEADING)}
          className="mb-10 max-w-4xl sm:mb-10"
        />
        <PricingTeaser />
      </Container>
    </section>
  );
}
