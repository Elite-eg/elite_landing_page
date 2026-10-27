"use client";

import { CloseButton, Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { FiArrowRight, FiX } from "react-icons/fi";
import { COMMUNITY_NAV_ITEM, HEADER_ACCOUNT_LINKS, HEADER_CTA, HEADER_UTILITY_LINKS, NAV_LINKS } from "@/lib/constants";
import { Button } from "../Button";
import { CountrySwitcher } from "../country/CountrySwitcher";
import { Logo } from "../Logo";
import { HeaderLanguageToggle } from "./HeaderLanguageToggle";
import { HeaderMobileNavAccordion } from "./HeaderMobileNavAccordion";
import { HeaderMobileNavLink } from "./HeaderMobileNavLink";
import { HeaderTopBarLink } from "./HeaderTopBarLink";

export interface HeaderMobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SMALL_LINK_CLASS = "text-sm text-content hover:text-primary";

/** Slide-in navigation for screens below xl. Links close it via Headless UI's close context. */
export function HeaderMobileDrawer({ isOpen, onClose }: HeaderMobileDrawerProps) {
  const t = useTranslations("nav");
  const secondaryLinks = [...HEADER_UTILITY_LINKS.filter((item) => item !== COMMUNITY_NAV_ITEM), ...HEADER_ACCOUNT_LINKS];

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-[120] xl:hidden"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-ink-900/60 backdrop-blur-sm transition-opacity duration-300 ease-out-brand data-[closed]:opacity-0"
      />

      <div className="fixed inset-y-0 end-0 flex w-full max-w-sm">
        <DialogPanel
          transition
          className="flex h-full w-full flex-col bg-surface shadow-lift transition-transform duration-300 ease-out-brand data-[closed]:translate-x-full rtl:data-[closed]:-translate-x-full motion-reduce:transition-none"
        >
          <div className="flex h-16 items-center justify-between border-b border-edge px-5">
            <Logo tone="light" withWordMark />
            <CloseButton
              aria-label={t("closeMenu")}
              className="grid size-10 cursor-pointer place-items-center rounded-lg text-content transition-colors hover:bg-surface-alt hover:text-primary"
            >
              <FiX aria-hidden className="size-5" />
            </CloseButton>
          </div>

          <nav
            aria-label={t("mainNav")}
            className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4"
          >
            {NAV_LINKS.map((entry) =>
              entry.type === "mega" ? (
                <HeaderMobileNavAccordion
                  key={entry.labelKey}
                  labelKey={entry.labelKey}
                  menu={entry.menu}
                />
              ) : (
                <HeaderMobileNavLink key={entry.labelKey} item={entry} />
              ),
            )}
            <HeaderMobileNavLink item={COMMUNITY_NAV_ITEM} />
          </nav>

          <div className="space-y-4 border-t border-edge bg-surface-alt px-5 py-5">
            <Button
              href={HEADER_CTA.href}
              onClick={onClose}
              variant="secondary"
              size="md"
              icon={<FiArrowRight />}
              flipIconInRtl
              fullWidth
            >
              {t(HEADER_CTA.labelKey)}
            </Button>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {secondaryLinks.map((item) => (
                <HeaderTopBarLink
                  key={item.labelKey}
                  item={item}
                  className={SMALL_LINK_CLASS}
                />
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
              <CountrySwitcher />
              <HeaderLanguageToggle className="text-content hover:text-primary" />
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
