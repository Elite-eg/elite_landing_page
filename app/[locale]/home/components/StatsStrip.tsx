import { Fragment } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { COMPANY_INFO, type AppLocale } from "@/lib/constants";
import { intlLocale } from "@/lib/locale";
import { WORK_PROJECTS } from "@/lib/projects";
import { HOME_SERVICES, HOME_STATS, type HomeStatKey } from "../data/homeData";
import { lineBreak } from "../utils/richText";

/** White strip under the hero (Figma "Stats strip"): who we are, then four figures split by hairlines. */
export function StatsStrip() {
  const t = useTranslations("home.stats");
  const locale = useLocale() as AppLocale;
  const count = new Intl.NumberFormat(intlLocale(locale));
  const values: Record<HomeStatKey, string> = {
    founded: String(COMPANY_INFO.foundedYear),
    services: count.format(HOME_SERVICES.length),
    projects: count.format(WORK_PROJECTS.length),
    codeOwnership: t("codeOwnershipValue"),
  };

  return (
    <section className="border-b border-edge bg-surface">
      <Container className="flex flex-col gap-8 py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <p className="text-balance font-heading text-lg font-semibold leading-normal text-body lg:max-w-[20rem]">{t.rich("intro", { br: lineBreak })}</p>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-7 sm:flex sm:items-center sm:gap-x-10 xl:gap-x-12">
          {HOME_STATS.map((key, index) => (
            <Fragment key={key}>
              {index > 0 && <span className="hidden h-14 w-px shrink-0 bg-edge sm:block" aria-hidden="true" />}
              <div className="flex flex-col-reverse gap-1">
                <dt className="text-caption text-content">{t(`items.${key}`)}</dt>
                <dd className="font-heading text-h2 font-bold leading-tight text-primary">{values[key]}</dd>
              </div>
            </Fragment>
          ))}
        </dl>
      </Container>
    </section>
  );
}
