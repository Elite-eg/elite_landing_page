import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { toAppLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/metadata";
import { POLICIES, type PolicyKey } from "./policiesData";

/** Localized metadata shared by every policy page. */
export async function buildPolicyMetadata(policy: PolicyKey, rawLocale: string): Promise<Metadata> {
  const locale = toAppLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: `policies.${policy}.meta` });

  return buildPageMetadata({ locale, path: POLICIES[policy].route, title: t("title"), description: t("description") });
}
