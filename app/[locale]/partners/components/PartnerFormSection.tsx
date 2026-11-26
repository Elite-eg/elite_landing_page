"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FormSection } from "@/app/components/shared/FormSection";
import { PARTNER_FORM_ID } from "../data/partnersData";
import type { SentPartnerApplication } from "../data/partnerSchema";
import { PartnerForm } from "./PartnerForm";
import { PartnerSuccess } from "./PartnerSuccess";

/**
 * Join form ("Join the program" in the hero scrolls here). The card swaps in place for the confirmation once the
 * backend accepted the application (2xx).
 */
export function PartnerFormSection() {
  const [sent, setSent] = useState<SentPartnerApplication | null>(null);

  return (
    <FormSection id={PARTNER_FORM_ID}>
      <AnimatePresence mode="wait" initial={false}>
        {sent ? <PartnerSuccess key="success" application={sent} /> : <PartnerForm key="form" onSent={setSent} />}
      </AnimatePresence>
    </FormSection>
  );
}
