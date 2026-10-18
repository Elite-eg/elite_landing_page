import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { ABOUT_STATEMENTS } from "../data/aboutData";
import { StatementCard } from "./StatementCard";

export function StatementsSection() {
  const t = useTranslations("about.statements");

  return (
    <section aria-label={t("label")} className="bg-surface pb-20 sm:pb-24">
      <Container>
        <RevealGroup className="grid gap-6 lg:grid-cols-2">
          {ABOUT_STATEMENTS.map(({ key, tone }) => (
            <Reveal key={key} inGroup>
              <StatementCard
                tone={tone}
                label={t(`${key}.label`)}
                title={t(`${key}.title`)}
                text={t(`${key}.text`)}
              />
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
