import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PPR Pipes & Fittings Catalogue',
  description: 'Browse TEC INDUSTRIES PPR pipe and fitting families, including elbows, tees, reducers, couplings, unions, flanges, valves and transition fittings. Request size- and project-specific documentation.',
  alternates: { canonical: '/resources/ppr-catalog' },
};

export default function PprCatalogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
