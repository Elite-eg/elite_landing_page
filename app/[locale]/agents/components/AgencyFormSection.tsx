"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FormSection } from "@/app/components/shared/FormSection";
import { AGENCY_FORM_ID } from "../data/agentsData";
import type { SentAgencyApplication } from "../data/agencySchema";
import { AgencyForm } from "./AgencyForm";
import { AgencySuccess } from "./AgencySuccess";

/**
 * Application form ("Apply for agency" in the hero scrolls here). The form's card swaps in place for the
 * confirmation once the backend accepted the application (2xx).
 */
export function AgencyFormSection() {
  const [sent, setSent] = useState<SentAgencyApplication | null>(null);

  return (
    <FormSection id={AGENCY_FORM_ID}>
      <AnimatePresence mode="wait" initial={false}>
        {sent ? <AgencySuccess key="success" application={sent} /> : <AgencyForm key="form" onSent={setSent} />}
      </AnimatePresence>
    </FormSection>
  );
}
