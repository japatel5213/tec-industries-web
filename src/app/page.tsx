'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, Phone, Shield, Award, Users, Factory, Wheat, Droplets, Building2, Wrench, Ship } from 'lucide-react';

// ─── Animated Counter ───
function Counter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return <div ref={ref}>{count}{suffix}</div>;
}

// ─── Reveal on scroll ───
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const PRODUCTS = [
  {
    name: 'PPR Pipe & Fittings',
    desc: 'Premium polypropylene random copolymer pipes for hot & cold water systems. Temperature-resistant, corrosion-proof, and certified to international standards.',
    img: '/assets/ppr-pipes.png',
    href: '/products/ppr',
    badge: 'Primary',
  },
  {
    name: 'HDPE Pipe & Fittings',
    desc: 'High-density polyethylene pipes built for demanding underground and industrial applications. Superior flexibility, chemical resistance, and long service life.',
    img: '/assets/hdpe-pipes.png',
    href: '/products/hdpe',
    badge: null,
  },
  {
    name: 'Electrofusion Fittings',
    desc: 'Precision electrofusion couplings and saddles engineered for leak-proof, high-integrity pipe joints in gas and water distribution networks.',
    img: '/assets/electrofusion.png',
    href: '/products/electrofusion',
    badge: null,
  },
  {
    name: 'Industrial Valves',
    desc: 'Ball valves, gate valves, and butterfly valves in PP, PVC, and metal. Designed for reliable flow control in industrial piping systems.',
    img: '/assets/valves.png',
    href: '/products/valves',
    badge: null,
  },
  {
    name: 'Pipe Support System',
    desc: 'Comprehensive range of hangers, brackets, clamps, and channel supports engineered for secure pipe installation across all environments.',
    img: '/assets/pipe-support.png',
    href: '/products/pipe-support',
    badge: null,
  },
  {
    name: 'PPR Fusion Machine',
    desc: 'Professional-grade PPR pipe fusion welding machines for precise, reliable heat fusion joints. Built for contractors and installers.',
    img: '/assets/fusion-machine.png',
    href: '/products/fusion-machine',
    badge: null,
  },
];

const INDUSTRIES = [
  { icon: <Building2 size={28} />, name: 'Construction', desc: 'Commercial & high-rise projects' },
  { icon: <Wheat size={28} />, name: 'Agriculture', desc: 'Irrigation & water management' },
  { icon: <Droplets size={28} />, name: 'Plumbing', desc: 'Commercial & industrial plumbing' },
  { icon: <Factory size={28} />, name: 'Infrastructure', desc: 'Municipal water networks' },
  { icon: <Wrench size={28} />, name: 'Industrial', desc: 'Chemical, fertilizer & process piping' },
  { icon: <Ship size={28} />, name: 'Pharma & Food', desc: 'Utility water & CIP lines' },
];

const STATS = [
  { end: 100, suffix: '%', label: 'Quality-Tested Output' },
  { end: 6, suffix: '', label: 'Product Lines' },
  { end: 0, suffix: '', label: 'IS 15801 Compliant', static: 'IS 15801' },
  { end: 0, suffix: '', label: 'Project Reach', static: 'Pan-India' },
];

const TRUST_CARDS = [
  {
    heading: 'Specification-First',
    body: 'Every pipe ships with batch traceability, dimensional verification per IS 15801, and hydrostatic test records on request.',
  },
  {
    heading: 'Industrial-Grade Range',
    body: 'PPR coverage from 20 mm to 160 mm. HDPE from 20 mm to 630 mm. PN10 / PN16 / PN20 / PN25 pressure classes. Sizes most national competitors don\'t carry.',
  },
  {
    heading: 'Direct from Factory',
    body: 'No distributor markup. Quote directly with the manufacturer. Bulk pricing, dealer terms, and project rates available.',
  },
];

