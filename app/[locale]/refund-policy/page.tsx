import type { Metadata } from "next";
import { PolicyPage } from "@/app/components/shared/policy/PolicyPage";
import { buildPolicyMetadata } from "@/app/components/shared/policy/policyMetadata";

interface RefundPolicyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: RefundPolicyPageProps): Promise<Metadata> {
  return buildPolicyMetadata("refund", (await params).locale);
}

export default function RefundPolicyPage() {
  return <PolicyPage policy="refund" />;
}
