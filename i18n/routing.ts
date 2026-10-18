import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "ar"],

  // Used when no locale matches
  defaultLocale: "ar",
});

/** Remembers the visitor's language: written by the language toggle, read by middleware.ts. */
export const LOCALE_COOKIE = "NEXT_LOCALE";
