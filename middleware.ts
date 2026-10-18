import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { LOCALE_COOKIE, routing } from "@/i18n/routing";
import { ROUTES, type AppLocale } from "@/lib/constants";

const intlMiddleware = createMiddleware({ ...routing, localeDetection: false });

/** Local check against routing.locales (importing next-intl's hasLocale adds ~12 kB to the edge bundle). */
const isLocale = (value: string | undefined): value is AppLocale =>
  (routing.locales as readonly string[]).includes(value ?? "");

export default function middleware(request: NextRequest) {
  const segments = request.nextUrl.pathname.split("/").filter(Boolean);
  const [firstSegment] = segments;

  // No locale prefix: use the last language the visitor picked (cookie), else the default.
  // The cookie is validated, so a tampered value can't cause a redirect loop.
  if (!isLocale(firstSegment)) {
    const saved = request.cookies.get(LOCALE_COOKIE)?.value;
    const locale = isLocale(saved) ? saved : routing.defaultLocale;
    return redirectTo(request, segments.length ? `/${locale}/${segments.join("/")}` : `/${locale}${ROUTES.home}`);
  }

  // Bare locale root ("/ar", "/en"): the site has no page there, so open that locale's home.
  if (segments.length === 1) {
    return redirectTo(request, `/${firstSegment}${ROUTES.home}`);
  }

  return intlMiddleware(request);
}

function redirectTo(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
