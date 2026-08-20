'use client';

import Link from 'next/link';
import { CheckCircle2, MessageSquare, ArrowLeft, Download, ShieldCheck } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-32 pb-24 flex items-center justify-center">
      <div className="container-xl max-w-2xl text-center">
        {/* Main Glassmorphic Card */}
        <div className="bg-white rounded-3xl p-10 md:p-16 shadow-[0_24px_72px_rgba(43,62,80,0.12)] border border-[#e2e8f0] relative overflow-hidden flex flex-col items-center">
          
          {/* Subtle elegant teal accent bar at the top */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D8B6E] to-[#3DAA7A]" />

          {/* Animated Success Badge */}
          <div className="w-24 h-24 bg-[#E6F5F0] text-[#3DAA7A] rounded-full flex items-center justify-center mb-8 shadow-inner animate-bounce">
            <CheckCircle2 size={48} className="stroke-[2.5]" />
          </div>

          <span className="section-eyebrow text-[#3DAA7A] mb-3">Submission Successful</span>
          <h1 className="font-[family-name:var(--font-head)] text-4xl md:text-5xl font-extrabold text-[#2B3E50] mb-6 leading-tight">
            Thank You for Connecting!
          </h1>
          
          <p className="font-[family-name:var(--font-body)] text-[16px] text-[#6B7B8D] mb-10 leading-relaxed max-w-md">
            Your inquiry has been successfully captured and registered in our database. Our sales and engineering team will review your requirements and respond within <strong>1 business day</strong>.
          </p>

          {/* Action Box */}
          <div className="w-full bg-[#F8F9FA] rounded-2xl p-6 border border-[#e2e8f0] mb-10 text-left space-y-4">
            <h4 className="font-[family-name:var(--font-head)] text-sm font-bold text-[#2B3E50] uppercase tracking-wider mb-2 flex items-center gap-2">
              <ShieldCheck size={18} className="text-[#2D8B6E]" /> What Happens Next?
            </h4>
            <ol className="list-decimal pl-5 text-sm text-[#6B7B8D] space-y-2 font-[family-name:var(--font-body)]">
              <li><strong>Database Logged:</strong> Your details are safely stored in our secure database.</li>
              <li><strong>Lead Assigned:</strong> A dedicated channel manager is assigned based on your role (Dealer/Distributor/Installer).</li>
              <li><strong>Direct Follow-up:</strong> We will reach out via email or phone with custom pricing or catalogues.</li>
            </ol>
          </div>

          {/* Dynamic Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <a
              href="https://wa.me/919426031064?text=Hello%20TEC%20Industries%2C%20I%20just%20submitted%20a%20website%20inquiry%20and%20would%20like%20to%20speed%20up%20my%20request."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary py-4 px-8 justify-center text-[15px]"
            >
              <MessageSquare size={18} /> Chat on WhatsApp
            </a>
            
            <Link
              href="/resources/catalog"
              className="btn-outline-white text-[#2B3E50] border-[#2B3E50] hover:bg-[#2B3E50] hover:text-white py-4 px-8 justify-center text-[15px]"
              style={{ border: '1.5px solid #2B3E50' }}
            >
              <Download size={18} /> Download Catalogs
            </Link>
          </div>

          {/* Return link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#6B7B8D] hover:text-[#3DAA7A] transition-colors font-semibold font-[family-name:var(--font-body)] text-sm mt-8 group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> Back to Homepage
          </Link>

        </div>
      </div>
    </div>
  );
}
