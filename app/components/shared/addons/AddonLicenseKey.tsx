"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { FiCheck, FiCopy, FiKey } from "react-icons/fi";

export interface AddonLicenseKeyProps {
  licenseKey: string;
}

/** How long the copy button shows its check mark. */
const COPIED_MS = 2000;

/**
 * A bought add-on's license key (Figma "License"): key icon, label, the key, and a copy button (check mark + toast).
 * The key also selects in one click, for copying by hand.
 */
export function AddonLicenseKey({ licenseKey }: AddonLicenseKeyProps) {
  const t = useTranslations("addons.license");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), COPIED_MS);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copyKey = async () => {
    try {
      await navigator.clipboard.writeText(licenseKey);
      setCopied(true);
      toast.success(t("copied"));
    } catch {
      toast.error(t("copyError"));
    }
  };

  // One row; on narrow cards the key and its button move under the label (end side) instead of squeezing.
  return (
    <div className="flex flex-wrap items-center gap-x-2.5 rounded-xl bg-surface-alt py-2 pe-2 ps-3.5 text-caption">
      <span className="flex min-h-8 flex-1 items-center gap-2.5 whitespace-nowrap text-content">
        {/* Feather's key is diagonal; turned 45° it lies flat like the Figma's. */}
        <FiKey aria-hidden="true" className="size-4 shrink-0 rotate-45 text-primary" />
        {t("label")}
      </span>
      <span className="ms-auto flex items-center gap-1.5">
        <span className="select-all whitespace-nowrap font-semibold text-body">{licenseKey}</span>
        <button
          type="button"
          onClick={copyKey}
          aria-label={t("copy")}
          className="grid size-8 shrink-0 place-items-center rounded-full text-content transition-colors duration-200 hover:bg-surface hover:text-primary"
        >
          {copied ? <FiCheck aria-hidden="true" className="size-4 text-success" /> : <FiCopy aria-hidden="true" className="size-4" />}
        </button>
      </span>
    </div>
  );
}
