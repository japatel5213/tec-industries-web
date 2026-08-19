import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Become a TEC Distributor — Dealership & Channel Partner Application | Vapi, Gujarat',
  description: 'Apply to become a TEC INDUSTRIES distributor or channel partner. Direct manufacturer pricing, high-margin volume tiers and territory protection for PPR, HDPE, Electrofusion and Valve dealers across India.',
  alternates: { canonical: '/dealer' },
};

export default function DealerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
