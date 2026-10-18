"use client";

import { NextIntlClientProvider } from "next-intl";
import type { AbstractIntlMessages } from "next-intl";
import { MotionConfig } from "framer-motion";
import { type ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { APP_TIME_ZONE } from "@/lib/constants";

interface ProvidersProps {
  children: ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}

export default function Providers({
  children,
  locale,
  messages,
}: ProvidersProps) {
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
