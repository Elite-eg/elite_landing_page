import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { CompareTable } from "./CompareTable";

/** "Compare plans" (Figma "Compare plans"): start-aligned title over the comparison table. */
export function ComparePlansSection() {
  const t = useTranslations("albiruniPricing.compare");

  return (
    <section className="bg-surface py-20 sm:py-24">
      <Container>
        <SectionHeading title={t("title")} size="compact" align="start" headingClassName="text-body" />
        <Reveal>
          <CompareTable />
        </Reveal>
      </Container>
    </section>
  );
}
