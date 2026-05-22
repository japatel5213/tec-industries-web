import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Target, Eye, Heart, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about TEC INDUSTRIES — two decades of industrial excellence in PPR Pipes, HDPE Fittings, and industrial piping solutions from Vapi, Gujarat.',
};

const VALUES = [
  { letter: 'Q', title: 'Quality First', desc: 'Every product undergoes rigorous QC testing. We never compromise on material grade, dimensional accuracy, or pressure ratings.' },
  { letter: 'I', title: 'Innovation', desc: 'Continuous R&D drives product development. We adopt the latest manufacturing technologies to stay ahead of industry demands.' },
  { letter: 'R', title: 'Reliability', desc: 'Consistent delivery, consistent quality — every time. Our clients depend on us because we never let them down.' },
  { letter: 'S', title: 'Sustainability', desc: 'Eco-conscious manufacturing practices, energy-efficient processes, and recyclable materials at the core of our operations.' },
];

const MILESTONES = [
  { year: 'Foundation', event: 'TEC INDUSTRIES founded in Vapi, Gujarat with PPR pipe manufacturing.' },
  { year: 'Expansion', event: 'Expanded to HDPE pipe production. First 100 clients reached.' },
  { year: 'Certification', event: 'ISO 9001 certification achieved. Electrofusion fittings launched.' },
  { year: 'Innovation', event: 'New state-of-the-art GIDC facility opened. Capacity doubled.' },
  { year: 'Growth', event: 'Industrial Valves and Pipe Support Systems added to product range.' },
  { year: 'Network', event: 'PPR Fusion Machine range launched. Pan-India dealer network established.' },
  { year: 'Today', event: '1200+ clients served. 15+ states covered. 500+ product variants.' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #141C28, #1E2A3A)', padding: '80px 0 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(45,139,110,0.15) 0%, transparent 65%)' }} />
        <div className="container-xl relative text-center">
          <span className="section-eyebrow" style={{ color: '#3DAA7A' }}>Our Story</span>
          <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, marginBottom: '16px' }}>
            About TEC INDUSTRIES
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(255,255,255,0.6)', maxWidth: '560px', margin: '0 auto' }}>
            Two decades of manufacturing excellence, trusted by over 1,200 clients across India.
          </p>
        </div>
      </section>

      {/* Mission / Vision */}
      <section style={{ background: '#ffffff', padding: '96px 0' }}>
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-eyebrow">Who We Are</span>
              <h2 className="section-heading" style={{ fontSize: 'clamp(28px, 3vw, 40px)', marginBottom: '20px' }}>
                Built on Trust. Driven by Quality.
              </h2>
              <div className="teal-rule mb-8" />
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#6B7B8D', lineHeight: 1.8, marginBottom: '16px' }}>
                TEC INDUSTRIES is established in the GIDC Industrial Estate, Vapi, Gujarat — one of India's premier industrial hubs. From a single PPR pipe manufacturing line, we have grown into a comprehensive industrial piping solutions provider serving contractors, builders, and distributors across India.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#6B7B8D', lineHeight: 1.8, marginBottom: '32px' }}>
                Our product portfolio covers PPR Pipes & Fittings, HDPE Pipes & Fittings, Electrofusion Fittings, Industrial Valves, Pipe Support Systems, and PPR Fusion Machines — all manufactured in-house with strict quality controls.
              </p>
            </div>
            <div className="relative">
              <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(43,62,80,0.2)' }}>
                <Image src="/assets/factory-hero.png" alt="TEC INDUSTRIES Manufacturing Facility" width={580} height={400} className="w-full h-auto" />
              </div>
              <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', background: 'linear-gradient(135deg, #2D8B6E, #3DAA7A)', borderRadius: '12px', padding: '20px 24px', boxShadow: '0 12px 32px rgba(45,139,110,0.4)' }}>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: '24px', fontWeight: 800, color: '#fff', lineHeight: 1 }}>100%</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.06em', marginTop: '4px' }}>QUALITY COMMITMENT</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision cards */}
      <section style={{ background: '#F5F5F0', padding: '80px 0' }}>
        <div className="container-xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(135deg, #2D8B6E, #3DAA7A)' }} />
              <div style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg, #2D8B6E, #3DAA7A)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Target size={24} color="#fff" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '22px', fontWeight: 800, color: '#2B3E50', marginBottom: '12px' }}>Our Mission</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6B7B8D', lineHeight: 1.8 }}>
                To manufacture and deliver the highest quality piping solutions that empower India's construction, agriculture, and industrial sectors — making reliable infrastructure accessible to all.
              </p>
            </div>
            <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(135deg, #2D8B6E, #3DAA7A)' }} />
              <div style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg, #2D8B6E, #3DAA7A)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Eye size={24} color="#fff" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '22px', fontWeight: 800, color: '#2B3E50', marginBottom: '12px' }}>Our Vision</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6B7B8D', lineHeight: 1.8 }}>
                To be India's most trusted industrial piping manufacturer — recognised for innovation, quality, and our unwavering commitment to client success across every project we touch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section style={{ background: '#1E2A3A', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(45,139,110,0.12) 0%, transparent 65%)' }} />
        <div className="container-xl relative">
          <div className="text-center mb-16">
            <span className="section-eyebrow">What Drives Us</span>
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15 }}>
              Our Core Values
            </h2>
            <div className="teal-rule mx-auto mt-5" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val) => (
              <div key={val.letter} style={{ background: 'rgba(255,255,255,0.05)', borderTop: '3px solid #2D8B6E', borderRadius: '12px', padding: '32px 28px' }}>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: '48px', fontWeight: 800, color: '#3DAA7A', lineHeight: 1, marginBottom: '12px' }}>{val.letter}</div>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '18px', fontWeight: 700, color: '#ffffff', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{val.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ background: '#ffffff', padding: '96px 0' }}>
        <div className="container-xl">
          <div className="text-center mb-16">
            <span className="section-eyebrow">Our Journey</span>
            <h2 className="section-heading" style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}>Company Milestones</h2>
            <div className="teal-rule mx-auto mt-5" />
          </div>
          <div className="relative">
            <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(180deg, #2D8B6E, #3DAA7A)', opacity: 0.3 }} className="hidden md:block" />
            <div className="flex flex-col gap-8">
              {MILESTONES.map((m, i) => (
                <div key={m.year} className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="card" style={{ display: 'inline-block', padding: '20px 28px' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#3DAA7A', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '6px' }}>{m.year}</div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#2B3E50', lineHeight: 1.6 }}>{m.event}</p>
                    </div>
                  </div>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'linear-gradient(135deg, #2D8B6E, #3DAA7A)', flexShrink: 0, boxShadow: '0 0 0 4px rgba(45,139,110,0.2)', zIndex: 1 }} className="hidden md:block" />
                  <div className="md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #1E2A3A, #2B3E50)', padding: '80px 0' }}>
        <div className="container-xl text-center">
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
            Ready to Partner with Us?
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>
            Join 1200+ clients who trust TEC INDUSTRIES for their piping needs.
          </p>
          <Link href="/contact" className="btn-primary" style={{ fontSize: '15px', padding: '16px 32px' }}>
            Contact Us Today <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
