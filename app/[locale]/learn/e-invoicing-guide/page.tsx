import type { Metadata } from "next";
import { GuideLanding } from "@/app/components/shared/guide/GuideLanding";
import { buildGuideMetadata } from "@/app/components/shared/guide/guideMetadata";

interface EInvoicingGuidePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: EInvoicingGuidePageProps): Promise<Metadata> {
  return buildGuideMetadata("eInvoicing", (await params).locale);
}

export default function EInvoicingGuidePage() {
  return <GuideLanding guide="eInvoicing" />;
}
