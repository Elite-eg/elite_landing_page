import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { NewsletterForm } from "@/app/components/shared/NewsletterForm";
import { Reveal } from "@/app/components/shared/Reveal";
import { SectionHeading } from "@/app/components/shared/SectionHeading";

/** Navy closing band (the page's one bold moment): monthly newsletter sign-up. */
export function NewsletterSection() {
  const t = useTranslations("community.newsletter");

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
