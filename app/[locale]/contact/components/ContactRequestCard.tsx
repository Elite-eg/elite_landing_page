"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FormCard } from "@/app/components/shared/form-handlers/FormCard";
import type { SentContactRequest } from "../data/contactSchema";
import { ContactForm } from "./ContactForm";
import { ContactSuccess } from "./ContactSuccess";

/**
 * The form's card: the request form, swapped in place for the confirmation once the backend accepted it (2xx).
 * "Send a new message" brings back an empty form with the first field focused.
 */
export function ContactRequestCard() {
  const [sent, setSent] = useState<SentContactRequest | null>(null);
  const [isAnotherMessage, setIsAnotherMessage] = useState(false);

  const startNewMessage = () => {
    setSent(null);
    setIsAnotherMessage(true);
  };

  return (
    <FormCard>
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <ContactSuccess key="success" request={sent} onNewMessage={startNewMessage} />
        ) : (
          <ContactForm key="form" onSent={setSent} focusFirstField={isAnotherMessage} />
        )}
      </AnimatePresence>
    </FormCard>
  );
}
