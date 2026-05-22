import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/ProductPageTemplate';
export const metadata: Metadata = { title: 'PPR Pipe Fusion Machine', description: 'TEC INDUSTRIES PPR Pipe Fusion Machines — professional-grade heat fusion welding tools for PPR pipe installation. 20mm to 110mm capacity. For contractors and installers.' };
export default function FusionMachinePage() {
  return (
    <ProductPageTemplate
      name="PPR Pipe Fusion Machine"
      tagline="Professional Pipe Welding Tool"
      description="TEC INDUSTRIES PPR Pipe Fusion Machines are professional-grade heat fusion welding tools designed for reliable, precise socket welding of PPR pipes. Built to withstand demanding job site conditions, they feature digital temperature control, ergonomic design, and complete fitting sets — everything a PPR installer needs in one kit."
      image="/assets/fusion-machine.png"
      specs={[
        { label: 'Pipe Capacity', value: '20mm / 25mm / 32mm / 40mm / 50mm / 63mm / 75mm / 90mm / 110mm' },
        { label: 'Heating Temperature', value: '260°C ± 10°C (adjustable)' },
        { label: 'Power Supply', value: '230V / 50Hz, Single Phase' },
        { label: 'Power Rating', value: '800W (entry) / 1500W (pro)' },
        { label: 'Preheat Time', value: '3–5 minutes to operating temperature' },
        { label: 'Non-stick Coating', value: 'PTFE coated heating moulds' },
        { label: 'Handle Material', value: 'Ergonomic PP grip with heat shield' },
        { label: 'Accessories Included', value: 'Pipe cutter, deburring tool, carrying case' },
        { label: 'Weight', value: '1.2 kg (800W) / 1.8 kg (1500W)' },
        { label: 'Standard', value: 'IS 15801 / ISO 10508 fusion process' },
      ]}
      features={[
        'Digital temperature indicator ensures precise welding temperature every time',
        'PTFE non-stick coated dies prevent pipe material from sticking',
        'Rapid heat-up: reaches 260°C in under 5 minutes',
        'Complete fitting set included — elbows, tees, couplings for all sizes',
        'Ergonomic anti-slip handle for comfortable one-hand operation',
        'Integrated stand keeps machine stable while holding pipe during fusion',
        'Durable aluminium body withstands construction site conditions',
        'Ideal for PPR pipe installers, plumbers, and contractors',
      ]}
      applications={[
        { name: 'Residential Plumbing', desc: 'Hot and cold water pipe installation in apartments and houses.' },
        { name: 'Commercial Projects', desc: 'Large-scale PPR plumbing installations in hotels, hospitals, and offices.' },
        { name: 'Industrial Facilities', desc: 'Process water and compressed air PPR pipe welding in factories.' },
        { name: 'HVAC Systems', desc: 'Heating and cooling circuit PPR pipe fusion for HVAC contractors.' },
        { name: 'Contractor Use', desc: 'Daily use tool for professional PPR pipe installers and plumbing contractors.' },
        { name: 'PPR Training', desc: 'TEC INDUSTRIES offers PPR installation training using our fusion machines.' },
      ]}
      relatedProducts={[
        { name: 'PPR Pipe & Fittings', href: '/products/ppr' },
        { name: 'HDPE Pipe & Fittings', href: '/products/hdpe' },
        { name: 'Industrial Valves', href: '/products/valves' },
      ]}
    />
  );
}
