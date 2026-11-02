import { useTranslations } from "next-intl";

export interface ProjectTechListProps {
  tech: string[];
}

/** Small grey chips: the technologies and services behind the project. */
export function ProjectTechList({ tech }: ProjectTechListProps) {
  const t = useTranslations("projects.card");

  return (
    <ul aria-label={t("techLabel")} className="flex flex-wrap gap-1.5">
      {tech.map((item) => (
        <li key={item} className="rounded-md border border-edge bg-surface-alt px-2.5 py-0.5 text-xs text-ink-700">
          {item}
        </li>
      ))}
    </ul>
  );
}
