import type { Metadata } from "next";
import { GuideLanding } from "@/app/components/shared/guide/GuideLanding";
import { buildGuideMetadata } from "@/app/components/shared/guide/guideMetadata";

interface InstallationGuidePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: InstallationGuidePageProps): Promise<Metadata> {
  return buildGuideMetadata("installation", (await params).locale);
}

export default function InstallationGuidePage() {
  return <GuideLanding guide="installation" />;
}
