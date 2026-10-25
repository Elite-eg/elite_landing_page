import type { Metadata } from "next";
import { PolicyPage } from "@/app/components/shared/policy/PolicyPage";
import { buildPolicyMetadata } from "@/app/components/shared/policy/policyMetadata";

interface SlaPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: SlaPageProps): Promise<Metadata> {
  return buildPolicyMetadata("sla", (await params).locale);
}

export default function SlaPage() {
  return <PolicyPage policy="sla" />;
}
