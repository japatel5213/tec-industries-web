import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const PRODUCTS = [
  { label: 'PPR Pipe & Fittings', href: '/products/ppr' },
  { label: 'HDPE Pipe & Fittings', href: '/products/hdpe' },
  { label: 'Electrofusion Fittings', href: '/products/electrofusion' },
  { label: 'Industrial Valves', href: '/products/valves' },
  { label: 'Pipe Support System', href: '/products/pipe-support' },
  { label: 'PPR Fusion Machine', href: '/products/fusion-machine' },
  { label: 'Cooling Towers', href: '/products/cooling-tower' },
];

const COMPANY = [
  { label: 'About Us', href: '/about' },
  { label: 'Industries Served', href: '/industries' },
  { label: 'Quality & Standards', href: '/quality' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Become a Dealer', href: '/dealer' },
  { label: 'Contact Us', href: '/contact' },
];

const RESOURCES: Array<{ label: string; href: string; coming?: boolean }> = [
  { label: 'PPR Pipes & Fittings Catalogue', href: '/resources/ppr-catalog' },
  { label: 'Blog & Insights', href: '/blog' },
  { label: 'HDPE Catalog Request', href: '/resources' },
  { label: 'Fusion Welding Guide', href: '/resources' },
  { label: 'Chemical Compatibility Review', href: '/resources' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#141C28' }}>
      {/* Top gradient rule */}
      <div style={{ height: '4px', background: 'linear-gradient(90deg, #2D8B6E, #3DAA7A, #E85D26)' }} />

      <div className="container-xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Col 1 — Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <Image src="/assets/tec-logo.png" alt="TEC INDUSTRIES" width={44} height={44} className="brightness-0 invert" />
              <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '18px', color: '#fff', letterSpacing: '0.02em', lineHeight: 1 }}>
                TEC INDUSTRIES
              </div>
            </Link>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: '24px', maxWidth: '340px' }}>
              Your Partner in Industrial Progress. Industrial-grade PPR and HDPE manufacturer, made in Vapi, Gujarat. Pan-India delivery.
            </p>
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="mt-1 flex-shrink-0" style={{ color: '#3DAA7A' }} />
                <span className="text-[13px] text-white/50 leading-relaxed font-sans">
                  TEC INDUSTRIES PLOT NO. 700/1, 40 SHADE AREA,<br />GIDC, VAPI, GUJARAT 396195 (IN)
                </span>
              </div>
              <a href="tel:+919426031064" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <Phone size={14} style={{ color: '#3DAA7A', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>+91 94260 31064</span>
              </a>
              <a href="mailto:info@tecindustries.in" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <Mail size={14} style={{ color: '#3DAA7A', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>info@tecindustries.in</span>
              </a>
            </div>
            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919426031064?text=Hello%20TEC%20INDUSTRIES%2C%20I%20am%20interested%20in%20your%20products."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all hover:scale-105"
              style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.25)', textDecoration: 'none' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              <span style={{ fontFamily: 'var(--font-head)', fontSize: '13px', fontWeight: 700, color: '#25D366', letterSpacing: '0.04em' }}>WhatsApp Us</span>
            </a>
          </div>

          {/* Col 2 — Products */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-head)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3DAA7A', marginBottom: '20px' }}>Products</h4>
            <ul className="flex flex-col gap-3">
              {PRODUCTS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }} className="hover:text-white transition-colors group">
                    <span style={{ color: '#2D8B6E', fontSize: '10px' }}>▸</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-head)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3DAA7A', marginBottom: '20px' }}>Company</h4>
            <ul className="flex flex-col gap-3">
              {COMPANY.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }} className="hover:text-white transition-colors">
                    <span style={{ color: '#2D8B6E', fontSize: '10px' }}>▸</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Resources + CTA */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-head)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3DAA7A', marginBottom: '20px' }}>Resources</h4>
            <ul className="flex flex-col gap-3 mb-8">
              {RESOURCES.map((link) => (
                <li key={link.label}>
                  {link.coming ? (
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#2D8B6E', fontSize: '10px' }}>▸</span>
                      {link.label}
                      <span style={{ fontSize: '10px', background: 'rgba(45,139,110,0.15)', color: '#3DAA7A', borderRadius: '4px', padding: '1px 6px', letterSpacing: '0.06em' }}>SOON</span>
                    </span>
                  ) : (
                    <Link href={link.href} style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }} className="hover:text-white transition-colors">
                      <span style={{ color: '#2D8B6E', fontSize: '10px' }}>▸</span>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <Link href="/contact" className="btn-primary" style={{ fontSize: '12px', padding: '10px 18px', display: 'inline-flex' }}>
              Request a Quote <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="container-xl py-5 flex flex-col sm:flex-row items-center justify-between gap-3 flex-wrap">
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.04em' }}>
            © {new Date().getFullYear()} TEC INDUSTRIES. All rights reserved. · GSTIN: 24ACBFM4650R1ZU
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.3)', textDecoration: 'none', letterSpacing: '0.04em' }} className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.3)', textDecoration: 'none', letterSpacing: '0.04em' }} className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap.xml" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.3)', textDecoration: 'none', letterSpacing: '0.04em' }} className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
