import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { APP_TIME_ZONE } from "@/lib/constants";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    // Fixed zone (not the server's), matching the client provider in providers.tsx.
    timeZone: APP_TIME_ZONE,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
