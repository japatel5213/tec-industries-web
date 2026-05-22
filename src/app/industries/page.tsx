import type { Metadata } from 'next';
import Link from 'next/link';
import { Building2, Wheat, Droplets, Factory, Wrench, Ship, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Industries Served',
  description: 'TEC INDUSTRIES supplies PPR and HDPE piping solutions to construction, agriculture, plumbing, infrastructure, industrial, and marine sectors across India.',
};

const INDUSTRIES = [
  {
    icon: <Building2 size={40} />,
    name: 'Construction',
    tagline: 'Residential & Commercial Building',
    desc: 'From high-rise apartments to large commercial complexes, TEC INDUSTRIES PPR pipes are the first choice for plumbers and contractors across India. Our complete PPR system — pipes, fittings, and valves — ensures fast, reliable hot and cold water installation.',
    products: ['PPR Pipe & Fittings', 'Industrial Valves', 'Pipe Support System'],
    img: '/assets/ppr-pipes.png',
  },
  {
    icon: <Wheat size={40} />,
    name: 'Agriculture',
    tagline: 'Irrigation & Water Management',
    desc: 'India\'s farmers trust HDPE pipes from TEC INDUSTRIES for their durability, flexibility, and long service life in drip irrigation, sprinkler systems, and canal lining applications. Our pipes withstand UV exposure, soil stress, and demanding agricultural environments.',
    products: ['HDPE Pipe & Fittings', 'Industrial Valves'],
    img: '/assets/hdpe-pipes.png',
  },
  {
    icon: <Droplets size={40} />,
    name: 'Plumbing',
    tagline: 'Hot & Cold Water Systems',
    desc: 'Professional plumbers prefer TEC INDUSTRIES PPR systems for ease of installation, minimal maintenance, and superior longevity. Our PPR fusion machines and comprehensive fitting range make installation fast, accurate, and reliable.',
    products: ['PPR Pipe & Fittings', 'PPR Fusion Machine', 'Industrial Valves'],
    img: '/assets/ppr-pipes.png',
  },
  {
    icon: <Factory size={40} />,
    name: 'Infrastructure',
    tagline: 'Municipal Water Networks',
    desc: 'Municipal corporations and infrastructure agencies rely on TEC INDUSTRIES HDPE pipes for water supply mains, sewerage networks, and stormwater drainage. Our PE 100 pipes with electrofusion joints deliver leak-free performance for decades.',
    products: ['HDPE Pipe & Fittings', 'Electrofusion Fittings', 'Pipe Support System'],
    img: '/assets/hdpe-pipes.png',
  },
  {
    icon: <Wrench size={40} />,
    name: 'Industrial',
    tagline: 'Process Piping Systems',
    desc: 'Chemical plants, pharmaceuticals, food processing, and manufacturing facilities choose TEC INDUSTRIES for their process piping needs. Our chemically resistant PP valves and piping systems handle demanding industrial fluids safely and reliably.',
    products: ['PPR Pipe & Fittings', 'Industrial Valves', 'Electrofusion Fittings'],
    img: '/assets/valves.png',
  },
  {
    icon: <Ship size={40} />,
    name: 'Marine',
    tagline: 'Marine & Offshore Applications',
    desc: 'Marine-grade stainless steel pipe supports and corrosion-resistant pipe systems from TEC INDUSTRIES are specified for shipbuilding, offshore platforms, and port infrastructure where salt air and moisture demand the highest material standards.',
    products: ['Pipe Support System', 'Industrial Valves', 'HDPE Pipe & Fittings'],
    img: '/assets/pipe-support.png',
  },
];

export default function IndustriesPage() {
  return (
    <div>
      <section style={{ background: 'linear-gradient(135deg, #141C28, #1E2A3A)', padding: '80px 0 64px' }}>
        <div className="container-xl text-center">
          <span className="section-eyebrow" style={{ color: '#3DAA7A' }}>Where We Serve</span>
          <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, marginBottom: '16px' }}>
            Industries We Serve
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(255,255,255,0.6)', maxWidth: '520px', margin: '0 auto' }}>
            TEC INDUSTRIES piping solutions power projects across six major sectors throughout India.
          </p>
        </div>
      </section>

      <section style={{ background: '#F5F5F0', padding: '80px 0' }}>
        <div className="container-xl flex flex-col gap-12">
          {INDUSTRIES.map((ind) => (
            <div key={ind.name} className="card" style={{ padding: '40px', display: 'grid', gridTemplateColumns: '80px 1fr', gap: '32px', alignItems: 'flex-start' }}>
              <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #2D8B6E, #3DAA7A)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                {ind.icon}
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3DAA7A', display: 'block', marginBottom: '4px' }}>{ind.tagline}</span>
                <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '24px', fontWeight: 800, color: '#2B3E50', marginBottom: '12px' }}>{ind.name}</h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6B7B8D', lineHeight: 1.8, marginBottom: '20px' }}>{ind.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                  {ind.products.map((p) => (
                    <span key={p} style={{ background: '#E6F5F0', color: '#2D8B6E', fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '999px', letterSpacing: '0.04em' }}>{p}</span>
                  ))}
                </div>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-head)', fontSize: '13px', fontWeight: 700, color: '#2D8B6E', textDecoration: 'none', letterSpacing: '0.06em' }}>
                  Get a Quote for {ind.name} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: 'linear-gradient(135deg, #1E2A3A, #2B3E50)', padding: '80px 0' }}>
        <div className="container-xl text-center">
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
            Don't See Your Industry?
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>
            We work across all sectors requiring industrial piping solutions. Contact us to discuss your specific needs.
          </p>
          <Link href="/contact" className="btn-primary" style={{ fontSize: '15px', padding: '16px 32px' }}>
            Contact Our Team <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
