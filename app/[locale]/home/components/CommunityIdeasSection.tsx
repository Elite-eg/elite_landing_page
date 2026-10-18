"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FiArrowUpRight } from "react-icons/fi";
import { CommunityGateModal } from "@/app/components/shared/CommunityGateModal";
import { Container } from "@/app/components/shared/Container";
import { IdeaCard } from "@/app/components/shared/IdeaCard";
import { Button } from "@/app/components/shared/Button";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { COMMUNITY_URLS, COMPANY_INFO, type AppLocale } from "@/lib/constants";
import { HOME_IDEAS } from "../data/homeData";

export function CommunityIdeasSection() {
  const t = useTranslations("home.ideas");
  const locale = useLocale() as AppLocale;
  const [gateReason, setGateReason] = useState<string | null>(null);

  return (
    <section className="bg-surface-alt py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal preset="slideInLeft">
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              subtitle={t("subtitle")}
              align="start"
              className="mb-0 sm:mb-0"
            />
          </Reveal>
          <Reveal preset="slideInRight" className="shrink-0">
            <Button
              href={COMMUNITY_URLS.ideas}
              external
              variant="outline"
              icon={<FiArrowUpRight />}
              flipIconInRtl
            >
              {t("viewAll")}
            </Button>
          </Reveal>
        </div>

        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_IDEAS.map(({ key, techStack }, idx) => (
            <Reveal
              key={key}
              inGroup
              preset={
                idx === 0
                  ? "slideInLeft"
                  : idx === 1
                    ? "scaleIn"
                    : "slideInRight"
              }
            >
              <IdeaCard
                author={COMPANY_INFO.brandName[locale]}
                category={t(`items.${key}.category`)}
                title={t(`items.${key}.title`)}
                summary={t(`items.${key}.summary`)}
                techStack={techStack}
                onRequireAuth={setGateReason}
              />
            </Reveal>
          ))}
        </RevealGroup>
      </Container>

      <CommunityGateModal
        isOpen={gateReason !== null}
        onClose={() => setGateReason(null)}
        message={gateReason ?? undefined}
      />
    </section>
  );
}
