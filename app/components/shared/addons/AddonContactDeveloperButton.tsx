import { useTranslations } from "next-intl";
import { Button, type ButtonAsLinkProps } from "@/app/components/shared/Button";
import type { AddonDeveloper } from "@/lib/addons";
import { whatsappUrl } from "@/lib/constants";

export type AddonContactDeveloperButtonProps = Omit<ButtonAsLinkProps, "href" | "external" | "children"> & {
  addon: { name: string; developer: AddonDeveloper };
};

/**
 * "Contact the developer" (outline by default). TBD: there is no developer messaging yet, so it opens WhatsApp with a
 * message naming the add-on and its developer. Add-on page, purchase complete page, My purchases.
 */
export function AddonContactDeveloperButton({ addon, variant = "outline", ...buttonProps }: AddonContactDeveloperButtonProps) {
  const t = useTranslations("addons.contactDeveloper");

  return (
    <Button
      {...buttonProps}
      href={whatsappUrl(t("message", { name: addon.name, developer: addon.developer.name }))}
      external
      variant={variant}
    >
      {t("label")}
    </Button>
  );
}
