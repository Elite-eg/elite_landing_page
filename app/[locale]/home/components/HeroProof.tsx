import { useTranslations } from "next-intl";
import { HOME_PROOF_PROJECTS } from "@/lib/projects";

/** "From our projects:" and the client names as chips, in the visitor's language (Figma "Proof"). */
export function HeroProof() {
  const t = useTranslations("home.hero");
  const tProjects = useTranslations("projects.list");

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <p className="text-caption text-navy-300">{t("proof")}</p>
      <ul className="flex flex-wrap gap-1.5">
        {HOME_PROOF_PROJECTS.map((key) => (
          <li key={key} className="rounded-full bg-white/[0.08] px-2.5 py-1 text-xs font-medium text-white">
            {tProjects(`${key}.wordmark`)}
          </li>
        ))}
      </ul>
    </div>
  );
}
