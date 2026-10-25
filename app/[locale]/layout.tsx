import type { Metadata, Viewport } from "next";
import "../globals.css";
import { Alexandria, Poppins, Readex_Pro } from "next/font/google";

import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import { getMessages, getTranslations } from "next-intl/server";
import type { AbstractIntlMessages } from "next-intl";
import Providers from "./providers/providers";
import { Toaster } from "react-hot-toast";
import { Header } from "@/app/components/shared/header/Header";
import { Footer } from "@/app/components/shared/footer/Footer";
import { WhatsAppButton } from "@/app/components/shared/WhatsAppButton";
import { COMPANY_INFO } from "@/lib/constants";
import { toAppLocale } from "@/lib/locale";
import { DEFAULT_OG_IMAGE, OG_LOCALES, SITE_KEYWORDS, SITE_URL } from "@/lib/metadata";

/** Headings (Display / H2 / H3). */
const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-alexandria",
  display: "swap",
});

/** Body text. */
const readexPro = Readex_Pro({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-readex",
  display: "swap",
});

/** Fixed "Elite Tech" wordmark only. */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const viewport: Viewport = {
  /** primary-deep. Browser UI color: metadata needs a literal value, not a CSS variable. */
  themeColor: "#06142A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/**
 * Site-wide defaults. Every page overrides title, description, alternates, openGraph and twitter
 * through buildPageMetadata (lib/metadata.ts); these values only show on pages that don't (404).
 */
export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "site.meta" });
  const brand = COMPANY_INFO.brandName[locale];
  const title = t("title", { brand });
  const description = t("description");

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${brand}`,
    },
    description,
    keywords: SITE_KEYWORDS,
    authors: [{ name: brand, url: SITE_URL }],
    creator: brand,
    publisher: brand,

    icons: {
      icon: [
        { url: "/images/logo.png", type: "image/png" },
        { url: "/images/logo-square.jpeg", type: "image/jpeg" },
      ],
      shortcut: "/images/logo.png",
      apple: "/images/logo-square.jpeg",
    },

    openGraph: {
      type: "website",
      locale: OG_LOCALES[locale],
      siteName: brand,
      title,
      description,
      images: [{ ...DEFAULT_OG_IMAGE, alt: brand }],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale = routing.defaultLocale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const messages: AbstractIntlMessages = await getMessages({ locale });

  return (
    <html
      dir={locale === "ar" ? "rtl" : "ltr"}
      lang={locale}
      className={`${alexandria.variable} ${readexPro.variable} ${poppins.variable} overflow-x-hidden max-w-full w-full`}
    >
      <body className="font-sans flex min-h-screen flex-col overflow-x-hidden max-w-full w-full relative">
        <Providers locale={locale} messages={messages}>
          <Header />
          <main
            id="main"
            className="flex-1 pt-16 sm:pt-20 lg:pt-28 overflow-x-hidden supports-[overflow:clip]:overflow-x-clip max-w-full w-full"
          >
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
