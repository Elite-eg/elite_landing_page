import { z } from "zod";
import { COUNTRY_CODES, type CountryCode } from "@/lib/countries";
import { choiceOf, mobileNumberCheck, phoneFieldsSchema } from "@/lib/validation";
import { BUSINESS_ACTIVITIES, ERP_EXPERIENCE, SALES_TEAM_SIZES } from "./agentsData";

/** Error messages are message keys inside the "validation" namespace. The automatic phone code follows the country. */
export const agencySchema = z
  .object({
    companyName: z.string().trim().min(1, "companyNameRequired"),
    contactName: z.string().trim().min(1, "nameRequired"),
    country: z.enum(COUNTRY_CODES),
    city: z.string().trim().min(1, "cityRequired"),
    ...phoneFieldsSchema("mobileRequired"),
    email: z.string().trim().min(1, "emailRequired").email("emailInvalid"),
    commercialRegister: z.string().trim().min(1, "commercialRegisterRequired"),
    salesTeamSize: choiceOf(SALES_TEAM_SIZES, "salesTeamSizeRequired"),
    activities: z.array(z.enum(BUSINESS_ACTIVITIES)).min(1, "activitiesRequired"),
    erpExperience: choiceOf(ERP_EXPERIENCE, "erpExperienceRequired"),
    about: z.string().trim().min(1, "companyAboutRequired"),
    consent: z.boolean().refine((agreed) => agreed, "consentRequired"),
  })
  .superRefine((values, ctx) => mobileNumberCheck(values.country)(values, ctx));

export type AgencyValues = z.infer<typeof agencySchema>;

/** What is sent, and what the confirmation repeats: the values, with the phone in international form. */
export type SentAgencyApplication = Omit<AgencyValues, "phoneCountry">;

/** Empty form: the country starts at the visitor's country, the phone code is automatic (""). */
export const emptyAgencyValues = (country: CountryCode): AgencyValues => ({
  companyName: "",
  contactName: "",
  country,
  city: "",
  phoneCountry: "",
  phone: "",
  email: "",
  commercialRegister: "",
  salesTeamSize: "",
  activities: [],
  erpExperience: "",
  about: "",
  consent: false,
});
