import { useTranslations } from "next-intl";
import { BAREEQ_FACTS } from "../data/bareeqData";

/** Key numbers under the hero tagline. The value shows above its label (dd before dt visually). */
export function HeroFacts() {
  const t = useTranslations("caseStudies.bareeqX.hero.facts");

  return (
    <dl className="flex flex-wrap gap-x-7 gap-y-4">
      {BAREEQ_FACTS.map((key) => (
        <div key={key} className="flex flex-col-reverse gap-0.5">
          <dt className="text-caption text-bareeq-200">{t(`${key}.label`)}</dt>
          <dd className="font-heading text-[1.625rem] font-bold leading-tight text-white">{t(`${key}.value`)}</dd>
        </div>
      ))}
    </dl>
  );
}
