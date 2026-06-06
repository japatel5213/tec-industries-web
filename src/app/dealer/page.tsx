'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Handshake, MapPin, TrendingUp, CheckCircle2, Factory } from 'lucide-react';
import Link from 'next/link';

export default function DealerApplicationPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    firm_name: '',
    contact_person: '',
    email: '',
    phone: '',
    gst_number: '',
    city: '',
    state: '',
    expected_volume: '',
    current_brands: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { error } = await supabase
        .from('dealer_applications')
        .insert([{ ...formData }]);

      if (error) throw error;
      setSuccess(true);
    } catch (error) {
      console.error('Error submitting application:', error);
      setErrorMsg('There was an error processing your application. Please try again or contact us directly via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMsg) setErrorMsg('');
  };

  return (
    <main className="bg-[#F5F5F0] min-h-screen pt-32 pb-24">
      {/* Header Banner */}
      <div className="container-xl max-w-6xl mb-12">
        <div className="bg-gradient-to-r from-[#141C28] to-[#2B3E50] rounded-2xl p-10 md:p-16 text-white text-center shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#3DAA7A] rounded-full blur-[120px] opacity-20 pointer-events-none" />
          <h1 className="font-[family-name:var(--font-head)] text-4xl md:text-5xl font-extrabold mb-4 relative z-10">
            Become a TEC Distributor
          </h1>
          <p className="font-[family-name:var(--font-body)] text-lg text-white/80 max-w-2xl mx-auto relative z-10">
            Join India's fastest-growing industrial piping network. Partner with a manufacturer that prioritizes quality, high margins, and total dealer support.
          </p>
        </div>
      </div>

      <div className="container-xl max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Benefits */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="font-[family-name:var(--font-head)] text-2xl font-bold text-[#2B3E50] mb-6">
              Why Partner With TEC?
            </h3>
            
            <div className="bg-white p-6 rounded-xl border border-[#e2e8f0] shadow-sm flex gap-4">
              <div className="w-12 h-12 bg-[#e6f4ef] text-[#3DAA7A] rounded-lg flex items-center justify-center flex-shrink-0">
                <Factory size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#2B3E50] mb-1 font-[family-name:var(--font-body)]">Direct Manufacturer Support</h4>
                <p className="text-sm text-[#6B7B8D] leading-relaxed">Skip the middlemen. Buy directly from our Gujarat plant for the most competitive industrial pricing.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e2e8f0] shadow-sm flex gap-4">
              <div className="w-12 h-12 bg-[#fff1ec] text-[#E85D26] rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#2B3E50] mb-1 font-[family-name:var(--font-body)]">High Margin Tiers</h4>
                <p className="text-sm text-[#6B7B8D] leading-relaxed">Aggressive volume-based discount slabs designed to maximize your profitability as you scale.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e2e8f0] shadow-sm flex gap-4">
              <div className="w-12 h-12 bg-[#edf2f7] text-[#4A5568] rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#2B3E50] mb-1 font-[family-name:var(--font-body)]">Territory Protection</h4>
                <p className="text-sm text-[#6B7B8D] leading-relaxed">We protect our dedicated distributors by ensuring limited dealership presence in designated pin-codes.</p>
              </div>
            </div>
          </div>

          {/* Right Column: The Form */}
          <div className="lg:col-span-8 bg-white p-8 md:p-12 rounded-2xl shadow-[0_20px_60px_rgba(43,62,80,0.06)] border border-[#e2e8f0]">
            {!success ? (
              <>
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[#f0f0f0]">
                  <Handshake size={28} className="text-[#3DAA7A]" />
                  <h2 className="font-[family-name:var(--font-head)] text-3xl font-bold text-[#2B3E50]">
                    Distributorship Application
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 font-[family-name:var(--font-body)]">
                  {/* Row 1 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#2B3E50] mb-2">Firm / Company Name *</label>
                      <input required type="text" name="firm_name" value={formData.firm_name} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-[#F5F5F0] border border-transparent focus:bg-white focus:outline-none focus:border-[#3DAA7A] focus:ring-1 focus:ring-[#3DAA7A] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#2B3E50] mb-2">GST Number *</label>
                      <input required type="text" name="gst_number" value={formData.gst_number} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-[#F5F5F0] border border-transparent focus:bg-white focus:outline-none focus:border-[#3DAA7A] focus:ring-1 focus:ring-[#3DAA7A] transition-colors uppercase" placeholder="22AAAAA0000A1Z5" />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#2B3E50] mb-2">Contact Person *</label>
                      <input required type="text" name="contact_person" value={formData.contact_person} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-[#F5F5F0] border border-transparent focus:bg-white focus:outline-none focus:border-[#3DAA7A] focus:ring-1 focus:ring-[#3DAA7A] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#2B3E50] mb-2">Phone Number *</label>
                      <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-[#F5F5F0] border border-transparent focus:bg-white focus:outline-none focus:border-[#3DAA7A] focus:ring-1 focus:ring-[#3DAA7A] transition-colors" />
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#2B3E50] mb-2">Email Address *</label>
                      <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-[#F5F5F0] border border-transparent focus:bg-white focus:outline-none focus:border-[#3DAA7A] focus:ring-1 focus:ring-[#3DAA7A] transition-colors" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#2B3E50] mb-2">City *</label>
                        <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-[#F5F5F0] border border-transparent focus:bg-white focus:outline-none focus:border-[#3DAA7A] focus:ring-1 focus:ring-[#3DAA7A] transition-colors" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#2B3E50] mb-2">State *</label>
                        <input required type="text" name="state" value={formData.state} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-[#F5F5F0] border border-transparent focus:bg-white focus:outline-none focus:border-[#3DAA7A] focus:ring-1 focus:ring-[#3DAA7A] transition-colors" />
                      </div>
                    </div>
                  </div>

                  {/* Row 4 */}
                  <div>
                    <label className="block text-sm font-semibold text-[#2B3E50] mb-2">Expected Monthly Volume (INR) *</label>
                    <select required name="expected_volume" value={formData.expected_volume} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-[#F5F5F0] border border-transparent focus:bg-white focus:outline-none focus:border-[#3DAA7A] focus:ring-1 focus:ring-[#3DAA7A] transition-colors">
                      <option value="">Select Volume Range...</option>
                      <option value="Below 5 Lakhs">Below ₹5 Lakhs</option>
                      <option value="5-10 Lakhs">₹5 Lakhs - ₹10 Lakhs</option>
                      <option value="10-25 Lakhs">₹10 Lakhs - ₹25 Lakhs</option>
                      <option value="25+ Lakhs">Above ₹25 Lakhs</option>
                    </select>
                  </div>

                  {/* Row 5 */}
                  <div>
                    <label className="block text-sm font-semibold text-[#2B3E50] mb-2">Current Brands You Deal In</label>
                    <textarea name="current_brands" value={formData.current_brands} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-lg bg-[#F5F5F0] border border-transparent focus:bg-white focus:outline-none focus:border-[#3DAA7A] focus:ring-1 focus:ring-[#3DAA7A] transition-colors resize-none" placeholder="E.g., Supreme, Finolex, Ashirvad (Optional)" />
                  </div>

                  {errorMsg && (
                    <div style={{ background: '#FFF5F4', border: '1px solid #D14B3A', borderRadius: '8px', padding: '12px 16px', color: '#D14B3A', fontSize: '14px', fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>⚠️</span>
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button disabled={loading} type="submit" className="w-full btn-primary py-4 mt-4 justify-center text-[16px]">
                    {loading ? 'Submitting Application...' : 'Submit Application'}
                  </button>
                </form>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-24 h-24 bg-[#e6f4ef] rounded-full flex items-center justify-center text-[#3DAA7A] mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="font-[family-name:var(--font-head)] text-3xl font-bold text-[#2B3E50] mb-4">
                  Application Received!
                </h2>
                <p className="font-[family-name:var(--font-body)] text-[#6B7B8D] mb-8 max-w-md mx-auto leading-relaxed">
                  Thank you for your interest in partnering with TEC INDUSTRIES. Our channel sales team will review your application and contact you within 24-48 hours.
                </p>
                <Link href="/" className="btn-primary">
                  Return to Homepage
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
