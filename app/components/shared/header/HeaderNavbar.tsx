"use client";

import { PopoverGroup } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { FiArrowRight, FiMenu } from "react-icons/fi";
import { HEADER_CTA, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "../Button";
import { Container } from "../Container";
import { Logo } from "../Logo";
import { HeaderMegaMenu } from "./HeaderMegaMenu";
import { HeaderNavLink } from "./HeaderNavLink";

export interface HeaderNavbarProps {
  isScrolled: boolean;
  onOpenMobileMenu: () => void;
}

/** White main bar: logo lockup, nav (with mega menus) and the primary CTA. */
export function HeaderNavbar({ isScrolled, onOpenMobileMenu }: HeaderNavbarProps) {
  const t = useTranslations("nav");

  return (
    <div
      className={cn(
        "border-b transition-[background-color,box-shadow,border-color] duration-300 ease-out-brand",
        isScrolled ? "border-edge/80 bg-surface/95 shadow-card backdrop-blur-md" : "border-edge bg-surface"
      )}
    >
      <Container className="flex h-16 items-center gap-4 sm:h-20 xl:grid xl:grid-cols-[1fr_auto_1fr] xl:gap-6">
        <Logo tone="light" withWordMark priority className="xl:justify-self-start" />

        <PopoverGroup as="nav" aria-label={t("mainNav")} className="hidden items-center gap-1 xl:flex xl:justify-self-center">
          {NAV_LINKS.map((entry) =>
            entry.type === "mega" ? (
              <HeaderMegaMenu key={entry.labelKey} labelKey={entry.labelKey} menu={entry.menu} />
            ) : (
              <HeaderNavLink key={entry.labelKey} item={entry} />
            )
          )}
        </PopoverGroup>

        <div className="ms-auto flex items-center gap-2 xl:ms-0 xl:justify-self-end">
          <Button
            href={HEADER_CTA.href}
            variant="secondary"
            size="sm"
            icon={<FiArrowRight />}
            flipIconInRtl
            className="hidden sm:inline-flex"
          >
            {t(HEADER_CTA.labelKey)}
          </Button>
          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label={t("openMenu")}
            className="grid size-10 cursor-pointer place-items-center rounded-lg border border-edge text-ink-900 transition duration-200 ease-out-brand hover:border-primary/30 hover:bg-surface-alt hover:text-primary active:scale-95 xl:hidden"
          >
            <FiMenu aria-hidden className="size-5" />
          </button>
        </div>
      </Container>
    </div>
  );
}
