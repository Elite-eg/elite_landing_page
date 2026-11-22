import type { Metadata } from "next";
import { GuideLanding } from "@/app/components/shared/guide/GuideLanding";
import { buildGuideMetadata } from "@/app/components/shared/guide/guideMetadata";

interface ServiceAppGuidePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ServiceAppGuidePageProps): Promise<Metadata> {
  return buildGuideMetadata("serviceApp", (await params).locale);
}

export default function ServiceAppGuidePage() {
  return <GuideLanding guide="serviceApp" />;
}
