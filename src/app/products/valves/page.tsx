import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/ProductPageTemplate';
export const metadata: Metadata = { title: 'Industrial Valves', description: 'TEC INDUSTRIES Industrial Valves — ball valves, gate valves, and butterfly valves in PP, PVC, and metal. For industrial piping flow control.' };
export default function ValvesPage() {
  return (
    <ProductPageTemplate
      name="Industrial Valves"
      tagline="Flow Control Solutions"
      description="TEC INDUSTRIES offers a comprehensive range of industrial valves including ball valves, gate valves, check valves, and butterfly valves. Available in polypropylene, PVC, and metal construction — engineered for reliable flow control, isolation, and regulation in industrial piping systems across all sectors."
      image="/assets/valves.png"
      specs={[
        { label: 'Types', value: 'Ball, Gate, Check, Butterfly, Foot Valves' },
        { label: 'Materials', value: 'PP, CPVC, PVC, Cast Iron, SS 316' },
        { label: 'Size Range', value: '15mm – 300mm (½" – 12")' },
        { label: 'Pressure Rating', value: 'PN6 / PN10 / PN16' },
        { label: 'End Connections', value: 'Socket, Threaded, Flanged' },
        { label: 'Temperature', value: 'Up to 90°C (PP/CPVC), 60°C (PVC)' },
        { label: 'Actuation', value: 'Manual, Pneumatic, Electric actuator options' },
        { label: 'Standard', value: 'IS 778 / IS 780 / ISO 5211' },
        { label: 'Seal Materials', value: 'EPDM, FKM, PTFE' },
        { label: 'Certification', value: 'ISO 9001:2015' },
      ]}
      features={[
        'Full bore ball valves for zero pressure drop in open position',
        'Corrosion-proof PP and CPVC bodies — ideal for chemical service',
        'PTFE seat and EPDM seals for leak-proof shutoff',
        'Lightweight plastic valves — ideal for PPR and HDPE systems',
        'Pneumatic and electric actuator options for automated systems',
        'Flanged connections compatible with standard flange drillings',
        'True union design for easy inline maintenance without pipe removal',
        'Low operating torque — easy manual operation even at high pressure',
      ]}
      applications={[
        { name: 'Water Treatment Plants', desc: 'Flow isolation and control in water treatment and distribution systems.' },
        { name: 'Chemical Processing', desc: 'Corrosion-resistant PP and CPVC valves for chemical dosing and transfer.' },
        { name: 'HVAC Systems', desc: 'Flow balancing and isolation in heating and cooling water circuits.' },
        { name: 'Agriculture & Irrigation', desc: 'Main line isolation valves and section control for irrigation systems.' },
        { name: 'Industrial Piping', desc: 'General flow control and isolation in manufacturing process piping.' },
        { name: 'Swimming Pools', desc: 'Chemical-resistant valves for pool water circulation and treatment systems.' },
      ]}
      relatedProducts={[
        { name: 'PPR Pipe & Fittings', href: '/products/ppr' },
        { name: 'HDPE Pipe & Fittings', href: '/products/hdpe' },
        { name: 'Pipe Support System', href: '/products/pipe-support' },
      ]}
    />
  );
}
