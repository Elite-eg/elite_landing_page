"use client";

import { useClose } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { FiArrowRight } from "react-icons/fi";
import type { MegaMenuSection as MegaMenuSectionData } from "@/lib/constants";
import { Button } from "../Button";
import { MegaMenuLink } from "./MegaMenuLink";

export interface MegaMenuSectionProps {
  section: MegaMenuSectionData;
}

export function MegaMenuSection({ section }: MegaMenuSectionProps) {
  const t = useTranslations("nav");
  const close = useClose();

  return (
    <div>
      <p className="mb-2 px-2.5 text-xs font-medium text-content">{t(section.titleKey)}</p>
      <ul className="space-y-0.5">
        {section.items.map((item) => (
          <li key={item.href}>
            <MegaMenuLink item={item} />
          </li>
        ))}
      </ul>
      {section.moreLink && (
        <Button
          href={section.moreLink.href}
          onClick={close}
          variant="text"
          size="sm"
          icon={<FiArrowRight />}
          flipIconInRtl
          className="mt-2 rounded-lg px-2.5 py-1.5 font-semibold text-primary hover:text-primary-dark"
        >
          {t(section.moreLink.labelKey)}
        </Button>
      )}
    </div>
  );
}
