import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { COMPANY_INFO, EMAIL_URL, WHATSAPP_DISPLAY_PHONE, WHATSAPP_URL } from "@/lib/constants";
import type { PolicyKey, PolicySectionConfig, PolicyTableContent } from "./policiesData";
import { PolicyTable } from "./PolicyTable";

const INLINE_LINK_CLASSES = "font-medium text-primary underline underline-offset-2 transition-colors hover:text-primary-dark";

/** Tags and values any policy paragraph may use: `<emailLink>{email}</emailLink>`, `<whatsappLink>{phone}</whatsappLink>`. */
const RICH_TEXT = {
  email: COMPANY_INFO.email,
  phone: WHATSAPP_DISPLAY_PHONE,
  emailLink: (chunks: ReactNode) => (
    <a href={EMAIL_URL} dir="ltr" className={INLINE_LINK_CLASSES}>
      {chunks}
    </a>
  ),
  whatsappLink: (chunks: ReactNode) => (
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" dir="ltr" className={INLINE_LINK_CLASSES}>
      {chunks}
    </a>
  ),
};

export interface PolicySectionProps {
  policy: PolicyKey;
  section: PolicySectionConfig;
}

/** One policy section: title, then its blocks (paragraph, bullet list, table) in the configured order. */
export function PolicySection({ policy, section }: PolicySectionProps) {
  const t = useTranslations(`policies.${policy}.sections.${section.key}`);
  const titleId = `${section.key}-title`;

  return (
    <section id={section.key} aria-labelledby={titleId} className="flex flex-col gap-3.5">
      <h2 id={titleId} className="text-h3 text-body">
        {t("title")}
      </h2>

      {section.blocks.map((block) => {
        if (block === "text") {
          return (
            <p key={block} className="max-w-prose text-ink-700">
              {t.rich("text", RICH_TEXT)}
            </p>
          );
        }

        if (block === "list") {
          return (
            <ul key={block} className="flex max-w-prose flex-col gap-3.5">
              {(t.raw("list") as string[]).map((item) => (
                <li key={item} className="flex gap-3 text-ink-700">
                  {/* Centred on the first line (16px text, 1.75 line height). */}
                  <span className="mt-[0.6875rem] size-1.5 shrink-0 rounded-full bg-secondary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        return <PolicyTable key={block} table={t.raw("table") as PolicyTableContent} />;
      })}
    </section>
  );
}