export default function HomePage() {
  useReveal();

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #141C28 0%, #1E2A3A 60%, #1a3040 100%)' }}
      >
        {/* Radial glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(45,139,110,0.18) 0%, transparent 65%)' }} />
          <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(45,139,110,0.10) 0%, transparent 65%)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/assets/factory-hero.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.12 }} />
        </div>

        <div className="container-xl relative z-10 pt-32 pb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — Text */}
            <div>
              <span className="section-eyebrow" style={{ color: '#3DAA7A', letterSpacing: '0.12em' }}>
                Made in Vapi, Gujarat · Shipped Pan-India
              </span>
              <h1
                style={{
                  fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 'clamp(36px, 5vw, 68px)',
                  color: '#ffffff', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '24px',
                }}
              >
                Industrial-Grade PPR & HDPE.<br />
                <span style={{ background: 'linear-gradient(135deg, #2D8B6E, #3DAA7A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Manufactured
                </span>{' '}
                for Plants, Projects & Procurement.
              </h1>
              <p
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '18px', color: 'rgba(255,255,255,0.65)',
                  lineHeight: 1.7, marginBottom: '16px', fontStyle: 'italic',
                }}
              >
                "Your Partner in Industrial Progress"
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.7, marginBottom: '36px',
                }}
              >
                TEC INDUSTRIES manufactures PPR pipes from 20 mm to 160 mm, HDPE pipes from 20 mm to 630 mm, and a complete bundling ecosystem — fittings, valves, electrofusion couplings, pipe supports, and fusion welding machines. Built to IS 15801, ISO 15874, and DIN 8077 specifications. Quoted directly from the factory.
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <Link href="/products" className="btn-primary">
                  Explore Products <ArrowRight size={16} />
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Get a Quote
                </Link>
              </div>
              {/* Trust badges */}
              <div className="flex flex-wrap gap-6">
                {['Manufactured to IS 15801', 'DIN 8077 / 8078 Compliant', 'ISO 15874 Specifications', '100% Batch-Tested'].map((badge) => (
                  <div key={badge} className="flex items-center gap-2">
                    <CheckCircle2 size={14} style={{ color: '#3DAA7A' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.04em' }}>
                      {badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Product image */}
            <div className="hidden lg:block relative">
              <div
                style={{
                  position: 'absolute', inset: '-24px',
                  background: 'radial-gradient(circle at 50% 50%, rgba(45,139,110,0.15) 0%, transparent 70%)',
                  borderRadius: '24px',
                }}
              />
              <div
                style={{
                  position: 'relative', borderRadius: '20px', overflow: 'hidden',
                  border: '1px solid rgba(45,139,110,0.25)',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
                }}
              >
                <Image
                  src="/assets/ppr-pipes.png"
                  alt="TEC INDUSTRIES PPR Pipe & Fittings"
                  width={580}
                  height={420}
                  className="w-full h-auto"
                  priority
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(20,28,40,0.6) 100%)' }} />
                {/* Floating badge */}
                <div
                  style={{
                    position: 'absolute', bottom: '24px', left: '24px',
                    background: 'rgba(20,28,40,0.9)', backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(45,139,110,0.4)', borderRadius: '12px', padding: '12px 16px',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: '13px', fontWeight: 700, color: '#3DAA7A', letterSpacing: '0.06em' }}>
                    PRIMARY PRODUCT
                  </div>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: '16px', fontWeight: 800, color: '#fff', marginTop: '2px' }}>
                    PPR Pipe & Fittings
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1200 60 720 0 0 40L0 60Z" fill="#F5F5F0" />
          </svg>
        </div>
      </section>

      {/* ═══ ABOUT STRIP + STATS ═══ */}
      <section style={{ background: '#F5F5F0', padding: '80px 0' }}>
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <span className="section-eyebrow">Who We Are</span>
              <h2 className="section-heading" style={{ fontSize: 'clamp(28px, 3vw, 44px)', marginBottom: '20px', textTransform: 'capitalize' }}>
                Uncompromising Industrial Excellence
              </h2>
              <div className="teal-rule mb-8" />
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#6B7B8D', lineHeight: 1.8, marginBottom: '16px' }}>
                TEC INDUSTRIES manufactures PPR pipes from 20 mm to 160 mm, HDPE pipes from 20 mm to 630 mm, and a complete bundling ecosystem — fittings, valves, electrofusion couplings, pipe supports, and fusion welding machines. Built to IS 15801, ISO 15874, and DIN 8077 specifications. Shipped pan-India directly from our GIDC Vapi factory.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#6B7B8D', lineHeight: 1.8, marginBottom: '32px' }}>
                Built for industrial procurement — plant managers, contractors, and project engineers across India.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/about" className="btn-ghost">
                  Our Story <ArrowRight size={16} />
                </Link>
                <Link href="/quality" className="btn-primary">
                  Quality & Certifications
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 reveal">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="card text-center"
                  style={{ padding: '32px 24px', background: '#ffffff', position: 'relative', overflow: 'hidden' }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(135deg, #2D8B6E, #3DAA7A)' }} />
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: stat.static ? '28px' : '48px', fontWeight: 800, color: '#2B3E50', lineHeight: 1 }}>
                    {stat.static ? stat.static : <Counter end={stat.end} suffix={stat.suffix} />}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#6B7B8D', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '8px' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PRODUCTS GRID ═══ */}
      <section style={{ background: '#ffffff', padding: '96px 0' }}>
        <div className="container-xl">
          <div className="text-center mb-16 reveal">
            <span className="section-eyebrow">What We Manufacture</span>
            <h2 className="section-heading" style={{ fontSize: 'clamp(28px, 3vw, 44px)', marginBottom: '8px' }}>
              Our Product Range
            </h2>
            <div className="teal-rule mx-auto mb-6" />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#6B7B8D', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
              Six product lines engineered to the highest standards, covering all your industrial piping requirements.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product, i) => (
              <Link
                key={product.name}
                href={product.href}
                className="group reveal"
                style={{ textDecoration: 'none', animationDelay: `${i * 0.1}s` }}
              >
                <div
                  style={{
                    background: '#ffffff', borderRadius: '16px',
                    boxShadow: '0 12px 48px rgba(43,62,80,0.10)',
                    overflow: 'hidden', border: '1px solid #f0f0f0',
                    transition: 'transform 300ms ease, box-shadow 300ms ease',
                  }}
                  className="group-hover:-translate-y-1 group-hover:shadow-card-hover"
                >
                  {/* Image */}
                  <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                    <Image
                      src={product.img}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(27,42,58,0.7) 100%)' }} />
                    {product.badge && (
                      <div
                        style={{
                          position: 'absolute', top: '12px', left: '12px',
                          background: 'linear-gradient(135deg, #2D8B6E, #3DAA7A)',
                          color: '#fff', fontSize: '10px', fontFamily: 'var(--font-head)',
                          fontWeight: 700, letterSpacing: '0.1em', padding: '4px 10px', borderRadius: '999px',
                        }}
                      >
                        {product.badge}
                      </div>
                    )}
                    {/* Teal hover bar */}
                    <div
                      style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px',
                        background: 'linear-gradient(135deg, #2D8B6E, #3DAA7A)',
                        transform: 'scaleX(0)', transformOrigin: 'left',
                        transition: 'transform 300ms ease',
                      }}
                      className="group-hover:scale-x-100"
                    />
                  </div>
                  {/* Content */}
                  <div style={{ padding: '24px 24px 28px' }}>
                    <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '18px', fontWeight: 700, color: '#2B3E50', marginBottom: '10px', lineHeight: 1.3 }}>
                      {product.name}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7B8D', lineHeight: 1.7, marginBottom: '16px' }}>
                      {product.desc}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2D8B6E', fontFamily: 'var(--font-head)', fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em' }}
                      className="group-hover:gap-2 transition-all"
                    >
                      Learn More <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12 reveal">
            <Link href="/products" className="btn-primary">
              View All Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ INDUSTRIES SERVED ═══ */}
      <section style={{ background: '#1E2A3A', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(45,139,110,0.12) 0%, transparent 65%)' }} />
        <div className="container-xl relative">
          <div className="text-center mb-16 reveal">
            <span className="section-eyebrow">Where We Serve</span>
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.01em' }}>
              Industries We Power
            </h2>
            <div className="teal-rule mx-auto mt-5" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {INDUSTRIES.map((industry, i) => (
              <div
                key={industry.name}
                className="reveal text-center group"
                style={{
                  background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '28px 16px',
                  border: '1px solid rgba(45,139,110,0.15)', cursor: 'default',
                  transition: 'background 200ms ease, border-color 200ms ease',
                  animationDelay: `${i * 0.08}s`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(45,139,110,0.15)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(45,139,110,0.4)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(45,139,110,0.15)';
                }}
              >
                <div style={{ color: '#3DAA7A', marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
                  {industry.icon}
                </div>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: '14px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                  {industry.name}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.02em' }}>
                  {industry.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY CHOOSE TEC ═══ */}
      <section style={{ background: '#F5F5F0', padding: '96px 0' }}>
        <div className="container-xl">
          <div className="text-center mb-16 reveal">
            <span className="section-eyebrow">Why TEC INDUSTRIES</span>
            <h2 className="section-heading" style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}>
              The TEC Advantage
            </h2>
            <div className="teal-rule mx-auto mt-4" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Shield size={28} />, title: 'Certified Quality', desc: 'Every product meets ISO, BIS, and ISI standards. Rigorous in-house testing ensures zero-defect delivery.' },
              { icon: <Award size={28} />, title: 'Industry Experience', desc: 'Extensive manufacturing expertise. Trusted by 1200+ clients across residential, commercial, and infrastructure sectors.' },
              { icon: <Users size={28} />, title: 'Dealer Network', desc: 'Pan-India distributor and dealer network ensuring fast delivery to your project site anywhere in India.' },
              { icon: <Factory size={28} />, title: 'Modern Facility', desc: 'State-of-the-art GIDC Vapi manufacturing plant with advanced machinery and strict process controls.' },
              { icon: <Phone size={28} />, title: 'Technical Support', desc: 'Expert installation guidance, on-site support, and PPR pipe installer training programs.' },
              { icon: <CheckCircle2 size={28} />, title: 'Competitive Pricing', desc: 'Direct manufacturer pricing with no middleman costs. Bulk discounts and flexible payment terms for dealers.' },
            ].map((item, i) => (
              <div key={item.title} className="card reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <div style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg, #2D8B6E, #3DAA7A)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: '20px' }}>
                  {item.icon}
                </div>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '18px', fontWeight: 700, color: '#2B3E50', marginBottom: '10px' }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7B8D', lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BUILT FOR INDUSTRIAL BUYERS ═══ */}
      <section style={{ background: '#ffffff', padding: '96px 0' }}>
        <div className="container-xl">
          <div className="text-center mb-16 reveal">
            <span className="section-eyebrow">Why Industrial Buyers Choose TEC</span>
            <h2 className="section-heading" style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}>
              Built for Industrial Buyers
            </h2>
            <div className="teal-rule mx-auto mt-4 mb-6" />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#6B7B8D', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
              TEC INDUSTRIES specifies, manufactures, and delivers piping systems for the projects that demand precision.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {TRUST_CARDS.map((card, i) => (
              <div key={card.heading} className="card reveal" style={{ animationDelay: `${i * 0.15}s`, position: 'relative', borderTop: '4px solid #E85D26' }}>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '20px', fontWeight: 700, color: '#2B3E50', marginBottom: '16px' }}>{card.heading}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6B7B8D', lineHeight: 1.8 }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section style={{ background: 'linear-gradient(135deg, #1E2A3A 0%, #2B3E50 60%, #2D8B6E 100%)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%)', borderRadius: '50%' }} />
        <div className="container-xl relative text-center">
          <span className="section-eyebrow" style={{ color: '#3DAA7A' }}>Get Started Today</span>
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, marginBottom: '16px', letterSpacing: '-0.01em' }}>
            Need a Quote for Your Project?
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(255,255,255,0.65)', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.7 }}>
            Contact our sales team for competitive pricing, technical specifications, and fast delivery across India.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary" style={{ fontSize: '15px', padding: '16px 32px' }}>
              Request a Quote <ArrowRight size={16} />
            </Link>
            <a
              href="https://wa.me/919426031064?text=Hello%20TEC%20Industries%2C%20I%20need%20a%20quote%20for%20my%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ fontSize: '15px', padding: '16px 32px', display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
