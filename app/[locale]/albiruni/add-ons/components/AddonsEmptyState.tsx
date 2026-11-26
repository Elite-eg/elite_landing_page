"use client";

import { useTranslations } from "next-intl";
import { FiSearch } from "react-icons/fi";
import { Button } from "@/app/components/shared/Button";
import { DEFAULT_ADDONS_QUERY } from "@/lib/addons";
import { useAddonsQuery } from "../hooks/useAddonsQuery";

/** Shown in place of the grid when nothing matches: what to try next, and a way back to every add-on. */
export function AddonsEmptyState() {
  const t = useTranslations("addons.empty");
  const { setQuery } = useAddonsQuery();

  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-edge bg-surface-alt px-6 py-14 text-center">
      <FiSearch className="size-8 text-ink-400" aria-hidden="true" />
      <h3 className="text-h3 text-body">{t("title")}</h3>
      <p className="max-w-prose text-caption text-content">{t("text")}</p>
      <Button variant="outline" onClick={() => setQuery(DEFAULT_ADDONS_QUERY)} className="mt-2">
        {t("reset")}
      </Button>
    </div>
  );
}
