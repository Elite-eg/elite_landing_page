import { useTranslations } from "next-intl";
import { FiCheck } from "react-icons/fi";

export interface ProjectFeatureListProps {
  features: string[];
}

/** What was delivered, one green check per line. */
export function ProjectFeatureList({ features }: ProjectFeatureListProps) {
  const t = useTranslations("projects.card");

  return (
    <ul aria-label={t("featuresLabel")} className="flex flex-col gap-2.5">
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-2.5 text-caption text-ink-700">
          <FiCheck aria-hidden="true" strokeWidth={3} className="mt-1 size-4 shrink-0 text-success" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}
