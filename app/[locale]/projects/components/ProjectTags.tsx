import { useTranslations } from "next-intl";
import { Badge } from "@/app/components/shared/Badge";

export interface ProjectTagsProps {
  tags: string[];
}

/** Orange pills: what was built and where it runs. */
export function ProjectTags({ tags }: ProjectTagsProps) {
  const t = useTranslations("projects.card");

  return (
    <ul aria-label={t("tagsLabel")} className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag}>
          <Badge variant="secondary" className="rounded-full font-medium">
            {tag}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
