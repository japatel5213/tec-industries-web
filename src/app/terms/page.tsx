import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for TEC INDUSTRIES — ordering, quotation, payment, delivery, and warranty terms.',
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <div style={{ background: '#F5F5F0', minHeight: '100vh' }}>
      <section style={{ background: 'linear-gradient(135deg, #141C28, #1E2A3A)', padding: '160px 0 96px' }}>
        <div className="container-xl text-center">
          <span className="section-eyebrow" style={{ color: '#3DAA7A' }}>Legal</span>
          <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, marginBottom: '16px' }}>
            Terms of Service
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
                <strong>Notice:</strong> These Terms are currently under legal review and will be finalised shortly. For any immediate queries, contact <a href="mailto:info@tecindustries.in" style={{ color: '#2D8B6E' }}>info@tecindustries.in</a>.
              </p>
            </div>

            {[
              {
                title: '1. General',
                content: 'These Terms of Service govern the use of tecindustries.in and any business conducted with TEC INDUSTRIES, Plot No. 700/1, 40 Shade Area, GIDC, Vapi, Gujarat 396195, India. By using this website or placing an order, you agree to these terms.',
              },
              {
                title: '2. Quotations',
                content: 'All quotations issued by TEC INDUSTRIES are valid for 7 days from the date of issue unless otherwise stated in writing. Indicative pricing on this website (if published) is subject to change based on current raw material indices, order volume, and delivery destination. Final pricing is confirmed only in a written quotation.',
              },
              {
                title: '3. Ordering & Acceptance',
                content: 'A purchase order becomes binding upon written acceptance by TEC INDUSTRIES. Minimum order quantities (MOQs) may apply by product and size range. Custom lengths, colours, or configurations may require longer lead times and are subject to separate terms.',
              },
              {
                title: '4. Payment Terms',
                content: 'Standard payment terms are 100% advance for new accounts. Established accounts may be eligible for credit terms as separately agreed in writing. All prices are exclusive of GST (GSTIN: 24ACBFM4650R1ZU). Late payments may attract interest at 2% per month on the outstanding balance.',
              },
              {
                title: '5. Delivery',
                content: 'TEC INDUSTRIES ships pan-India. Delivery timelines are estimates only and do not constitute a guarantee. Dispatch is from our Vapi, Gujarat facility. Risk of loss passes to the buyer upon handover to the carrier. Freight charges are as quoted or invoiced separately.',
              },
              {
                title: '6. Returns & Claims',
                content: 'Claims for short-supply, damaged goods, or incorrect products must be raised within 48 hours of delivery with photographic evidence. TEC INDUSTRIES will replace confirmed defective products at no charge. Returns require prior written authorisation. Goods must be returned in original, unused condition.',
              },
              {
                title: '7. Warranty',
                content: 'TEC INDUSTRIES warrants that products, when installed and used per applicable IS/ISO standards and manufacturer guidelines, are free from manufacturing defects. This warranty does not cover damage from incorrect installation, improper fusion welding parameters, use beyond rated conditions, or external mechanical damage.',
              },
              {
                title: '8. Limitation of Liability',
                content: 'TEC INDUSTRIES\' liability is limited to the value of the goods supplied. We are not liable for consequential, indirect, or punitive damages arising from the use or failure of products.',
              },
              {
                title: '9. Dispute Resolution',
                content: 'All disputes arising from transactions with TEC INDUSTRIES shall be subject to the exclusive jurisdiction of the courts of Vapi, Gujarat, India. Governing law: Indian Contract Act 1872 and applicable Indian commercial law.',
              },
              {
                title: '10. Force Majeure',
                content: 'TEC INDUSTRIES is not liable for delays or failures caused by events beyond our reasonable control, including natural disasters, government action, raw material shortages, or disruption to transport networks.',
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
