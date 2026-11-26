import { z } from "zod";
import type { CountryCode } from "@/lib/countries";
import { choiceOf, mobileNumberCheck, phoneFieldsSchema } from "@/lib/validation";
import { CLIENT_COUNT_RANGES, OFFICE_TYPES, PARTNER_CITIES } from "./partnersData";

/**
 * Error messages are message keys inside the "validation" namespace. Built per country (the visitor's): the city
 * must be one of its cities, and the mobile number is checked against its code until the visitor picks one.
 */
export const partnerSchema = (country: CountryCode) =>
  z
    .object({
      officeName: z.string().trim().min(1, "officeNameRequired"),
      fullName: z.string().trim().min(1, "nameRequired"),
      ...phoneFieldsSchema("mobileRequired"),
      email: z.string().trim().min(1, "emailRequired").email("emailInvalid"),
      city: choiceOf(PARTNER_CITIES[country], "cityChoiceRequired"),
      clientCount: choiceOf(CLIENT_COUNT_RANGES, "clientCountRequired"),
      officeType: choiceOf(OFFICE_TYPES, "officeTypeRequired"),
    })
    .superRefine(mobileNumberCheck(country));

export type PartnerValues = z.infer<ReturnType<typeof partnerSchema>>;

/**
 * What is sent, and what the confirmation repeats: the values with the phone in international form, and the
 * visitor's country (the city list it was picked from).
 */
export type SentPartnerApplication = Omit<PartnerValues, "phoneCountry"> & { country: CountryCode };

/** Empty form: nothing chosen yet, the phone code is automatic (""). */
export const EMPTY_PARTNER_VALUES: PartnerValues = {
  officeName: "",
  fullName: "",
  phoneCountry: "",
  phone: "",
  email: "",
  city: "",
  clientCount: "",
  officeType: "",
};
