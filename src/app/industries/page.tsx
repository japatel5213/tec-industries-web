import type { Metadata } from 'next';
import Link from 'next/link';
import { Building2, Wheat, Droplets, Factory, Wrench, FlaskConical, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Industries Served',
  description: 'TEC INDUSTRIES supplies industrial-grade PPR and HDPE piping to construction, agriculture, infrastructure, industrial, pharmaceutical and food processing sectors across India.',
  keywords: ['PPR pipe industries', 'industrial piping applications', 'PPR for plants and projects', 'HDPE industrial use', 'pharma piping', 'chemical plant piping'],
};

const INDUSTRIES = [
  {
    icon: <Building2 size={40} />,
    name: 'Construction',
    tagline: 'Commercial & High-Rise Projects',
    desc: 'Commercial complexes, high-rise residential towers, and large institutional buildings rely on TEC INDUSTRIES PPR systems for utility water, hot water distribution, and fire suppression support lines. Our complete PPR system — pipes, fittings, and valves from 20–160 mm — ensures fast, reliable installation across all floor levels.',
    products: ['PPR Pipe & Fittings', 'Industrial Valves', 'Pipe Support System'],
    cta: 'Get a Quote for Construction',
  },
  {
    icon: <Wheat size={40} />,
    name: 'Agriculture',
    tagline: 'Irrigation & Water Management',
    desc: 'India\'s farmers and agri-infrastructure contractors trust HDPE pipes from TEC INDUSTRIES for durability, flexibility, and long service life in drip irrigation, sprinkler systems, and canal lining. Our PE 100 pipes withstand UV exposure, soil stress, and demanding field environments — with 50-year design life at rated pressure.',
    products: ['HDPE Pipe & Fittings', 'Industrial Valves'],
    cta: 'Get a Quote for Agriculture',
  },
  {
    icon: <Droplets size={40} />,
    name: 'Commercial & Industrial Plumbing',
    tagline: 'Utility Water · Hot Water · Cooling Lines',
    desc: 'Commercial and industrial plumbing contractors prefer TEC INDUSTRIES PPR systems for ease of installation, minimal maintenance, and superior longevity. From hotels and hospitals to factories and warehouses — our PPR fusion machines and comprehensive fitting range make installation accurate and reliable across all DN sizes.',
    products: ['PPR Pipe & Fittings', 'PPR Fusion Machine', 'Industrial Valves'],
    cta: 'Get a Quote for Plumbing',
  },
  {
    icon: <Factory size={40} />,
    name: 'Infrastructure',
    tagline: 'Municipal Water Networks',
    desc: 'Municipal corporations and infrastructure agencies rely on TEC INDUSTRIES HDPE pipes for water supply mains, sewerage networks, and stormwater drainage. Our PE 100 pipes with electrofusion joints deliver leak-free performance across trenchless, open-cut, and directional-drilled installations for decades.',
    products: ['HDPE Pipe & Fittings', 'Electrofusion Fittings', 'Pipe Support System'],
    cta: 'Get a Quote for Infrastructure',
  },
  {
    icon: <Wrench size={40} />,
    name: 'Industrial',
    tagline: 'Chemical · Fertilizer · Textile · Compressed Air',
    desc: 'Chemical plants, fertilizer units, textile effluent lines, and compressed air networks across India\'s industrial clusters specify TEC INDUSTRIES for process piping. PP-R\'s resistance to inorganic acids, alkalis, and salts — combined with fusion-welded leak-free joints — makes it the engineered choice for demanding industrial service.',
    products: ['PPR Pipe & Fittings', 'Industrial Valves', 'Electrofusion Fittings'],
    cta: 'Get a Quote for Industrial',
  },
  {
    icon: <FlaskConical size={40} />,
    name: 'Pharmaceutical & Food Processing',
    tagline: 'Utility Water · CIP Lines · Process Water',
    desc: 'Pharma plants in the Ankleshwar–Vapi–Hyderabad–Baddi corridor specify PP-R for utility water, purified water (PW) distribution, and CIP/SIP loops. TEC PPR delivers non-toxic, BPA-free, non-leaching service with homogeneous fusion joints that prevent biofilm. Hot-water sanitization cycles to 80°C and resistance to NaOH/peracetic acid CIP agents — at 70–80% lower installed cost than SS 316L.',
    products: ['PPR Pipe & Fittings', 'Industrial Valves', 'Pipe Support System'],
    cta: 'Get a Quote for Pharma & Food Processing',
  },
];

export default function IndustriesPage() {
  return (
    <div>
      <section style={{ background: 'linear-gradient(135deg, #141C28, #1E2A3A)', padding: '80px 0 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(45,139,110,0.12) 0%, transparent 65%)' }} />
        <div className="container-xl text-center relative">
          <span className="section-eyebrow" style={{ color: '#3DAA7A' }}>Where We Serve</span>
          <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, marginBottom: '16px' }}>
            Industries We Serve
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(255,255,255,0.6)', maxWidth: '560px', margin: '0 auto' }}>
            Industrial-grade PPR and HDPE piping systems, specified and delivered for six major sectors across India.
          </p>
        </div>
      </section>

      <section style={{ background: '#F5F5F0', padding: '80px 0' }}>
        <div className="container-xl flex flex-col gap-10">
          {INDUSTRIES.map((ind, i) => (
            <div key={ind.name} className="card" style={{ padding: '40px', display: 'grid', gridTemplateColumns: '80px 1fr', gap: '32px', alignItems: 'flex-start', borderLeft: `4px solid ${i % 2 === 0 ? '#2D8B6E' : '#E85D26'}` }}>
              <div style={{ width: '80px', height: '80px', background: i % 2 === 0 ? 'linear-gradient(135deg, #2D8B6E, #3DAA7A)' : 'linear-gradient(135deg, #E85D26, #f07040)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
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
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-head)', fontSize: '13px', fontWeight: 700, color: '#E85D26', textDecoration: 'none', letterSpacing: '0.06em' }}>
                  {ind.cta} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: 'linear-gradient(135deg, #1E2A3A, #2B3E50)', padding: '80px 0' }}>
        <div className="container-xl text-center">
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
            Don&apos;t See Your Sector?
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(255,255,255,0.6)', marginBottom: '12px', maxWidth: '520px', margin: '0 auto 32px' }}>
            We work across all sectors requiring industrial piping solutions. Contact our engineering team to discuss your specific application.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.4)', marginBottom: '32px', fontStyle: 'italic' }}>
            "Your Partner in Industrial Progress"
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary" style={{ fontSize: '15px', padding: '16px 32px' }}>
              Contact Our Team <ArrowRight size={16} />
            </Link>
            <a href="https://wa.me/919426031064?text=Hello%20TEC%20INDUSTRIES%2C%20I%20would%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ fontSize: '15px', padding: '16px 32px', textDecoration: 'none' }}>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
