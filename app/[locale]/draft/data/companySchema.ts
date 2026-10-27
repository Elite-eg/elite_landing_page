import { z } from "zod";
import type { CountryCode } from "@/lib/countries";
import { mobileNumberCheck, phoneFieldsSchema } from "@/lib/validation";

/**
 * Error messages are message keys inside the "validation" namespace. Built per country: the phone number is checked
 * against the automatic code (the company country) until the visitor picks one.
 */
export const companySchema = (country: CountryCode) =>
  z
    .object({
      companyName: z.string().trim().min(1, "companyNameRequired"),
      taxNumber: z.string().trim(),
      contactName: z.string().trim().min(1, "nameRequired"),
      ...phoneFieldsSchema(),
      email: z.string().trim().min(1, "emailRequired").email("emailInvalid"),
    })
    .superRefine(mobileNumberCheck(country));

export type CompanyDetails = z.infer<ReturnType<typeof companySchema>>;

export const EMPTY_COMPANY: CompanyDetails = {
  companyName: "",
  taxNumber: "",
  contactName: "",
  phoneCountry: "",
  phone: "",
  email: "",
};
