"use client";

import { NextIntlClientProvider } from "next-intl";
import type { AbstractIntlMessages } from "next-intl";
import { MotionConfig } from "framer-motion";
import { useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/app/store";
import { APP_TIME_ZONE } from "@/lib/constants";
import type { CountryCode } from "@/lib/countries";

interface ProvidersProps {
  children: ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
  /** Visitor country found by the root layout; later changes go through the store (useCountry). */
  country: CountryCode;
}

export default function Providers({
  children,
  locale,
  messages,
  country,
}: ProvidersProps) {
  const [store] = useState(() => makeStore(country));

  return (
    <Provider store={store}>
      {/* Same fixed time zone as i18n/request.ts: the browser's own zone would differ from the server's. */}
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
        timeZone={APP_TIME_ZONE}
      >
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </NextIntlClientProvider>
    </Provider>
  );
}
