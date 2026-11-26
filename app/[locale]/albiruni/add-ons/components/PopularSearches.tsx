"use client";

import { useId } from "react";
import { useTranslations } from "next-intl";
import { POPULAR_SEARCHES } from "../data/addonsStoreData";
import { useAddonsQuery } from "../hooks/useAddonsQuery";

/** "Most searched:" chips under the search box (Figma "Popular"); a chip runs that search in every category. */
export function PopularSearches() {
  const t = useTranslations("addons.popular");
  const { setQuery } = useAddonsQuery();
  const labelId = useId();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <p id={labelId} className="text-caption text-white/75">
        {t("label")}
      </p>

      <ul aria-labelledby={labelId} className="flex flex-wrap gap-2">
        {POPULAR_SEARCHES.map((key) => (
          <li key={key}>
            <button
              type="button"
              onClick={() => setQuery({ q: t(`items.${key}`), category: "all" })}
              className="rounded-full bg-primary/60 px-3 py-1.5 text-caption text-white transition-colors duration-200 hover:bg-primary"
            >
              {t(`items.${key}`)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
