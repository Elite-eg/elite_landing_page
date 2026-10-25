"use client";

import type { ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  COMPANY_INFO,
  COMPANY_MAP_URL,
  EMAIL_URL,
  WHATSAPP_DISPLAY_PHONE,
  WHATSAPP_URL,
  telUrl,
  type AppLocale,
} from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { CONTACT_CHANNELS, type ContactChannelKey } from "../data/contactData";
import { ContactChannelCard } from "./ContactChannelCard";

interface ChannelContent {
  value: ReactNode;
  href?: string;
  external?: boolean;
}

export interface ContactChannelListProps {
  className?: string;
}

/** WhatsApp, Maher, phone, email and office cards. Every value comes from COMPANY_INFO. */
export function ContactChannelList({ className }: ContactChannelListProps) {
  const t = useTranslations("contact.channels");
  const locale = useLocale() as AppLocale;

  const contents: Record<ContactChannelKey, ChannelContent> = {
    whatsapp: { value: <span dir="ltr">{WHATSAPP_DISPLAY_PHONE}</span>, href: WHATSAPP_URL, external: true },
    // TBD: open the Maher chat once the bot exists. Until then the card only informs.
    maher: { value: t("maher.value") },
    phone: {
      value: (
        <span className="flex flex-wrap items-center gap-x-2">
          {COMPANY_INFO.phones.map((phone, index) => (
            <span key={phone} className="inline-flex items-center gap-x-2">
              {index > 0 && <span aria-hidden="true">·</span>}
              <a href={telUrl(phone)} dir="ltr" className="transition-colors duration-200 hover:text-primary">
                {phone}
              </a>
            </span>
          ))}
        </span>
      ),
    },
    email: { value: <span dir="ltr">{COMPANY_INFO.email}</span>, href: EMAIL_URL },
    address: { value: COMPANY_INFO.address[locale], href: COMPANY_MAP_URL, external: true },
  };

  return (
    <motion.ul variants={staggerContainer} aria-label={t("label")} className={cn("flex flex-col gap-3", className)}>
      {CONTACT_CHANNELS.map(({ key, icon, tone }) => {
        const { value, href, external } = contents[key];
        return (
          <motion.li key={key} variants={fadeInUp}>
            <ContactChannelCard icon={icon} tone={tone} title={t(`${key}.title`)} href={href} external={external}>
              {value}
            </ContactChannelCard>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
