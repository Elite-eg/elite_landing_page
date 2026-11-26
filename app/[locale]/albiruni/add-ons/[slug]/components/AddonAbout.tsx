import { useTranslations } from "next-intl";
import { PlanFeatureList } from "@/app/components/shared/PlanFeatureList";
import { AddonDetailsSection } from "./AddonDetailsSection";

export interface AddonAboutProps {
  description: string;
  features: string[];
}

/** "About the add-on" (Figma "Section/عن الإضافة"): what it does, then what it gives you as a checked list. */
export function AddonAbout({ description, features }: AddonAboutProps) {
  const t = useTranslations("addons.details");

  return (
    <AddonDetailsSection id="description" title={t("about.title")}>
      <p className="max-w-prose text-ink-700">{description}</p>
      <PlanFeatureList features={features} marker="circle" />
    </AddonDetailsSection>
  );
}
