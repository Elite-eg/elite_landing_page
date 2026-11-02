import Image from "next/image";
import { useTranslations } from "next-intl";
import { FiGlobe } from "react-icons/fi";
import { StoreBadge, type StoreBadgeTone } from "./StoreBadge";

export type AppLinkKind = "website" | "googlePlay" | "appStore";

/** A product's public link (its website or a store listing), opened in a new tab. */
export interface AppLink {
  kind: AppLinkKind;
  href: string;
  /** Website logo (a path in `MEDIA`); a website without one shows a globe. Stores always show their own mark. */
  logo?: string;
}

/** Official store marks in /public. */
const STORE_LOGOS: Record<Exclude<AppLinkKind, "website">, string> = {
  googlePlay: "/images/google-play.svg",
  appStore: "/images/app-store.svg",
};

export interface AppLinkBadgeProps {
  link: AppLink;
  /** The site's name on a website badge ("View {name}"); the domain when left out. */
  siteName?: string;
  tone?: StoreBadgeTone;
}

/**
 * `StoreBadge` filled in from the link kind (copy in `appLinks`): a website shows its domain over "View {name}",
 * a store "Get it on Google Play" / "Download on the App Store". Footer, Bareeq X case study, projects page.
 */
export function AppLinkBadge({ link: { kind, href, logo }, siteName, tone }: AppLinkBadgeProps) {
  const t = useTranslations("appLinks");
  const domain = new URL(href).hostname.replace(/^www\./, "");
  const { caption, label, logoSrc } =
    kind === "website"
      ? { caption: domain, label: t("website.label", { name: siteName ?? domain }), logoSrc: logo }
      : { caption: t(`${kind}.caption`), label: t(`${kind}.label`), logoSrc: STORE_LOGOS[kind] };

  return (
    <StoreBadge
      href={href}
      tone={tone}
      caption={caption}
      label={label}
      logo={
        logoSrc ? (
          <Image src={logoSrc} alt="" width={24} height={24} unoptimized className="size-full rounded-md" />
        ) : (
          <FiGlobe />
        )
      }
    />
  );
}
