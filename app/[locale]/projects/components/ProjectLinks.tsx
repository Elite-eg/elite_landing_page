import { useTranslations } from "next-intl";
import { FiArrowRight } from "react-icons/fi";
import { AppLinkBadge, type AppLink } from "@/app/components/shared/AppLinkBadge";
import { Button } from "@/app/components/shared/Button";

export interface ProjectLinksProps {
  /** The project's own page, linked as "Project details". */
  detailsHref: string;
  /** The live site and store listings the project has, opened in a new tab. */
  links: AppLink[];
  /** Shown on the website badge ("View {name}"). */
  siteName: string;
  /** Id of the project title: "Project details" ×N stay distinguishable for screen readers. */
  describedBy: string;
}

/**
 * A badge for each public link the project has (as on the Bareeq X case study), then "Project details" (navy button)
 * closing the card. Two rows: the button and three badges don't fit one row of the card.
 */
export function ProjectLinks({ detailsHref, links, siteName, describedBy }: ProjectLinksProps) {
  const t = useTranslations("projects.card.links");

  return (
    <>
      {links.length > 0 && (
        <ul aria-label={t("label")} className="flex flex-wrap gap-3">
          {links.map((link) => (
            <li key={link.kind}>
              <AppLinkBadge tone="light" link={link} siteName={siteName} />
            </li>
          ))}
        </ul>
      )}
      <Button href={detailsHref} icon={<FiArrowRight />} flipIconInRtl aria-describedby={describedBy}>
        {t("details")}
      </Button>
    </>
  );
}
