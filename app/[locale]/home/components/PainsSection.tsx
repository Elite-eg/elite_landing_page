import { useTranslations } from "next-intl";
import { FiArrowRight } from "react-icons/fi";
import { Button } from "@/app/components/shared/Button";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { ROUTES } from "@/lib/constants";
import { APP_SURFACES, PAIN_POINTS } from "../data/homeData";
import { lineBreak } from "../utils/richText";
import { PainCard } from "./PainCard";
import { SplitSectionHeader } from "./SplitSectionHeader";
import { SurfaceChip } from "./SurfaceChip";

/** "Problems every field company faces, and how Albiruni solves them" (Figma "Pain → Solution"). */
export function PainsSection() {
  const t = useTranslations("home.pains");

  return (
    <section className="bg-surface py-20 sm:py-24 lg:py-28">
      <Container>
        <SplitSectionHeader
          eyebrow={t("eyebrow")}
          title={t.rich("title", { br: lineBreak })}
          aside={
            <ul className="flex flex-wrap gap-1.5">
              {APP_SURFACES.map((surface) => (
                <SurfaceChip key={surface} surface={surface} label={t(`legend.${surface}`)} size="md" />
              ))}
            </ul>
          }
        />

        <RevealGroup className="grid gap-4 lg:grid-cols-2">
          {PAIN_POINTS.map((pain) => (
            <Reveal key={pain.key} inGroup className="h-full">
              <PainCard pain={pain} />
            </Reveal>
          ))}
        </RevealGroup>

        <Reveal className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button href={ROUTES.albiruni.trial} variant="secondary" icon={<FiArrowRight />} flipIconInRtl>
            {t("trial")}
          </Button>
          <Button
            href={ROUTES.bookSession}
            variant="text"
            icon={<FiArrowRight />}
            flipIconInRtl
            className="text-secondary-dark hover:text-primary"
          >
            {t("session")}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
