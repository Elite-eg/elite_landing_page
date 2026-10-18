import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa6";
import { COMPANY_INFO } from "@/lib/constants";

/** Floating WhatsApp shortcut, anchored to the inline end so it mirrors in RTL. */
export function WhatsAppButton() {
  const t = useTranslations("whatsapp");

  return (
    <a
      href={`https://wa.me/${COMPANY_INFO.whatsappPhone}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("label")}
      title={t("label")}
      className="group fixed bottom-5 end-4 sm:end-6 z-50 grid size-12 sm:size-14 place-items-center rounded-full bg-whatsapp text-white shadow-lg shadow-whatsapp/30 transition-all duration-300 hover:scale-110 hover:bg-whatsapp-dark hover:shadow-xl hover:shadow-whatsapp/40 motion-reduce:transform-none overflow-hidden"
    >
      <span
        className="absolute inset-0 rounded-full bg-whatsapp/40 motion-safe:animate-ping"
        aria-hidden="true"
      />
      <FaWhatsapp className="relative size-6 sm:size-8 text-white drop-shadow-sm" aria-hidden="true" />
    </a>
  );
}

