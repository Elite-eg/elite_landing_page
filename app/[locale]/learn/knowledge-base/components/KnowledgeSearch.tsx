"use client";

import { useTranslations } from "next-intl";
import { FiSearch } from "react-icons/fi";
import { InputField } from "@/app/components/shared/form-handlers/InputField";

export interface KnowledgeSearchProps {
  value: string;
  onChange: (value: string) => void;
}

/** Search box under the hero copy; results update while typing (the label stays for screen readers). */
export function KnowledgeSearch({ value, onChange }: KnowledgeSearchProps) {
  const t = useTranslations("learn.knowledgeBase.search");

  return (
    <div role="search" className="max-w-xl">
      <InputField
        type="search"
        enterKeyHint="search"
        autoComplete="off"
        label={t("label")}
        hideLabel
        placeholder={t("placeholder")}
        icon={<FiSearch className="size-5" />}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
