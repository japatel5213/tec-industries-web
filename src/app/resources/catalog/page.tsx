'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { FileDown, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CatalogDownloadPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company_name: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('leads')
        .insert([{ 
          ...formData,
          source: 'catalog_download'
        }]);

      if (error) throw error;
      setSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error processing your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <main className="bg-[#F5F5F0] min-h-[calc(100vh-80px)] pt-12 pb-24">
      <div className="container-xl max-w-4xl">
        <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(43,62,80,0.08)] overflow-hidden border border-[#f0f0f0]">
          <div className="grid md:grid-cols-2">
            
            {/* Left Side: Info */}
            <div className="bg-gradient-to-br from-[#141C28] to-[#2B3E50] p-12 text-white flex flex-col justify-center">
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md text-[#3DAA7A]">
                <FileDown size={32} />
              </div>
              <h1 className="font-[family-name:var(--font-head)] text-4xl font-extrabold leading-tight mb-4">
                TEC Product Catalog 2026
              </h1>
              <p className="font-[family-name:var(--font-body)] text-white/70 mb-8 leading-relaxed">
                Download our comprehensive master catalog featuring specifications, dimensions, and pressure ratings for our entire range of industrial piping systems.
              </p>
              
              <ul className="space-y-4 font-[family-name:var(--font-body)]">
                {['PPR Pipes & Fittings Specs', 'HDPE Underground Systems', 'Industrial Valves & Flow Control', 'Electrofusion Compatibility Chart'].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/80">
                    <CheckCircle2 size={20} className="text-[#3DAA7A] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Side: Form */}
            <div className="p-12">
              {!success ? (
                <>
                  <h2 className="font-[family-name:var(--font-head)] text-2xl font-bold text-[#2B3E50] mb-2">
                    Access the Catalog
                  </h2>
                  <p className="font-[family-name:var(--font-body)] text-[#6B7B8D] mb-8 text-sm">
                    Enter your details below to instantly download the PDF.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5 font-[family-name:var(--font-body)]">
                    <div>
                      <label className="block text-sm font-semibold text-[#2B3E50] mb-2">Full Name *</label>
                      <input required type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#3DAA7A] focus:ring-1 focus:ring-[#3DAA7A] transition-colors" placeholder="John Doe" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#2B3E50] mb-2">Phone *</label>
                        <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#3DAA7A] focus:ring-1 focus:ring-[#3DAA7A] transition-colors" placeholder="+91 98765 43210" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#2B3E50] mb-2">Company</label>
                        <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#3DAA7A] focus:ring-1 focus:ring-[#3DAA7A] transition-colors" placeholder="ABC Corp" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#2B3E50] mb-2">Email Address *</label>
                      <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#3DAA7A] focus:ring-1 focus:ring-[#3DAA7A] transition-colors" placeholder="john@example.com" />
                    </div>

                    <button disabled={loading} type="submit" className="w-full btn-primary py-4 mt-2 justify-center text-[16px]">
                      {loading ? 'Processing...' : 'Unlock Catalog Download'}
                    </button>
                    <p className="text-xs text-center text-[#6B7B8D] flex items-center justify-center gap-1 mt-4">
                      <ShieldCheck size={14} /> We respect your privacy and never spam.
                    </p>
                  </form>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                  <div className="w-20 h-20 bg-[#e6f4ef] rounded-full flex items-center justify-center text-[#3DAA7A]">
                    <CheckCircle2 size={40} />
                  </div>
                  <div>
                    <h2 className="font-[family-name:var(--font-head)] text-3xl font-bold text-[#2B3E50] mb-3">
                      Ready to Download!
                    </h2>
                    <p className="font-[family-name:var(--font-body)] text-[#6B7B8D] mb-8">
                      Thank you for your interest. Click the button below to download the TEC INDUSTRIES Master Catalog.
                    </p>
                    <a href="/assets/tec-catalog.pdf" download className="btn-primary inline-flex justify-center w-full py-4 text-[16px]">
                      Download PDF Catalog
                    </a>
                    <Link href="/" className="block mt-6 text-[#3DAA7A] hover:underline font-[family-name:var(--font-body)] font-medium">
                      Return to Homepage
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
