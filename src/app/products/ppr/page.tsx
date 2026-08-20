import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/ProductPageTemplate';

export const metadata: Metadata = {
  title: 'PPR Pipe & Fittings — IS 15801 / ISO 15874, 20–160 mm | TEC INDUSTRIES',
  description: 'TEC INDUSTRIES PPR Pipe & Fittings — manufactured to IS 15801, ISO 15874, DIN 8077. Size range 20–160 mm. PN10/PN16/PN20/PN25. Industrial-grade. Vapi, Gujarat.',
  alternates: { canonical: '/products/ppr' },
};

export default function PPRPage() {
  return (
    <ProductPageTemplate
      badge="Primary Product"
      name="PPR Pipe & Fittings"
      tagline="PP-R Type 3 · IS 15801 · ISO 15874 · DIN 8077"
      description="TEC INDUSTRIES PPR Pipes and Fittings are manufactured from PP-R Type 3 material per ISO 15874 classification. Covering 20 mm to 160 mm in PN10 / PN16 / PN20 / PN25 pressure classes, our range is designed for industrial hot and cold water distribution, process water, chemical lines, HVAC, compressed air, and utility services — built to perform for 50 years at rated conditions."
      image="/assets/ppr-pipes.png"
      specs={[
        { label: 'Material', value: 'PP-R Type 3 (per ISO 15874 classification)' },
        { label: 'Size Range', value: '20 mm – 160 mm (industrial range)' },
        { label: 'Pressure Classes', value: 'PN10 / PN16 / PN20 / PN25' },
        { label: 'Service Temperature', value: '-15°C to +70°C continuous; +95°C short-term peak' },
        { label: 'Design Life', value: '50 years (at 20°C, rated pressure)' },
        { label: 'Pipe Length', value: '4 m standard bars; custom lengths on request' },
        { label: 'Available Colours', value: 'Green (standard) · Grey · White' },
        { label: 'Standards Compliance', value: 'IS 15801 · ISO 15874-1/-2/-3 · DIN 8077/8078' },
        { label: 'Joint System', value: 'Socket fusion (20–110 mm) and butt fusion (125 mm+) at 260°C per DVS 2207' },
        { label: 'Certification', value: 'Manufactured to IS 15801 / ISO 15874 specifications. BIS certification under process.' },
        { label: 'Quality Control', value: '100% batch-tested · hydrostatic pressure verified · dimensional and MFR controlled' },
      ]}
      features={[
        '50+ year design life at rated temperature and pressure',
        'Zero corrosion, zero scaling, zero leaching — maintains water purity for the life of the system',
        '1/8th the weight of steel — lower transportation, faster installation, reduced labour cost',
        'Smooth bore (k = 0.007 mm) reduces friction loss by up to 30% versus metal pipes',
        'Resistant to most inorganic acids, alkalis, and salts up to 60°C',
        'Homogeneous heat-fusion joints eliminate gasket and adhesive failure points',
        'Low thermal conductivity (0.24 W/m·K) — inherent insulation for hot and chilled water service',
        '100% recyclable thermoplastic — supports green building specifications',
        'Complete fittings ecosystem: elbows, tees, reducers, couplings, unions, flanges, valves, transition fittings',
      ]}
      applications={[
        { name: 'Industrial Hot & Cold Water', desc: 'Plant utility water, process water distribution, and commercial building plumbing — continuous service to 70°C.' },
        { name: 'Chemical Process Lines', desc: 'Resistant to inorganic acids (HCl, H₂SO₄, H₃PO₄ to 50%), alkalis (NaOH, KOH), and most salt solutions to 60°C. Ideal for chemical plants, fertilizer units, and effluent transfer.' },
        { name: 'HVAC & Chilled Water', desc: 'Low thermal conductivity (0.24 W/m·K) provides inherent insulation. Reduces heat loss versus copper or steel chilled water lines.' },
        { name: 'Compressed Air Networks', desc: 'Clean, corrosion-free compressed air at 6–25 bar. Smooth bore, no rust contamination — preferred for pharma, electronics, and food packaging plants.' },
        { name: 'Solar Water Heating', desc: 'Per IS 15801, suitable for collector loops at 60–95°C. Low conductivity minimises heat loss between collector and tank.' },
        { name: 'Food & Pharma Utility Water', desc: 'Non-toxic, BPA-free, no leaching. Fusion-welded homogeneous joints prevent biofilm. CIP-cleanable to 80°C.' },
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
