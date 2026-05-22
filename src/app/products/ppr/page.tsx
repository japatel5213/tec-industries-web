import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/ProductPageTemplate';

export const metadata: Metadata = {
  title: 'PPR Pipe & Fittings',
  description: 'TEC INDUSTRIES PPR Pipe & Fittings — ISI marked, ISO certified. Pressure ratings PN10/PN16/PN20. Ideal for hot & cold water plumbing. Manufactured in Vapi, Gujarat.',
};

export default function PPRPage() {
  return (
    <ProductPageTemplate
      badge="Primary Product"
      name="PPR Pipe & Fittings"
      tagline="Polypropylene Random Copolymer"
      description="TEC INDUSTRIES PPR Pipes and Fittings are manufactured from premium polypropylene random copolymer (Type 3) material. Designed for hot and cold water distribution, they offer exceptional temperature resistance, long service life, and zero corrosion — making them the ideal choice for residential, commercial, and industrial plumbing systems."
      image="/assets/ppr-pipes.png"
      specs={[
        { label: 'Material', value: 'PPR-R Type 3 (ISO 15874)' },
        { label: 'Size Range', value: '20mm – 110mm' },
        { label: 'Pressure Rating', value: 'PN10 / PN16 / PN20' },
        { label: 'Temperature Range', value: '-20°C to +95°C (continuous)' },
        { label: 'Max. Working Pressure', value: 'Up to 20 bar' },
        { label: 'Pipe Length', value: '4m standard (custom available)' },
        { label: 'Colour', value: 'Green / Grey / White' },
        { label: 'Standard', value: 'IS 15801 / ISO 15874 / DIN 8077/8078' },
        { label: 'Certification', value: 'ISI Marked, ISO 9001:2015' },
        { label: 'Joint System', value: 'Heat fusion (socket welding)' },
      ]}
      features={[
        'Excellent resistance to high temperatures up to 95°C continuously',
        'Zero corrosion, scaling, or encrustation — maintains water purity',
        'Lightweight: 1/8th the weight of steel pipes — easy handling and installation',
        'Smooth inner bore reduces friction loss and noise',
        'Long service life: 50+ years under rated conditions',
        'Chemical resistant to most acids, alkalis, and solvents',
        'Heat fusion joints eliminate need for adhesives or fittings — no leak points',
        'ISI marked and ISO certified for quality assurance',
        'Wide range of fittings: elbows, tees, couplings, unions, valves, flanges',
      ]}
      applications={[
        { name: 'Hot & Cold Water Plumbing', desc: 'Residential and commercial water distribution for hot and cold systems.' },
        { name: 'Heating Systems', desc: 'Underfloor heating, radiator circuits, and HVAC systems.' },
        { name: 'Chemical Industry', desc: 'Transporting mild chemicals and process fluids in controlled environments.' },
        { name: 'Compressed Air Lines', desc: 'Suitable for compressed air distribution in workshops and factories.' },
        { name: 'Swimming Pool Systems', desc: 'Chlorine and chemical resistant — ideal for pool circulation systems.' },
        { name: 'Irrigation Systems', desc: 'Drip irrigation and sprinkler systems in agriculture and horticulture.' },
      ]}
      relatedProducts={[
        { name: 'HDPE Pipe & Fittings', href: '/products/hdpe' },
        { name: 'Electrofusion Fittings', href: '/products/electrofusion' },
        { name: 'Industrial Valves', href: '/products/valves' },
        { name: 'PPR Fusion Machine', href: '/products/fusion-machine' },
      ]}
    />
  );
}
