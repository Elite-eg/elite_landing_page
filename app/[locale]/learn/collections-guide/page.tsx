import type { Metadata } from "next";
import { GuideLanding } from "@/app/components/shared/guide/GuideLanding";
import { buildGuideMetadata } from "@/app/components/shared/guide/guideMetadata";

interface CollectionsGuidePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: CollectionsGuidePageProps): Promise<Metadata> {
  return buildGuideMetadata("collections", (await params).locale);
}

export default function CollectionsGuidePage() {
  return <GuideLanding guide="collections" />;
}
