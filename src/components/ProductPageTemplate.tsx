import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

type Spec = { label: string; value: string };
type Application = { name: string; desc: string };

type ProductPageProps = {
  badge?: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  specs: Spec[];
  features: string[];
  applications: Application[];
  relatedProducts?: { name: string; href: string }[];
};

export default function ProductPageTemplate({
  badge, name, tagline, description, image, specs, features, applications, relatedProducts,
}: ProductPageProps) {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #141C28, #1E2A3A)', padding: '80px 0 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(45,139,110,0.15) 0%, transparent 65%)' }} />
        <div className="container-xl relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {badge && (
                <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #2D8B6E, #3DAA7A)', color: '#fff', fontSize: '11px', fontFamily: 'var(--font-head)', fontWeight: 700, letterSpacing: '0.1em', padding: '5px 14px', borderRadius: '999px', marginBottom: '16px' }}>
                  {badge}
                </div>
              )}
              <span className="section-eyebrow" style={{ color: '#3DAA7A' }}>{tagline}</span>
              <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, marginBottom: '16px' }}>
                {name}
              </h1>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, marginBottom: '32px' }}>
                {description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn-primary">Get a Quote <ArrowRight size={15} /></Link>
                <a href="https://wa.me/919426031064" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ textDecoration: 'none' }}>WhatsApp Us</a>
              </div>
            </div>
            <div>
              <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.4)', border: '1px solid rgba(45,139,110,0.2)' }}>
                <Image src={image} alt={name} width={580} height={380} className="w-full h-auto" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs + Features */}
      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Specifications table */}
            <div>
              <span className="section-eyebrow">Technical Data</span>
              <h2 className="section-heading" style={{ fontSize: '32px', marginBottom: '8px' }}>Specifications</h2>
              <div className="teal-rule mb-8" />
              <div style={{ border: '1px solid #e8eaed', borderRadius: '12px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#1E2A3A' }}>
                      <th style={{ padding: '14px 20px', textAlign: 'left', fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>Parameter</th>
                      <th style={{ padding: '14px 20px', textAlign: 'left', fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {specs.map((spec, i) => (
                      <tr key={spec.label} style={{ background: i % 2 === 0 ? '#F5F5F0' : '#ffffff', borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '14px 20px', fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#2B3E50' }}>{spec.label}</td>
                        <td style={{ padding: '14px 20px', fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#2D8B6E' }}>{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key Features */}
            <div>
              <span className="section-eyebrow">Why Choose This Product</span>
              <h2 className="section-heading" style={{ fontSize: '32px', marginBottom: '8px' }}>Key Features</h2>
              <div className="teal-rule mb-8" />
              <ul className="flex flex-col gap-4">
                {features.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: '#F5F5F0', borderRadius: '10px', padding: '14px 18px' }}>
                    <CheckCircle2 size={18} style={{ color: '#2D8B6E', flexShrink: 0, marginTop: '1px' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#2B3E50', lineHeight: 1.6 }}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section style={{ background: '#F5F5F0', padding: '80px 0' }}>
        <div className="container-xl">
          <div className="text-center mb-12">
            <span className="section-eyebrow">Where It's Used</span>
            <h2 className="section-heading" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>Application Areas</h2>
            <div className="teal-rule mx-auto mt-4" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app) => (
              <div key={app.name} className="card">
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '16px', fontWeight: 700, color: '#2B3E50', marginBottom: '8px' }}>{app.name}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7B8D', lineHeight: 1.7 }}>{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry CTA */}
      <section style={{ background: 'linear-gradient(135deg, #1E2A3A, #2B3E50)', padding: '72px 0' }}>
        <div className="container-xl text-center">
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
            Interested in {name}?
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'rgba(255,255,255,0.6)', marginBottom: '28px' }}>
            Get pricing, datasheets, and availability. Our team responds within 1 business day.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={`/contact?product=${encodeURIComponent(name)}`} className="btn-primary">
              Send Inquiry <ArrowRight size={15} />
            </Link>
            <a
              href={`https://wa.me/919426031064?text=Hello%20TEC%20Industries%2C%20I%20am%20interested%20in%20${encodeURIComponent(name)}.%20Please%20share%20pricing%20and%20specifications.`}
              target="_blank" rel="noopener noreferrer"
              className="btn-secondary" style={{ textDecoration: 'none' }}
            >
              WhatsApp Inquiry
            </a>
          </div>
          {relatedProducts && relatedProducts.length > 0 && (
            <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Related Products</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {relatedProducts.map((p) => (
                  <Link key={p.href} href={p.href} style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.7)', padding: '8px 16px', borderRadius: '999px', fontFamily: 'var(--font-body)', fontSize: '13px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.12)', transition: 'all 200ms' }}
                    className="hover:bg-teal/20 hover:text-white">
                    {p.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
