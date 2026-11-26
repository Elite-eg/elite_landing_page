"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { FiSearch } from "react-icons/fi";
import { InputField } from "@/app/components/shared/form-handlers/InputField";
import { SubmitButton } from "@/app/components/shared/form-handlers/SubmitButton";
import { useAddonsQuery } from "../hooks/useAddonsQuery";

/**
 * Search box on the navy hero (Figma "Search"): the shared field inside a white bar, with the orange search button at
 * its end. The × empties the box and, when a search is showing, brings every add-on back.
 */
export function AddonsSearchForm() {
  const t = useTranslations("addons.search");
  const { query, setQuery } = useAddonsQuery();
  const [text, setText] = useState(query.q);
  const [shownQuery, setShownQuery] = useState(query.q);

  // A popular search or a reset changes the query elsewhere: refill the box (without remounting, so focus stays).
  if (query.q !== shownQuery) {
    setShownQuery(query.q);
    setText(query.q);
  }

  // A new search looks in every category (the other filters stay), so it doesn't come back empty for a leftover pill.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuery({ q: text.trim(), category: "all" });
  };

  const handleClear = () => {
    setText("");
    if (query.q) setQuery({ q: "" });
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="flex w-full max-w-[51.25rem] items-center gap-2 rounded-2xl bg-surface p-1.5"
    >
      <InputField
        type="search"
        enterKeyHint="search"
        autoComplete="off"
        label={t("label")}
        hideLabel
        placeholder={t("placeholder")}
        icon={<FiSearch className="size-5" />}
        value={text}
        onChange={(event) => setText(event.target.value)}
        onClear={handleClear}
        clearLabel={t("clear")}
        className="min-w-0 flex-1"
        inputClassName="border-transparent text-base"
      />
      <SubmitButton size="md" fullWidth={false} lift={false} className="shrink-0">
        {t("submit")}
      </SubmitButton>
    </form>
  );
}
