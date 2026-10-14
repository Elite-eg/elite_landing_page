import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type SocialLabel = (typeof SOCIAL_LINKS)[number]["label"];

interface SocialBrand {
  Icon: IconType;
  /** Icon colour at rest (tuned to stay readable on the dark footer). */
  icon: string;
  /** Fill on hover. Can be a gradient (Instagram). */
  fill: string;
  /** Coloured glow under the button on hover. */
  glow: string;
  iconClassName?: string;
}

/** Official brand colours for each network. */
const SOCIAL_BRANDS: Record<SocialLabel, SocialBrand> = {
  Facebook: { Icon: FaFacebookF, icon: "#1877F2", fill: "#1877F2", glow: "rgb(24 119 242 / 0.55)" },
  LinkedIn: { Icon: FaLinkedinIn, icon: "#71B7FB", fill: "#0A66C2", glow: "rgb(10 102 194 / 0.55)" },
  Instagram: {
    Icon: FaInstagram,
    icon: "#E4405F",
    fill: "radial-gradient(circle at 30% 107%, #FDF497 0%, #FDF497 5%, #FD5949 45%, #D6249F 60%, #285AEB 90%)",
    glow: "rgb(214 36 159 / 0.55)",
  },
  TikTok: {
    Icon: FaTiktok,
    icon: "#FFFFFF",
    fill: "#000000",
    glow: "rgb(254 44 85 / 0.45)",
    // TikTok's offset cyan/red outline
    iconClassName: "[filter:drop-shadow(-1px_-1px_0_#25F4EE)_drop-shadow(1px_1px_0_#FE2C55)]",
  },
};

export function FooterSocialLinks() {
  const t = useTranslations("footer");

  return (
    <ul aria-label={t("socialLabel")} className="flex flex-wrap gap-2.5">
      {SOCIAL_LINKS.map((social) => {
        const { Icon, icon, fill, glow, iconClassName } = SOCIAL_BRANDS[social.label];

        return (
          <li key={social.href}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              title={social.label}
              style={{ "--brand-icon": icon, "--brand-fill": fill, "--brand-glow": glow } as CSSProperties}
              className="group/social relative isolate flex size-10 items-center justify-center overflow-hidden rounded-full border border-surface/10 bg-surface/5 transition duration-300 ease-out-brand hover:-translate-y-1 hover:border-transparent hover:shadow-[0_10px_22px_-6px_var(--brand-glow)] focus-visible:ring-offset-ink-900 motion-reduce:transform-none"
            >
              {/* Brand fill fades in on hover (a layer so gradients can animate too) */}
              <span
                aria-hidden
                className="absolute inset-0 -z-10 scale-50 rounded-full opacity-0 transition duration-300 ease-out-brand [background:var(--brand-fill)] group-hover/social:scale-100 group-hover/social:opacity-100"
              />
              <Icon
                aria-hidden
                className={cn(
                  "size-[1.125rem] text-[color:var(--brand-icon)] transition-[color,transform] duration-300 ease-out-brand group-hover/social:scale-110 group-hover/social:text-white",
                  iconClassName
                )}
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
