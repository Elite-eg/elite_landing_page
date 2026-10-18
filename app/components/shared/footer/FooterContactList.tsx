import { useLocale, useTranslations } from "next-intl";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { COMPANY_INFO, type AppLocale } from "@/lib/constants";
import { FooterContactItem } from "./FooterContactItem";
import { FooterLink } from "./FooterLink";

export function FooterContactList() {
  const t = useTranslations("footer");
  const locale = useLocale() as AppLocale;

  return (
    <address className="not-italic">
      <ul aria-label={t("contactLabel")} className="space-y-2.5 text-caption">
        <FooterContactItem icon={FiPhone}>
          {COMPANY_INFO.phones.map((phone, index) => (
            <span key={phone} className="inline-flex items-center gap-x-2">
              {index > 0 && <span aria-hidden className="text-content-dark/50">·</span>}
              <FooterLink href={`tel:${phone.replace(/\s+/g, "")}`} nudge={false}>
                <span dir="ltr">{phone}</span>
              </FooterLink>
            </span>
          ))}
        </FooterContactItem>

        <FooterContactItem icon={FiMail}>
          <FooterLink href={`mailto:${COMPANY_INFO.email}`} nudge={false}>
            {COMPANY_INFO.email}
          </FooterLink>
        </FooterContactItem>

        <FooterContactItem icon={FiMapPin}>
          <span className="text-content-dark">{COMPANY_INFO.addressShort[locale]}</span>
        </FooterContactItem>
      </ul>
    </address>
  );
}
