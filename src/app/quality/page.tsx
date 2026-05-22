import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, CheckCircle2, Award, FlaskConical, Microscope, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Quality & Certifications',
  description: 'TEC INDUSTRIES quality standards — ISO 9001:2015, ISI marked, BIS certified. In-house testing lab, rigorous QC processes, and international manufacturing standards for PPR and HDPE piping.',
};

const CERTIFICATIONS = [
  { name: 'ISO 9001:2015', body: 'Bureau Veritas', scope: 'Quality Management System for manufacturing of PPR and HDPE pipe systems', color: '#2D8B6E' },
  { name: 'ISI Mark', body: 'Bureau of Indian Standards (BIS)', scope: 'IS 15801 — PPR Pipe & Fittings; IS 4984 — HDPE Pipes', color: '#2B3E50' },
  { name: 'BIS Certification', body: 'Bureau of Indian Standards', scope: 'Products conforming to national safety and quality standards', color: '#2D8B6E' },
  { name: 'ISO 15874', body: 'International Standards', scope: 'Plastics piping systems for hot & cold water — PPR', color: '#2B3E50' },
  { name: 'ISO 4427', body: 'International Standards', scope: 'Plastics piping systems — PE pipes for water supply', color: '#2D8B6E' },
  { name: 'EN 12201', body: 'European Standards', scope: 'Plastics piping systems for water supply — PE', color: '#2B3E50' },
];

const QC_STEPS = [
  { step: '01', title: 'Raw Material Inspection', desc: 'All incoming raw materials (PPR, HDPE granules) are tested for MFI, density, and conformance to grade specifications before entering production.' },
  { step: '02', title: 'In-Process Quality Checks', desc: 'Dimensional, visual, and weight checks are performed at every stage of the manufacturing process — extrusion, forming, and fitting production.' },
  { step: '03', title: 'Hydrostatic Pressure Testing', desc: 'Pipes are tested at 1.5× rated working pressure for 24 hours minimum. No leakage or deformation is accepted.' },
  { step: '04', title: 'Dimensional Verification', desc: 'Wall thickness, OD, ovality, and fitting dimensions are measured with precision instruments against IS/ISO tolerance charts.' },
  { step: '05', title: 'Tensile & Impact Testing', desc: 'Samples from every production batch undergo tensile strength and impact resistance testing as per IS/ISO standards.' },
  { step: '06', title: 'Final Inspection & Marking', desc: 'Every product is inspected, batch-coded with production date and shift, then ISI/TEC-marked before packaging and dispatch.' },
];

export default function QualityPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #141C28, #1E2A3A)', padding: '80px 0 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(45,139,110,0.15) 0%, transparent 65%)' }} />
        <div className="container-xl relative text-center">
          <span className="section-eyebrow" style={{ color: '#3DAA7A' }}>Our Commitment</span>
          <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, marginBottom: '16px' }}>
            Quality & Certifications
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(255,255,255,0.6)', maxWidth: '520px', margin: '0 auto' }}>
            Every TEC INDUSTRIES product is manufactured, tested, and certified to the highest national and international standards.
          </p>
        </div>
      </section>

      {/* Quality policy */}
      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-eyebrow">Our Promise</span>
              <h2 className="section-heading" style={{ fontSize: 'clamp(26px, 3vw, 38px)', marginBottom: '20px' }}>Quality is Not Negotiable</h2>
              <div className="teal-rule mb-8" />
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#6B7B8D', lineHeight: 1.8, marginBottom: '16px' }}>
                At TEC INDUSTRIES, quality is embedded in every step of our manufacturing process — from raw material sourcing to final dispatch. Our ISO 9001:2015 certified quality management system ensures consistent product performance and reliability.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#6B7B8D', lineHeight: 1.8, marginBottom: '28px' }}>
                Our in-house laboratory is equipped with hydrostatic pressure testing rigs, tensile testing machines, dimensional measurement instruments, and MFI testers — allowing us to maintain strict quality control without dependence on external labs.
              </p>
              <div className="flex flex-col gap-3">
                {['Zero tolerance for out-of-spec products reaching customers', 'Every batch tested before dispatch', 'Full traceability from raw material to finished product', 'Customer complaints resolved within 48 hours'].map((point) => (
                  <div key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={16} style={{ color: '#2D8B6E', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#2B3E50', lineHeight: 1.6 }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: <Shield size={28} />, num: 'ISO', sub: '9001:2015 Certified' },
                { icon: <Award size={28} />, num: 'ISI', sub: 'Marked Products' },
                { icon: <FlaskConical size={28} />, num: '100%', sub: 'Batch Tested' },
                { icon: <Microscope size={28} />, num: '6+', sub: 'QC Test Types' },
              ].map((item) => (
                <div key={item.num} className="card text-center" style={{ padding: '28px 20px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(135deg, #2D8B6E, #3DAA7A)' }} />
                  <div style={{ width: '48px', height: '48px', background: '#E6F5F0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#2D8B6E' }}>
                    {item.icon}
                  </div>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: '28px', fontWeight: 800, color: '#2B3E50', lineHeight: 1 }}>{item.num}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6B7B8D', marginTop: '6px' }}>{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section style={{ background: '#F5F5F0', padding: '80px 0' }}>
        <div className="container-xl">
          <div className="text-center mb-12">
            <span className="section-eyebrow">Compliance</span>
            <h2 className="section-heading" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>Certifications & Standards</h2>
            <div className="teal-rule mx-auto mt-4" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert) => (
              <div key={cert.name} className="card" style={{ position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px', background: cert.color === '#2D8B6E' ? 'linear-gradient(135deg, #2D8B6E, #3DAA7A)' : '#2B3E50' }} />
                <div style={{ paddingLeft: '12px' }}>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: '20px', fontWeight: 800, color: '#2B3E50', marginBottom: '4px' }}>{cert.name}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#2D8B6E', marginBottom: '10px' }}>{cert.body}</div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7B8D', lineHeight: 1.6 }}>{cert.scope}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QC Process */}
      <section style={{ background: '#1E2A3A', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(45,139,110,0.12) 0%, transparent 65%)' }} />
        <div className="container-xl relative">
          <div className="text-center mb-16">
            <span className="section-eyebrow">How We Ensure Quality</span>
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15 }}>
              Our Quality Control Process
            </h2>
            <div className="teal-rule mx-auto mt-5" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {QC_STEPS.map((step) => (
              <div key={step.step} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '28px', borderTop: '3px solid #2D8B6E' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '36px', fontWeight: 700, color: 'rgba(61,170,122,0.3)', lineHeight: 1, marginBottom: '12px' }}>{step.step}</div>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{step.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div className="container-xl text-center">
          <h2 className="section-heading" style={{ fontSize: 'clamp(24px, 3vw, 36px)', marginBottom: '16px' }}>
            Need Compliance Documents or Test Reports?
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#6B7B8D', marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px' }}>
            Our team can provide product datasheets, test certificates, and compliance documentation on request.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary">Request Documents <ArrowRight size={15} /></Link>
            <a href="https://wa.me/919426031064?text=Hello%20TEC%20Industries%2C%20I%20need%20quality%20certifications%20and%20test%20reports%20for%20your%20products." target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ textDecoration: 'none' }}>WhatsApp Us</a>
          </div>
        </div>
      </section>
    </div>
  );
}
