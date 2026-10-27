import { z } from "zod";
import { COUNTRY_CODES, type CountryCode } from "@/lib/countries";
import { choiceOf, mobileNumberCheck, phoneFieldsSchema } from "@/lib/validation";
import { COMPANY_SIZES, CONTACT_NEEDS } from "./contactData";

/** Error messages are message keys inside the "validation" namespace. The automatic phone code follows the country. */
export const contactSchema = z
  .object({
    fullName: z.string().trim().min(1, "nameRequired"),
    companyName: z.string().trim().min(1, "companyNameRequired"),
    email: z.string().trim().min(1, "emailRequired").email("emailInvalid"),
    ...phoneFieldsSchema("mobileRequired"),
    country: z.enum(COUNTRY_CODES),
    companySize: choiceOf(COMPANY_SIZES, "companySizeRequired"),
    need: choiceOf(CONTACT_NEEDS, "needRequired"),
    message: z.string().trim(),
  })
  .superRefine((values, ctx) => mobileNumberCheck(values.country)(values, ctx));

export type ContactValues = z.infer<typeof contactSchema>;

/** What is sent, and what the confirmation repeats: the values, with the phone in international form ("+20 1122999933"). */
export type SentContactRequest = Omit<ContactValues, "phoneCountry">;

/** Empty form: the country starts at the visitor's country, the phone code is automatic (""). */
export const emptyContactValues = (country: CountryCode): ContactValues => ({
  fullName: "",
  companyName: "",
  email: "",
  phoneCountry: "",
  phone: "",
  country,
  companySize: "",
  need: "",
  message: "",
});
