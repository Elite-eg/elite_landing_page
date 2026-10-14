import type { Metadata, Viewport } from "next";
import "../globals.css";
import { Alexandria, Poppins, Readex_Pro } from "next/font/google";

import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import { getMessages } from "next-intl/server";
import type { AbstractIntlMessages } from "next-intl";
import Providers from "./providers/providers";
import { Toaster } from "react-hot-toast";
import { Header } from "@/app/components/shared/header/Header";
import { Footer } from "@/app/components/shared/footer/Footer";
import { WhatsAppButton } from "@/app/components/shared/WhatsAppButton";
import { COMPANY_INFO } from "@/lib/constants";

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
  themeColor: "#06142A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};


export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale = routing.defaultLocale } = await params;
  const isAr = locale === "ar";

  const brand = COMPANY_INFO.brandName[isAr ? "ar" : "en"];
  const title = isAr
    ? "إيليت تك | حلول برمجية للشركات ومجتمع للمطورين"
    : "Elite Tech | Enterprise Software Solutions & Builders Community";
  const description = isAr
    ? "نساعد الشركات والمؤسسات في بناء وتطوير حلولها البرمجية الخاصة، من تطبيقات الويب والجوال وأنظمة ERP وأتمتة الذكاء الاصطناعي، إلى مجتمع تقني مشارك."
    : "We help companies build custom software, web and mobile apps, ERP systems, AI automation, and foster a thriving tech community.";

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://elitemsr.com";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${brand}`,
    },
    description,
    keywords: [
      "Elite Tech",
      "إيليت تك",
      "حلول برمجية",
      "Software Solutions",
      "تطبيقات الويب",
      "تطبيقات الجوال",
      "ERP systems",
      "AI Automation",
      "الذكاء الاصطناعي",
    ],
    authors: [{ name: brand, url: siteUrl }],
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
      locale: isAr ? "ar_EG" : "en_US",
      url: `${siteUrl}/${locale}`,
      siteName: brand,
      title,
      description,
      images: [
        {
          url: "/images/hero-office.png",
          width: 1200,
          height: 630,
          alt: brand,
        },
        {
          url: "/images/logo-square.jpeg",
          width: 500,
          height: 500,
          alt: brand,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/hero-office.png"],
      creator: "@elitemsr",
    },

    alternates: {
      canonical: `/${locale}`,
      languages: {
        ar: "/ar",
        en: "/en",
      },
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
            className="flex-1 pt-16 sm:pt-20 lg:pt-28 overflow-x-hidden max-w-full w-full"
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
