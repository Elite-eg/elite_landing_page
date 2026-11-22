import { useTranslations } from "next-intl";
import { FiCheck } from "react-icons/fi";

/** Leave request approved from the manager's phone (Figma "Float/Approval"). */
export function ApprovalFloat() {
  const t = useTranslations("albiruni.mockup.floats.approval");

  return (
    <div className="flex items-center gap-[13px] whitespace-nowrap rounded-[21px] bg-surface px-[18px] py-4 leading-tight shadow-widget">
      <span className="rounded-2xl bg-success/10 p-2.5 text-success">
        <FiCheck className="size-[21px]" strokeWidth={3} />
      </span>
      <div className="flex flex-col items-start gap-[3px]">
        <p className="font-heading text-base font-semibold leading-tight text-body">{t("title")}</p>
        <p className="text-[13.5px] text-content">{t("detail")}</p>
      </div>
    </div>
  );
}
