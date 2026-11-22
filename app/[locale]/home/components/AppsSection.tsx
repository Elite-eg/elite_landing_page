import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { MORE_PLATFORM_APPS } from "../data/homeData";
import { lineBreak } from "../utils/richText";
import { SECTION_TITLE_LEADING } from "../utils/titleClasses";
import { AppsExplorer } from "./AppsExplorer";

/** "Start with what you need today" (Figma "Albiruni apps"): filterable app grid, then the apps not shown. */
export function AppsSection() {
  const t = useTranslations("home.apps");
  const moreApps = MORE_PLATFORM_APPS.map((key) => t(`moreItems.${key}`)).join(t("listSeparator"));

  return (
    <section className="bg-surface-alt py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t.rich("title", { br: lineBreak })}
          subtitle={t("subtitle")}
          headingClassName={cn("text-body", SECTION_TITLE_LEADING)}
          className="mb-10 max-w-4xl sm:mb-10"
        />

        <AppsExplorer />

        <Reveal className="mt-10">
          <p className="flex flex-wrap items-baseline justify-center gap-x-2.5 gap-y-1 text-center">
            <span className="text-caption text-ink-700">
              {t("more", { count: MORE_PLATFORM_APPS.length, list: moreApps })}
            </span>
            <Link
              href={ROUTES.albiruni.addons}
              className="font-heading text-caption font-semibold text-secondary-dark transition-colors hover:text-primary"
            >
              {t("all")}
            </Link>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
