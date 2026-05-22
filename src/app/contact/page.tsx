'use client';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

const PRODUCTS = [
  'PPR Pipe & Fittings',
  'HDPE Pipe & Fittings',
  'Electrofusion Fittings',
  'Industrial Valves',
  'Pipe Support System',
  'PPR Fusion Machine',
  'Other / General Inquiry',
];

type FormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  role: string;
  productInterest: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = 'Name is required.';
  if (!data.email.trim()) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Enter a valid email address.';
  if (!data.phone.trim()) errors.phone = 'Phone number is required.';
  else if (!/^[\d\s\-+()]{8,15}$/.test(data.phone)) errors.phone = 'Enter a valid phone number.';
  if (!data.role) errors.role = 'Please select your role.';
  if (!data.message.trim()) errors.message = 'Message is required.';
  return errors;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '', company: '', email: '', phone: '', role: '', productInterest: '', message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send.');
      }
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  const buildWhatsAppMsg = () => {
    const roleLabels: Record<string, string> = { installer: 'PPR Pipe Installer', dealer: 'Dealer', distributor: 'Distributor', general: 'General Inquiry' };
    const msg = `Hello TEC INDUSTRIES!\n\nName: ${formData.name}\nCompany: ${formData.company || '—'}\nPhone: ${formData.phone}\nRole: ${roleLabels[formData.role] || formData.role}\nProduct Interest: ${formData.productInterest || '—'}\n\nMessage:\n${formData.message}`;
    return `https://wa.me/919426031064?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #141C28, #1E2A3A)', padding: '80px 0 64px' }}>
        <div className="container-xl text-center">
          <span className="section-eyebrow" style={{ color: '#3DAA7A' }}>Get in Touch</span>
          <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, marginBottom: '16px' }}>
            Contact TEC INDUSTRIES
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(255,255,255,0.6)', maxWidth: '480px', margin: '0 auto' }}>
            Request a quote, inquire about products, or become a dealer/distributor. We respond within 1 business day.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section style={{ background: '#F5F5F0', padding: '80px 0' }}>
        <div className="container-xl">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* LEFT: Form */}
            <div className="lg:col-span-3">
              <div className="card" style={{ padding: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '22px', fontWeight: 800, color: '#2B3E50', marginBottom: '4px' }}>Send Us a Message</h2>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7B8D' }}>Fill the form or WhatsApp us directly</p>
                  </div>
                  <a
                    href="https://wa.me/919426031064?text=Hello%20TEC%20Industries%2C%20I%20want%20to%20inquire%20about%20your%20products."
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
                    style={{ background: '#E7F9EF', border: '1px solid rgba(37,211,102,0.3)', textDecoration: 'none' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    <span style={{ fontFamily: 'var(--font-head)', fontSize: '13px', fontWeight: 700, color: '#1a9b52', letterSpacing: '0.04em' }}>WhatsApp</span>
                  </a>
                </div>

                {status === 'success' ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <div style={{ width: '72px', height: '72px', background: 'linear-gradient(135deg, #2D8B6E, #3DAA7A)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                      <CheckCircle2 size={36} color="#fff" />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '22px', fontWeight: 800, color: '#2B3E50', marginBottom: '8px' }}>Message Sent!</h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6B7B8D', lineHeight: 1.7, maxWidth: '360px', margin: '0 auto 24px' }}>
                      Thank you for reaching out. Our team will respond within 1 business day. Check your inbox for a confirmation email.
                    </p>
                    <a
                      href={buildWhatsAppMsg()}
                      target="_blank" rel="noopener noreferrer"
                      className="btn-primary"
                      style={{ textDecoration: 'none' }}
                    >
                      Also Send via WhatsApp
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    {/* Role selector — highlighted */}
                    <div style={{ marginBottom: '24px' }}>
                      <label className="form-label">I am a *</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                          { value: 'installer', label: '🔧 PPR Installer' },
                          { value: 'dealer', label: '🏪 Dealer' },
                          { value: 'distributor', label: '🚚 Distributor' },
                          { value: 'general', label: '💼 General' },
                        ].map((opt) => (
                          <label
                            key={opt.value}
                            style={{
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              padding: '10px 8px', borderRadius: '8px', cursor: 'pointer',
                              border: `1.5px solid ${formData.role === opt.value ? '#2D8B6E' : '#e0e3e8'}`,
                              background: formData.role === opt.value ? '#E6F5F0' : '#fff',
                              fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600,
                              color: formData.role === opt.value ? '#2D8B6E' : '#2B3E50',
                              transition: 'all 200ms ease', textAlign: 'center',
                            }}
                          >
                            <input
                              type="radio"
                              name="role"
                              value={opt.value}
                              checked={formData.role === opt.value}
                              onChange={handleChange}
                              style={{ display: 'none' }}
                            />
                            {opt.label}
                          </label>
                        ))}
                      </div>
                      {errors.role && <p className="form-error">{errors.role}</p>}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label className="form-label" htmlFor="name">Full Name *</label>
                        <input id="name" name="name" type="text" className={`form-input ${errors.name ? 'error' : ''}`} placeholder="Your full name" value={formData.name} onChange={handleChange} />
                        {errors.name && <p className="form-error">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="form-label" htmlFor="company">Company / Organisation</label>
                        <input id="company" name="company" type="text" className="form-input" placeholder="Company name" value={formData.company} onChange={handleChange} />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label className="form-label" htmlFor="email">Email Address *</label>
                        <input id="email" name="email" type="email" className={`form-input ${errors.email ? 'error' : ''}`} placeholder="you@company.com" value={formData.email} onChange={handleChange} />
                        {errors.email && <p className="form-error">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="form-label" htmlFor="phone">Phone Number *</label>
                        <input id="phone" name="phone" type="tel" className={`form-input ${errors.phone ? 'error' : ''}`} placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} />
                        {errors.phone && <p className="form-error">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="mb-5">
                      <label className="form-label" htmlFor="productInterest">Product of Interest</label>
                      <select id="productInterest" name="productInterest" className="form-input" value={formData.productInterest} onChange={handleChange}>
                        <option value="">Select a product...</option>
                        {PRODUCTS.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>

                    <div className="mb-6">
                      <label className="form-label" htmlFor="message">Message *</label>
                      <textarea
                        id="message" name="message" rows={5}
                        className={`form-input ${errors.message ? 'error' : ''}`}
                        placeholder="Tell us about your project requirements, quantities needed, delivery location, etc."
                        value={formData.message} onChange={handleChange}
                        style={{ resize: 'vertical' }}
                      />
                      {errors.message && <p className="form-error">{errors.message}</p>}
                    </div>

                    {status === 'error' && (
                      <div style={{ background: '#FFF5F4', border: '1px solid #D14B3A', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px', color: '#D14B3A', fontFamily: 'var(--font-body)', fontSize: '14px' }}>
                        ⚠️ {errorMessage}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-4">
                      <button type="submit" className="btn-primary" disabled={status === 'sending'} style={{ opacity: status === 'sending' ? 0.7 : 1 }}>
                        {status === 'sending' ? 'Sending...' : <>Send Message <Send size={15} /></>}
                      </button>
                      <a href={buildWhatsAppMsg()} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ background: '#25D366', border: 'none', textDecoration: 'none', color: '#fff' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        Send via WhatsApp
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* RIGHT: Info */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Contact info card */}
              <div className="card" style={{ padding: '32px' }}>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '18px', fontWeight: 800, color: '#2B3E50', marginBottom: '24px' }}>Contact Information</h3>
                <div className="flex flex-col gap-5">
                  <div className="flex gap-4">
                    <div style={{ width: '44px', height: '44px', background: '#E6F5F0', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MapPin size={20} style={{ color: '#2D8B6E' }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-head)', fontSize: '13px', fontWeight: 700, color: '#2B3E50', letterSpacing: '0.04em', marginBottom: '4px' }}>Factory Address</div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7B8D', lineHeight: 1.6 }}>A-12, GIDC Industrial Estate<br />Vapi, Gujarat 396195, India</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div style={{ width: '44px', height: '44px', background: '#E6F5F0', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Phone size={20} style={{ color: '#2D8B6E' }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-head)', fontSize: '13px', fontWeight: 700, color: '#2B3E50', letterSpacing: '0.04em', marginBottom: '4px' }}>Phone</div>
                      <a href="tel:+919426031064" style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#2D8B6E', textDecoration: 'none', fontWeight: 600 }}>+91 94260 31064</a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div style={{ width: '44px', height: '44px', background: '#E7F9EF', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-head)', fontSize: '13px', fontWeight: 700, color: '#2B3E50', letterSpacing: '0.04em', marginBottom: '4px' }}>WhatsApp</div>
                      <a href="https://wa.me/919426031064" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#1a9b52', textDecoration: 'none', fontWeight: 600 }}>+91 94260 31064</a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div style={{ width: '44px', height: '44px', background: '#E6F5F0', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Mail size={20} style={{ color: '#2D8B6E' }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-head)', fontSize: '13px', fontWeight: 700, color: '#2B3E50', letterSpacing: '0.04em', marginBottom: '4px' }}>Email</div>
                      <a href="mailto:info@tecindustries.in" style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#2D8B6E', textDecoration: 'none', fontWeight: 600 }}>info@tecindustries.in</a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div style={{ width: '44px', height: '44px', background: '#E6F5F0', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Clock size={20} style={{ color: '#2D8B6E' }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-head)', fontSize: '13px', fontWeight: 700, color: '#2B3E50', letterSpacing: '0.04em', marginBottom: '4px' }}>Business Hours</div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7B8D' }}>Mon – Sat: 9:00 AM – 6:00 PM IST</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps embed */}
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <iframe
                  src="https://maps.google.com/maps?q=20.352928477419432,72.93881118904324&output=embed"
                  width="100%"
                  height="240"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div style={{ padding: '16px 20px', background: '#fff', borderTop: '1px solid #f0f0f0' }}>
                  <a
                    href="https://maps.google.com/?q=20.352928477419432,72.93881118904324"
                    target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: 'var(--font-head)', fontSize: '13px', fontWeight: 700, color: '#2D8B6E', textDecoration: 'none', letterSpacing: '0.04em' }}
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>

              {/* Become a dealer CTA */}
              <div style={{ background: 'linear-gradient(135deg, #1E2A3A, #2B3E50)', borderRadius: '16px', padding: '28px', boxShadow: '0 12px 48px rgba(43,62,80,0.14)' }}>
                <div style={{ height: '3px', background: 'linear-gradient(135deg, #2D8B6E, #3DAA7A)', borderRadius: '2px', marginBottom: '20px' }} />
                <h4 style={{ fontFamily: 'var(--font-head)', fontSize: '17px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Become a Dealer or Distributor</h4>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: '16px' }}>
                  Join our pan-India dealer network and grow your business with TEC INDUSTRIES.
                </p>
                <a
                  href="https://wa.me/919426031064?text=Hello%20TEC%20Industries%2C%20I%20am%20interested%20in%20becoming%20a%20Dealer%2FDistributor%20for%20your%20products."
                  target="_blank" rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ fontSize: '13px', padding: '10px 18px', textDecoration: 'none' }}
                >
                  Enquire Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
