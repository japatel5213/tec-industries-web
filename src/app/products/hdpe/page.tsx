import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/ProductPageTemplate';

export const metadata: Metadata = {
  title: 'HDPE Pipe & Fittings — PE 100, 20–630 mm | TEC INDUSTRIES',
  description: 'TEC INDUSTRIES HDPE Pipe & Fittings — PE 100, manufactured to IS 4984 / ISO 4427 / EN 12201. Size range 20–630 mm. PN6 to PN16. Pan-India. Made in Vapi, Gujarat.',
  keywords: ['HDPE pipe PE100', 'HDPE pipe 630mm', 'water supply HDPE', 'irrigation HDPE pipe', 'IS 4984 HDPE'],
  alternates: { canonical: '/products/hdpe' },
};

export default function HDPEPage() {
  return (
    <ProductPageTemplate
      name="HDPE Pipe & Fittings"
      tagline="PE 100 · IS 4984 · ISO 4427 · EN 12201"
      description="TEC INDUSTRIES HDPE Pipes are manufactured from PE 100 high-density polyethylene, offering superior performance for underground water supply, irrigation, sewage, industrial fluid transport, and municipal infrastructure. Their flexibility, impact resistance, and 50-year design life make them the preferred choice for demanding installation environments across India."
      image="/assets/hdpe-pipes.png"
      specs={[
        { label: 'Material', value: 'PE 100 (standard) · PE 80 (legacy applications on request)' },
        { label: 'Size Range', value: '20 mm – 630 mm' },
        { label: 'Pressure Classes', value: 'PN6 / PN8 / PN10 / PN12.5 / PN16' },
        { label: 'SDR Range', value: 'SDR 41 (PN6) to SDR 11 (PN16)' },
        { label: 'Service Temperature', value: '-40°C to +40°C (pressure service); higher non-pressure' },
        { label: 'Design Life', value: '50 years (PE 100 at 20°C, rated pressure)' },
        { label: 'Standard Length', value: '6 m and 12 m bars; coils available 20–110 mm' },
        { label: 'Colours', value: 'Black (standard) · Black with blue stripes (potable water) · Black with yellow stripes (gas)' },
        { label: 'Standards Compliance', value: 'IS 4984 · ISO 4427 · EN 12201' },
        { label: 'Joint Methods', value: 'Butt fusion · electrofusion · compression fittings · flanged' },
        { label: 'Certification', value: 'Manufactured to IS 4984 / ISO 4427 / EN 12201 specifications. BIS certification under process.' },
      ]}
      features={[
        'PE 100 material provides 50+ year design life underground at rated pressure',
        'Excellent flexibility — bends without cracking, ideal for trenchless and HDD installation',
        'Resistant to all soil conditions including acidic, saline, and rocky ground',
        'Leak-free butt fusion and electrofusion joints — no gaskets or mechanical joints required',
        'Low friction coefficient (smooth bore) reduces pumping energy costs',
        'UV stabilised black grade for surface and above-ground installations',
        'Impact resistant even at sub-zero temperatures (-40°C)',
        'Suitable for non-potable, potable water, industrial effluent, and low-pressure gas',
      ]}
      applications={[
        { name: 'Underground Water Supply', desc: 'Municipal water mains, distribution networks, and service connections.' },
        { name: 'Drip & Sprinkler Irrigation', desc: 'Main supply lines for large-scale agricultural drip and sprinkler irrigation.' },
        { name: 'Sewage & Drainage', desc: 'Pressure sewer and gravity drainage in urban and rural infrastructure.' },
        { name: 'Mining & Industrial', desc: 'Slurry transport, mine dewatering, and process fluid piping.' },
        { name: 'Gas Distribution', desc: 'Low-pressure gas networks with yellow-stripe specification.' },
        { name: 'Trenchless Installation', desc: 'Horizontal directional drilling (HDD) and pipe bursting applications.' },
      ]}
      relatedProducts={[
        { name: 'PPR Pipe & Fittings', href: '/products/ppr' },
        { name: 'Electrofusion Fittings', href: '/products/electrofusion' },
        { name: 'Industrial Valves', href: '/products/valves' },
        { name: 'Pipe Support System', href: '/products/pipe-support' },
      ]}
    />
  );
}
