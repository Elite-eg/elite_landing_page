"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
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
    <div className="rounded-3xl border border-edge bg-surface p-6 shadow-card sm:p-9">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <ContactSuccess key="success" request={sent} onNewMessage={startNewMessage} />
        ) : (
          <ContactForm key="form" onSent={setSent} focusFirstField={isAnotherMessage} />
        )}
      </AnimatePresence>
    </div>
  );
}
