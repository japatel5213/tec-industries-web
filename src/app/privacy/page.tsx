import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for TEC INDUSTRIES — how we collect, use, and protect your personal data.',
  alternates: { canonical: '/privacy' },
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <div style={{ background: '#F5F5F0', minHeight: '100vh' }}>
      <section style={{ background: 'linear-gradient(135deg, #141C28, #1E2A3A)', padding: '160px 0 96px' }}>
        <div className="container-xl text-center">
          <span className="section-eyebrow" style={{ color: '#3DAA7A' }}>Legal</span>
          <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, marginBottom: '16px' }}>
            Privacy Policy
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'rgba(255,255,255,0.5)' }}>
            Last updated: June 2026 · Effective upon publication
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="container-xl" style={{ maxWidth: '800px' }}>
          <div className="card" style={{ padding: '48px' }}>
            <div style={{ background: '#FFF8E7', border: '1px solid #F0C040', borderRadius: '10px', padding: '16px 20px', marginBottom: '40px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#8B6A00', margin: 0 }}>
                <strong>Notice:</strong> This Privacy Policy is currently under legal review. The full policy will be published shortly. For any data-related queries, please contact us at <a href="mailto:info@tecindustries.in" style={{ color: '#2D8B6E' }}>info@tecindustries.in</a>.
              </p>
            </div>

            {[
              {
                title: '1. Who We Are',
                content: 'TEC INDUSTRIES is an industrial piping manufacturer based at Plot No. 700/1, 40 Shade Area, GIDC, Vapi, Gujarat 396195, India (GSTIN: 24ACBFM4650R1ZU). We operate the website tecindustries.in. For privacy-related queries, contact us at info@tecindustries.in or +91 94260 31064.',
              },
              {
                title: '2. Information We Collect',
                content: 'We collect information you voluntarily provide through our contact form, product inquiry form, catalog download form, and dealer application form. This includes: Full name, company name, designation, email address, phone number, city and state, and the nature of your inquiry or application.',
              },
              {
                title: '3. How We Use Your Information',
                content: 'We use your information to: respond to your inquiries and quotation requests; send you requested catalogs and technical documents; process dealer or distributor applications; send you relevant product updates and industry communications (only if you have opted in); and improve our website and services.',
              },
              {
                title: '4. Data Storage & Processors',
                content: 'Your data is stored securely in Supabase (ap-south-1 region, India). We use the following third-party processors: Zoho (CRM and email communications), ZeptoMail / Zoho Mail (transactional email delivery), Google Analytics 4 (website analytics), Meta Pixel (advertising analytics), and Google Tag Manager (tag management). Each processor operates under their own privacy policies and data processing agreements.',
              },
              {
                title: '5. Data Retention',
                content: 'We retain your personal data for as long as required to fulfil the purposes for which it was collected, or as required by applicable law. Lead and inquiry data is retained for a maximum of 3 years from last contact. You may request deletion at any time.',
              },
              {
                title: '6. Your Rights (DPDP Act 2023)',
                content: 'Under the Digital Personal Data Protection Act 2023, you have the right to: access the personal data we hold about you; correct inaccurate data; request erasure of your data; withdraw consent for data processing; and nominate a representative for data decisions. To exercise any of these rights, contact info@tecindustries.in.',
              },
              {
                title: '7. Cookies',
                content: 'We use essential cookies for website functionality, and analytics cookies (Google Analytics) to understand site usage. You can control cookie settings through your browser. Disabling analytics cookies will not affect your ability to use the site.',
              },
              {
                title: '8. Contact & Grievance Officer',
                content: 'For any privacy-related concerns, contact: TEC INDUSTRIES | info@tecindustries.in | +91 94260 31064 | Plot No. 700/1, 40 Shade Area, GIDC, Vapi, Gujarat 396195.',
              },
            ].map((section) => (
              <div key={section.title} style={{ marginBottom: '32px' }}>
                <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '18px', fontWeight: 700, color: '#2B3E50', marginBottom: '12px' }}>{section.title}</h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6B7B8D', lineHeight: 1.8 }}>{section.content}</p>
              </div>
            ))}

            <div style={{ borderTop: '1px solid #e8e8ec', paddingTop: '24px', marginTop: '8px' }}>
              <Link href="/contact" style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#2D8B6E', textDecoration: 'none', fontWeight: 600 }}>
                ← Contact us with any questions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
