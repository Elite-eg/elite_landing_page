import { useTranslations } from "next-intl";
import type { FooterNavGroup } from "@/lib/constants";
import { FooterLink } from "./FooterLink";

export interface FooterNavColumnProps {
  group: FooterNavGroup;
}

export function FooterNavColumn({ group }: FooterNavColumnProps) {
  const t = useTranslations("nav");

  return (
    <div className="space-y-4">
      <h2 className="text-caption font-bold text-surface">{t(`groups.${group.key}`)}</h2>
      <ul className="space-y-2.5 text-caption">
        {group.items.map((item) => (
          <li key={item.href}>
            <FooterLink href={item.href} external={item.external}>
              {t(item.labelKey)}
            </FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
