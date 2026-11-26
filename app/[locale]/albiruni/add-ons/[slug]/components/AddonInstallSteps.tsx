import { useTranslations } from "next-intl";
import { AddonDetailsSection } from "./AddonDetailsSection";

export interface AddonInstallStepsProps {
  steps: string[];
}

/** "How to install" (Figma "Section/طريقة التركيب"): numbered steps, then where to get help. */
export function AddonInstallSteps({ steps }: AddonInstallStepsProps) {
  const t = useTranslations("addons.details.installation");

  return (
    <AddonDetailsSection id="installation" title={t("title")}>
      <ol className="flex flex-col gap-4">
        {steps.map((step, index) => (
          <li key={step} className="flex items-start gap-3 text-ink-700">
            <span
              aria-hidden="true"
              className="grid size-7 shrink-0 place-items-center rounded-full bg-primary-dark text-[0.8125rem] font-semibold text-surface"
            >
              {index + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
      <p className="rounded-xl bg-surface-alt px-4 py-3.5 text-caption text-ink-700">{t("help")}</p>
    </AddonDetailsSection>
  );
}
