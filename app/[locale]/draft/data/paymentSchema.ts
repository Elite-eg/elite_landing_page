import { z } from "zod";
import { PATTERNS } from "@/lib/validation";
import type { PaymentMethodKey } from "@/lib/countries";

/** Card fields are only validated when paying by card. Messages are keys in the "validation" namespace. */
export const paymentSchema = z
  .object({
    method: z.custom<PaymentMethodKey>(),
    cardNumber: z.string().trim(),
    cardExpiry: z.string().trim(),
    cardCvc: z.string().trim(),
  })
  .superRefine((values, ctx) => {
    if (values.method !== "card") return;
    const checks = [
      { path: "cardNumber", pattern: PATTERNS.cardNumber, message: "cardNumberInvalid" },
      { path: "cardExpiry", pattern: PATTERNS.cardExpiry, message: "cardExpiryInvalid" },
      { path: "cardCvc", pattern: PATTERNS.cardCvc, message: "cardCvcInvalid" },
    ] as const;
    for (const { path, pattern, message } of checks) {
      if (!pattern.test(values[path])) ctx.addIssue({ code: "custom", path: [path], message });
    }
  });

export type PaymentValues = z.infer<typeof paymentSchema>;
