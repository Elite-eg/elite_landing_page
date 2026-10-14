import { useTranslations } from "next-intl";
import { Button } from "@/app/components/shared/Button";
import { ROUTES } from "@/lib/constants";

/** Small "back to home" link under each result screen. */
export function ResultHomeLink() {
  const t = useTranslations("checkout.result");

  return (
    <div className="mt-3 text-center">
      <Button href={ROUTES.home} variant="ghost" size="sm">
        {t("home")}
      </Button>
    </div>
  );
}
