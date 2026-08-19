import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/ProductPageTemplate';
export const metadata: Metadata = { title: 'Electrofusion Fittings — Leak-proof PE Joints | TEC INDUSTRIES', description: 'TEC INDUSTRIES Electrofusion Fittings — precision PE fittings for leak-proof joints in water and gas pipe networks. Couplings, saddles, elbows, and tees. Manufactured in Vapi, Gujarat.', alternates: { canonical: '/products/electrofusion' } };
export default function ElectrofusionPage() {
  return (
    <ProductPageTemplate
      name="Electrofusion Fittings"
      tagline="Precision Electrofusion Welding"
      description="TEC INDUSTRIES Electrofusion Fittings are manufactured from PE 100 material with embedded resistance wire, enabling reliable, automated joint formation with an electrofusion controller. They deliver consistently leak-free connections in gas and water distribution pipelines, even in constrained or difficult access conditions."
      image="/assets/electrofusion.png"
      specs={[
        { label: 'Material', value: 'PE 100 (ISO 4427)' },
        { label: 'Size Range', value: '20mm – 400mm' },
        { label: 'Types Available', value: 'Couplings, Saddles, Elbows, Tees, Reducers, End Caps' },
        { label: 'Welding Voltage', value: '8V – 48V (barcode controlled)' },
        { label: 'Standard', value: 'ISO 8085 / EN 12201 / IS 14333' },
        { label: 'Temperature Range', value: '-10°C to +40°C service' },
        { label: 'Certification', value: 'ISO 9001:2015' },
        { label: 'Indicator Pins', value: 'Welding indicator pins for visual confirmation' },
        { label: 'Barcode', value: 'Welding parameters barcode on every fitting' },
        { label: 'Colour', value: 'Black' },
      ]}
      features={[
        'Fully automatic welding via barcode scan — eliminates operator error',
        'Indicator pins provide visual confirmation of successful weld',
        'Leak-free joints even under high pressure and thermal cycling',
        'Ideal for retrofitting, repairs, and connections in confined spaces',
        'Compatible with all major HDPE and PE pipes',
        'Withstands ground movement and seismic activity without joint failure',
        'Gas-tight joints certified for pressure gas applications',
        'No special pipe end preparation beyond facing and cleaning required',
      ]}
      applications={[
        { name: 'Gas Distribution Networks', desc: 'Low and medium pressure gas pipeline connections and repairs.' },
        { name: 'Potable Water Mains', desc: 'Municipal water distribution network connections and rehabilitation.' },
        { name: 'Service Connections', desc: 'Branch saddle connections to main distribution pipelines.' },
        { name: 'Pipeline Repairs', desc: 'Emergency repairs and in-line couplings for damaged pipeline sections.' },
        { name: 'Industrial Process Piping', desc: 'Chemical process pipelines requiring high-integrity leak-free joints.' },
        { name: 'Trenchless Rehabilitation', desc: 'End connections for pipe lining and trenchless repair methods.' },
      ]}
      relatedProducts={[
        { name: 'HDPE Pipe & Fittings', href: '/products/hdpe' },
        { name: 'PPR Pipe & Fittings', href: '/products/ppr' },
        { name: 'Industrial Valves', href: '/products/valves' },
      ]}
    />
  );
}
