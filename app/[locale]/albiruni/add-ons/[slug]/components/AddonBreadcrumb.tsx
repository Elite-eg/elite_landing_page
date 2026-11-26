import { useTranslations } from "next-intl";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import { addonsStoreHref, type AddonCategory } from "@/lib/addons";
import { ROUTES } from "@/lib/constants";

export interface AddonBreadcrumbProps {
  category: AddonCategory;
  /** The add-on's name (current page). */
  name: string;
}

/** "Add-ons store › Category › Add-on" (Figma "Breadcrumb"); the category opens the store filtered to it. */
export function AddonBreadcrumb({ category, name }: AddonBreadcrumbProps) {
  const t = useTranslations("addons");
  const separator = (
    <li aria-hidden="true" className="text-ink-400">
      <FiChevronRight className="size-3.5 rtl:-scale-x-100" />
    </li>
  );

  return (
    <nav aria-label={t("details.breadcrumb")}>
      <ol className="flex flex-wrap items-center gap-2 text-caption">
        <li>
          <Link href={ROUTES.albiruni.addons} className="text-secondary-dark underline-offset-4 hover:underline">
            {t("storeName")}
          </Link>
        </li>
        {separator}
        <li>
          <Link href={addonsStoreHref({ category })} className="text-content transition-colors hover:text-primary">
            {t(`categories.${category}`)}
          </Link>
        </li>
        {separator}
        <li aria-current="page" className="text-body">
          {name}
        </li>
      </ol>
    </nav>
  );
}
