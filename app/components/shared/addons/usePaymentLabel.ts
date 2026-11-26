import { useTranslations } from "next-intl";
import type { AddonPayment } from "@/lib/addons";

/**
 * How an order was paid, for its summary: "Card ending 4242", or the method's name ("Fawry"), shared with the
 * checkout. Works in server and client components.
 */
export function usePaymentLabel() {
  const t = useTranslations("addons.order");
  const tMethods = useTranslations("checkout.payment.methods");

  return ({ method, last4 }: AddonPayment) =>
    method === "card" && last4 ? t("cardEnding", { last4 }) : tMethods(`${method}.label`);
}
