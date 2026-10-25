"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence } from "framer-motion";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { AGENCY_FORM_ID } from "../data/agentsData";
import type { SentAgencyApplication } from "../data/agencySchema";
import { AgencyForm } from "./AgencyForm";
import { AgencySuccess } from "./AgencySuccess";

/**
 * Application form ("Apply for agency" in the hero scrolls here). The form's card swaps in place for the
 * confirmation once the backend accepted the application (2xx).
 */
export function AgencyFormSection() {
  const t = useTranslations("agents.form");
  const [sent, setSent] = useState<SentAgencyApplication | null>(null);

  return (
    <section id={AGENCY_FORM_ID} className="bg-surface-alt py-20 sm:py-24">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} size="compact" headingClassName="text-body" className="mb-8" />

        <Reveal className="mx-auto max-w-[47.5rem]">
          <div className="rounded-3xl bg-surface p-6 sm:p-10">
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <AgencySuccess key="success" application={sent} />
              ) : (
                <AgencyForm key="form" onSent={setSent} />
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
