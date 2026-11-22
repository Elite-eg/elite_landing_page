import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { FiArrowRight } from "react-icons/fi";
import { Button } from "@/app/components/shared/Button";
import { ContactChannelCard } from "@/app/components/shared/ContactChannelCard";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { COMPANY_INFO, EMAIL_URL, ROUTES, WHATSAPP_DISPLAY_PHONE, WHATSAPP_URL, telUrl } from "@/lib/constants";
import { SUPPORT_CHANNELS, type SupportChannel } from "../data/knowledgeBaseData";

interface ChannelContent {
  value: ReactNode;
  href?: string;
  external?: boolean;
}

/** Closing "Didn't find your answer?": the SLA's support channels (values from COMPANY_INFO) and a link to the SLA. */
export function SupportSection() {
  const t = useTranslations("learn.knowledgeBase.help");

  const contents: Record<SupportChannel["key"], ChannelContent> = {
    whatsapp: { value: <span dir="ltr">{WHATSAPP_DISPLAY_PHONE}</span>, href: WHATSAPP_URL, external: true },
    // Two numbers, each its own call link, so the card itself isn't one.
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
  };

  return (
    <section className="py-20 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            title={t("title")}
            subtitle={t("subtitle")}
            align="start"
            size="compact"
            headingClassName="text-body"
            className="mb-6"
          />
          <Reveal>
            <Button
              href={ROUTES.legal.sla}
              variant="text"
              icon={<FiArrowRight />}
              flipIconInRtl
              className="whitespace-normal text-start text-secondary-dark hover:text-primary"
            >
              {t("sla")}
            </Button>
          </Reveal>
        </div>

        <RevealGroup className="lg:col-span-7">
          <ul aria-label={t("label")} className="flex flex-col gap-3">
            {SUPPORT_CHANNELS.map(({ key, icon, tone }) => {
              const { value, href, external } = contents[key];
              return (
                <li key={key}>
                  <Reveal inGroup>
                    <ContactChannelCard icon={icon} tone={tone} title={t(`channels.${key}.title`)} href={href} external={external}>
                      {value}
                    </ContactChannelCard>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </RevealGroup>
      </Container>
    </section>
  );
}
