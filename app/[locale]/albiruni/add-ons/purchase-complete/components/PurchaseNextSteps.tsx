import { useTranslations } from "next-intl";

/** Message keys of the steps after buying, in order (`addons.purchaseComplete.nextSteps.items.<key>`). */
const NEXT_STEPS = ["download", "install", "help"] as const;

/** "Next steps" (Figma "Step"): numbered navy discs beside each step. */
export function PurchaseNextSteps() {
  const t = useTranslations("addons.purchaseComplete.nextSteps");

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-sans text-caption font-medium text-body">{t("title")}</h3>
      <ol className="flex flex-col gap-4">
        {NEXT_STEPS.map((key, index) => (
          <li key={key} className="flex items-center gap-2.5 text-caption text-ink-700">
            <span
              aria-hidden="true"
              className="grid size-6 shrink-0 place-items-center rounded-full bg-primary-dark text-xs font-semibold text-surface"
            >
              {index + 1}
            </span>
            {t(`items.${key}`)}
          </li>
        ))}
      </ol>
    </div>
  );
}
