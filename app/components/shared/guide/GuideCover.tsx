import Image from "next/image";
import { COMPANY_INFO } from "@/lib/constants";
import { GuideCoverChart } from "./GuideCoverChart";

export interface GuideCoverProps {
  title: string;
  edition: string;
}

/** Tilted navy book mockup. Decorative: the page h1 already carries the title. */
export function GuideCover({ title, edition }: GuideCoverProps) {
  return (
    <div className="relative mx-auto w-56 [perspective:1400px] sm:w-64 lg:w-72" aria-hidden="true">
      <div className="absolute inset-x-6 -bottom-8 h-10 rounded-full bg-primary-deep/30 blur-2xl" />

      <div className="relative aspect-[3/4] [transform:rotateY(-14deg)_rotateZ(-2deg)] rtl:[transform:rotateY(14deg)_rotateZ(2deg)]">
        {/* Page block peeking out behind the cover */}
        <div className="absolute inset-y-2 -end-2 w-full rounded-e-2xl border border-edge bg-surface" />

        <div className="relative isolate flex h-full flex-col overflow-hidden rounded-e-2xl rounded-s-md bg-gradient-to-br from-primary via-primary-dark to-primary-deep p-6 shadow-lift">
          <div className="absolute inset-0 -z-10 bg-dot-grid-light opacity-50" />
          <div className="absolute -end-16 -top-16 -z-10 size-48 rounded-full bg-secondary/25 blur-3xl" />
          <div className="absolute inset-y-0 start-0 w-3 bg-gradient-to-r from-primary-deep/80 to-transparent rtl:bg-gradient-to-l" />

          <GuideCoverBrand />
          <GuideCoverChart />

          <p className="mt-auto text-balance font-heading text-2xl font-bold leading-snug text-white">{title}</p>
          <p className="mt-2 text-xs text-content-dark">{edition}</p>
        </div>
      </div>
    </div>
  );
}

function GuideCoverBrand() {
  return (
    <div dir="ltr" className="mb-8 flex items-center gap-2 self-start">
      <Image src="/images/logo-light.png" alt="" width={600} height={349} className="h-6 w-auto" />
      <span className="font-logo text-sm font-semibold">
        <span className="text-white">{COMPANY_INFO.wordmark.primary}</span>{" "}
        <span className="text-secondary">{COMPANY_INFO.wordmark.accent}</span>
      </span>
    </div>
  );
}
