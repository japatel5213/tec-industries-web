import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Products',
  description: 'TEC INDUSTRIES manufactures PPR Pipe & Fittings, HDPE Pipe & Fittings, Electrofusion Fittings, Industrial Valves, Pipe Support Systems, and PPR Fusion Machines.',
};

const PRODUCTS = [
  {
    name: 'PPR Pipe & Fittings',
    badge: 'Primary Product',
    desc: 'Premium polypropylene random copolymer pipes for hot & cold water systems. Temperature-resistant up to 95°C, corrosion-proof, and certified to international standards.',
    img: '/assets/ppr-pipes.png',
    href: '/products/ppr',
    highlights: ['Temp resistance up to 95°C', 'Pressure ratings PN10/PN16/PN20', 'ISI & ISO certified', 'Hot & cold water systems'],
  },
  {
    name: 'HDPE Pipe & Fittings',
    badge: null,
    desc: 'High-density polyethylene pipes for underground and demanding industrial applications. Superior flexibility, chemical resistance, and long service life.',
    img: '/assets/hdpe-pipes.png',
    href: '/products/hdpe',
    highlights: ['Pressure class PN6 to PN16', 'Chemical resistant', 'Long service life (50+ years)', 'Underground applications'],
  },
  {
    name: 'Electrofusion Fittings',
    badge: null,
    desc: 'Precision electrofusion couplings and saddles for leak-proof, high-integrity pipe joints in gas and water distribution networks.',
    img: '/assets/electrofusion.png',
    href: '/products/electrofusion',
    highlights: ['Leak-proof joints', 'Gas & water distribution', 'Automatic welding process', 'Sizes 20mm to 400mm'],
  },
  {
    name: 'Industrial Valves',
    badge: null,
    desc: 'Ball valves, gate valves, and butterfly valves in PP, PVC, and metal for reliable flow control in industrial piping systems.',
    img: '/assets/valves.png',
    href: '/products/valves',
    highlights: ['Ball, gate & butterfly types', 'PP, PVC & metal options', 'Industrial grade', 'Full bore & reduced bore'],
  },
  {
    name: 'Pipe Support System',
    badge: null,
    desc: 'Comprehensive range of hangers, brackets, clamps, and channel supports for secure pipe installation across all environments.',
    img: '/assets/pipe-support.png',
    href: '/products/pipe-support',
    highlights: ['Hangers & brackets', 'Pipe clamps & anchors', 'Channel supports', 'Hot-dip galvanised options'],
  },
  {
    name: 'PPR Fusion Machine',
    badge: null,
    desc: 'Professional-grade PPR pipe fusion welding machines for precise, reliable heat fusion joints. Built for contractors and installers.',
    img: '/assets/fusion-machine.png',
    href: '/products/fusion-machine',
    highlights: ['20mm to 110mm capacity', 'Digital temperature control', 'Portable & lightweight', 'Professional-grade build'],
  },
];

export default function ProductsPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #141C28, #1E2A3A)', padding: '80px 0 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(45,139,110,0.15) 0%, transparent 65%)' }} />
        <div className="container-xl relative text-center">
          <span className="section-eyebrow" style={{ color: '#3DAA7A' }}>What We Manufacture</span>
          <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, marginBottom: '16px' }}>
            Our Product Range
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(255,255,255,0.6)', maxWidth: '520px', margin: '0 auto' }}>
            Six comprehensive product lines covering all your industrial piping requirements — manufactured with precision in Vapi, Gujarat.
          </p>
        </div>
      </section>

      {/* Products */}
      <section style={{ background: '#F5F5F0', padding: '80px 0' }}>
        <div className="container-xl flex flex-col gap-12">
          {PRODUCTS.map((product, i) => (
            <div
              key={product.name}
              className="card"
              style={{ padding: 0, overflow: 'hidden', display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1.2fr' : '1.2fr 1fr' }}
            >
              {/* Image — alternate sides */}
              <div style={{ order: i % 2 === 0 ? 0 : 1, position: 'relative', minHeight: '280px' }}>
                <Image src={product.img} alt={product.name} fill className="object-cover" />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,28,40,0.2)' }} />
                {product.badge && (
                  <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'linear-gradient(135deg, #2D8B6E, #3DAA7A)', color: '#fff', fontSize: '11px', fontFamily: 'var(--font-head)', fontWeight: 700, letterSpacing: '0.1em', padding: '5px 12px', borderRadius: '999px' }}>
                    {product.badge}
                  </div>
                )}
              </div>
              {/* Content */}
              <div style={{ padding: '40px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'center', order: i % 2 === 0 ? 1 : 0 }}>
                <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '26px', fontWeight: 800, color: '#2B3E50', marginBottom: '12px' }}>{product.name}</h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6B7B8D', lineHeight: 1.8, marginBottom: '20px' }}>{product.desc}</p>
                <ul className="flex flex-col gap-2 mb-24">
                  {product.highlights.map((h) => (
                    <li key={h} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#2B3E50' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2D8B6E', flexShrink: 0 }} />
                      {h}
                    </li>
                  ))}
                </ul>
                <Link href={product.href} className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                  View Details <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #1E2A3A, #2B3E50)', padding: '80px 0' }}>
        <div className="container-xl text-center">
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
            Need Product Specifications or Pricing?
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>
            Our sales team is ready to help with custom requirements and bulk orders.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary" style={{ fontSize: '15px', padding: '16px 32px' }}>
              Request a Quote <ArrowRight size={16} />
            </Link>
            <a href="https://wa.me/919426031064?text=Hello%20TEC%20Industries%2C%20please%20share%20product%20catalogue%20and%20pricing." target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ fontSize: '15px', padding: '16px 32px', textDecoration: 'none' }}>
              WhatsApp for Catalogue
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
