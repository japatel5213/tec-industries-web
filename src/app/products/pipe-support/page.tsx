import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/ProductPageTemplate';
export const metadata: Metadata = { title: 'Pipe Support System', description: 'TEC INDUSTRIES Pipe Support Systems — hangers, brackets, clamps, and channel supports for secure pipe installation. Hot-dip galvanised and stainless options.' };
export default function PipeSupportPage() {
  return (
    <ProductPageTemplate
      name="Pipe Support System"
      tagline="Secure Pipe Installation"
      description="TEC INDUSTRIES Pipe Support Systems provide comprehensive solutions for secure, stable pipe installation across all environments. From lightweight clamps for small-bore PPR pipes to heavy-duty channel supports for large HDPE industrial piping, our range covers every installation requirement with precision-engineered components."
      image="/assets/pipe-support.png"
      specs={[
        { label: 'Types', value: 'Hangers, Brackets, Clamps, Channel Supports, Anchors' },
        { label: 'Materials', value: 'MS (Galvanised), SS 304/316, PP' },
        { label: 'Pipe Size Range', value: '15mm – 500mm' },
        { label: 'Finish Options', value: 'Hot-dip galvanised, Zinc plated, Powder coated, SS mirror' },
        { label: 'Channel Section', value: '41×41mm / 41×62mm (Unistrut compatible)' },
        { label: 'Load Capacity', value: 'Up to 500 kg (heavy-duty channel systems)' },
        { label: 'Standard', value: 'IS 1239 / BS 4 / DIN 3015' },
        { label: 'Insulation Clamps', value: 'Available for insulated pipe systems' },
        { label: 'Custom Fabrication', value: 'Available on request' },
        { label: 'Certification', value: 'ISO 9001:2015' },
      ]}
      features={[
        'Hot-dip galvanised finish for superior corrosion resistance in exposed environments',
        'Stainless steel 304/316 options for chemical and marine environments',
        'Adjustable riser clamps for vertical pipe runs',
        'Pre-insulated clamps available for hot water and HVAC applications',
        'Channel support systems accept standard Unistrut fittings and accessories',
        'Rubber-lined clamps to prevent pipe damage and reduce noise/vibration',
        'All sizes available from stock — fast delivery across India',
        'Custom-designed supports for special pipe configurations on request',
      ]}
      applications={[
        { name: 'Building Services', desc: 'Plumbing, HVAC, and fire protection pipe runs in commercial buildings.' },
        { name: 'Industrial Piping', desc: 'Process piping support in factories, plants, and refineries.' },
        { name: 'Data Centres', desc: 'Overhead pipe support systems for cooling water and chilled water piping.' },
        { name: 'Pharmaceutical Plants', desc: 'SS 316 pipe supports for hygienic process piping in cleanroom environments.' },
        { name: 'Marine & Offshore', desc: 'Corrosion-resistant supports for shipboard and offshore platform piping.' },
        { name: 'Infrastructure Projects', desc: 'Bridge-mounted and tunnel pipe support systems for water mains.' },
      ]}
      relatedProducts={[
        { name: 'PPR Pipe & Fittings', href: '/products/ppr' },
        { name: 'HDPE Pipe & Fittings', href: '/products/hdpe' },
        { name: 'Industrial Valves', href: '/products/valves' },
      ]}
    />
  );
}
