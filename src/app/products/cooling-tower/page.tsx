import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/ProductPageTemplate';

export const metadata: Metadata = { 
  title: 'Cooling Towers', 
  description: 'TEC INDUSTRIES Industrial Cooling Towers — high-capacity FRP round and square cooling towers, available in 10 TR to 1000 TR range.' 
};

export default function CoolingTowerPage() {
  return (
    <ProductPageTemplate
      name="Cooling Towers"
      tagline="High-Efficiency Thermal Management"
      description="TEC INDUSTRIES manufactures and supplies premium FRP (Fibre-Reinforced Plastic) cooling towers. Available in both round bottle shapes and square configurations, our cooling towers scale from 10 TR up to 1000 TR capacity. Engineered for maximum heat transfer efficiency, minimal water loss, and long-term durability in harsh industrial environments."
      image="/assets/cooling-tower.png"
      specs={[
        { label: 'Capacity Range', value: '10 TR to 1000 TR' },
        { label: 'Designs', value: 'Round (Bottle Shape) & Square' },
        { label: 'Casing Material', value: 'FRP (Fibre-Reinforced Plastic)' },
        { label: 'Fills', value: 'High-efficiency PVC honeycomb fills' },
        { label: 'Fan Type', value: 'Aerodynamically designed axial flow fans' },
        { label: 'Motor', value: 'IP55 weatherproof / flameproof options' },
        { label: 'Water Distribution', value: 'Rotary sprinkler (Round) / Static target nozzle (Square)' },
        { label: 'Hardware', value: 'HDG (Hot Dip Galvanized) or SS 304/316' },
        { label: 'Applications', value: 'HVAC, Chemical, Pharma, Power, Plastic Molding' },
      ]}
      features={[
        'Corrosion-resistant FRP body ensures decades of maintenance-free service',
        'Aerodynamic fan design provides maximum air delivery with lower power consumption',
        'High-quality PVC honeycomb fills ensure maximum air-to-water heat transfer surface area',
        'Rotary sprinkler system in round models provides even water distribution',
        'Compact footprint saves valuable industrial real estate',
        'Easy access inspection doors for hassle-free maintenance',
        'Customisable with SS hardware and flame-proof motors for hazardous chemical environments',
      ]}
      applications={[
        { name: 'HVAC & Refrigeration', desc: 'Central air conditioning plants and large-scale commercial refrigeration.' },
        { name: 'Chemical Processing', desc: 'Process fluid cooling for reactors and chemical synthesis plants.' },
        { name: 'Plastic & Molding', desc: 'Chiller and mold cooling in injection molding and extrusion facilities.' },
        { name: 'Power Generation', desc: 'Heat rejection for diesel generator sets and small captive power plants.' },
        { name: 'Pharma & Food', desc: 'Clean, efficient cooling for hygienic processing environments.' },
        { name: 'Steel & Foundry', desc: 'Furnace cooling and heavy-duty industrial heat rejection.' },
      ]}
      relatedProducts={[
        { name: 'PPR Pipe & Fittings', href: '/products/ppr' },
        { name: 'HDPE Pipe & Fittings', href: '/products/hdpe' },
        { name: 'Industrial Valves', href: '/products/valves' },
      ]}
    />
  );
}
