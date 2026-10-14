import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { COMPANY_INFO, ROUTES, type AppLocale } from "@/lib/constants";
import { cn } from "@/lib/utils";

export interface LogoProps {
  /** "dark" = placed on a navy/photo background, "light" = placed on a light background. */
  tone?: "light" | "dark";
  /** Shows the fixed "Elite Tech" wordmark (Poppins) next to the mark. */
  withWordMark?: boolean;
  className?: string;
}

export function Logo({ tone = "light", withWordMark = false, className }: LogoProps) {
  const locale = useLocale() as AppLocale;
  const logoSrc =
    tone === "dark" ? "/images/logo-light.png" : "/images/logo.png";
  const brandName = COMPANY_INFO.brandName[locale];

  return (
    <Link
      href={ROUTES.home}
      dir="ltr"
      className={cn(
        "group inline-flex items-center gap-2 rounded-xl transition-opacity duration-200 hover:opacity-90",
        className,
      )}
    >
      <Image
        src={logoSrc}
        alt={withWordMark ? "" : brandName}
        width={180}
        height={105}
        priority
        className={cn(
          "w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]",
          withWordMark ? "h-8" : "h-10 sm:h-11",
        )}
      />
      {withWordMark && (
        <span className="font-logo text-xl font-semibold tracking-tight">
          <span className={tone === "dark" ? "text-surface" : "text-primary"}>
            {COMPANY_INFO.wordmark.primary}
          </span>{" "}
          <span className="text-secondary">{COMPANY_INFO.wordmark.accent}</span>
        </span>
      )}
    </Link>
  );
}
