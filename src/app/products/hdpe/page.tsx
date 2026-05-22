import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/ProductPageTemplate';
export const metadata: Metadata = { title: 'HDPE Pipe & Fittings', description: 'TEC INDUSTRIES HDPE Pipe & Fittings — high-density polyethylene pipes for underground, industrial, and water distribution. Available in PN6 to PN16. Made in Vapi, Gujarat.' };
export default function HDPEPage() {
  return (
    <ProductPageTemplate
      name="HDPE Pipe & Fittings"
      tagline="High-Density Polyethylene"
      description="TEC INDUSTRIES HDPE Pipes are manufactured from high-quality PE 80 and PE 100 raw material, offering superior performance for underground water supply, irrigation, gas distribution, and industrial fluid transport. Their flexibility and impact resistance make them the preferred choice for challenging installation environments."
      image="/assets/hdpe-pipes.png"
      specs={[
        { label: 'Material', value: 'PE 80 / PE 100' },
        { label: 'Size Range', value: '20mm – 630mm' },
        { label: 'Pressure Class', value: 'PN6 / PN8 / PN10 / PN12.5 / PN16' },
        { label: 'SDR Range', value: 'SDR 11 to SDR 41' },
        { label: 'Colour', value: 'Black / Black with blue stripes (water)' },
        { label: 'Pipe Length', value: '6m / 12m standard coils available' },
        { label: 'Standard', value: 'IS 4984 / ISO 4427 / EN 12201' },
        { label: 'Certification', value: 'ISI Marked, ISO 9001:2015' },
        { label: 'Temperature Rating', value: 'Up to 40°C continuous' },
        { label: 'Joint Methods', value: 'Butt fusion, electrofusion, compression' },
      ]}
      features={[
        'PE 100 material provides 50+ year design life underground',
        'Excellent flexibility — bends without cracking, ideal for trenchless installation',
        'Resistant to all soil conditions including acidic, saline, and rocky ground',
        'Leak-free butt fusion joints — no gaskets or mechanical joints required',
        'Low friction coefficient reduces pumping energy costs',
        'UV stabilised black grade for surface and above-ground use',
        'Impact resistant even at sub-zero temperatures',
        'Suitable for non-potable, potable water, and industrial effluent',
      ]}
      applications={[
        { name: 'Underground Water Supply', desc: 'Municipal water mains, distribution networks, and service connections.' },
        { name: 'Drip Irrigation', desc: 'Main supply lines for large-scale agricultural drip and sprinkler irrigation.' },
        { name: 'Sewage & Drainage', desc: 'Pressure sewer and gravity drainage in urban and rural infrastructure.' },
        { name: 'Mining & Industrial', desc: 'Slurry transport, mine dewatering, and process fluid piping.' },
        { name: 'Gas Distribution', desc: 'Low-pressure gas networks with yellow stripe or yellow pipe.' },
        { name: 'Trenchless Installation', desc: 'Horizontal directional drilling (HDD) and pipe bursting applications.' },
      ]}
      relatedProducts={[
        { name: 'PPR Pipe & Fittings', href: '/products/ppr' },
        { name: 'Electrofusion Fittings', href: '/products/electrofusion' },
        { name: 'Industrial Valves', href: '/products/valves' },
      ]}
    />
  );
}
