import { useTranslations } from "next-intl";
import { Container } from "./Container";
import { NewsletterForm } from "./NewsletterForm";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/** Navy closing band (the page's one bold moment): monthly newsletter sign-up. Community and articles pages. */
export function NewsletterSection() {
  const t = useTranslations("newsletterSection");

  return (
    <section className="bg-primary-dark py-20">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} tone="dark" size="compact" className="mb-8" />

        <Reveal className="mx-auto max-w-lg">
          <NewsletterForm />
        </Reveal>
      </Container>
    </section>
  );
}
