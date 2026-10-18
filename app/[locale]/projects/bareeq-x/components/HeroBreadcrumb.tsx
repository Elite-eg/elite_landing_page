import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/lib/constants";

interface HeroBreadcrumbProps {
  /** Name of the current case study. */
  current: string;
}

/** "Our work / <project>" trail on the teal hero. */
export function HeroBreadcrumb({ current }: HeroBreadcrumbProps) {
  const t = useTranslations("caseStudies.breadcrumb");

  return (
    <nav aria-label={t("label")}>
      <ol className="flex flex-wrap items-center gap-2 text-caption text-bareeq-200">
        <li>
          <Link
            href={ROUTES.projects.all}
            className="underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            {t("ourWork")}
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}
