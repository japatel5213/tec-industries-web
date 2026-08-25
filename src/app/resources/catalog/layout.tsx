import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resources & Catalog Download',
  description: 'Download TEC INDUSTRIES product catalogs and technical datasheets for PPR, HDPE, Electrofusion, Valves, Pipe Support Systems and Cooling Towers.',
  alternates: { canonical: '/resources/catalog' },
};

export default function ResourcesCatalogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
