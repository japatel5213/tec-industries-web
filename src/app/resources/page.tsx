'use client';

import Link from 'next/link';
import { FileText, FileDown, ShieldCheck, Download, ArrowRight } from 'lucide-react';

// export const metadata = { ... } removed since client components cannot export metadata

export default function ResourcesPage() {
  return (
    <main className="bg-[#F5F5F0] min-h-screen pt-12 pb-24">
      {/* Header Banner */}
      <div className="container-xl mb-16">
        <div className="bg-gradient-to-r from-[#141C28] to-[#2B3E50] rounded-3xl p-10 md:p-16 text-white text-center shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#3DAA7A] rounded-full blur-[120px] opacity-20 pointer-events-none" />
          <span className="section-eyebrow text-[#3DAA7A] mb-4 block">Downloads & Docs</span>
          <h1 className="font-[family-name:var(--font-head)] text-4xl md:text-5xl font-extrabold mb-4 relative z-10">
            Technical Resources Hub
          </h1>
          <p className="font-[family-name:var(--font-body)] text-lg text-white/80 max-w-2xl mx-auto relative z-10">
            Access our master product catalogs, technical specifications, CAD drawings, and installation guidelines.
          </p>
        </div>
      </div>

      <div className="container-xl max-w-5xl">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Master Catalog (Gated) */}
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-[#e2e8f0] flex flex-col hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-[#e6f4ef] text-[#3DAA7A] rounded-xl flex items-center justify-center mb-6">
              <FileDown size={28} />
            </div>
            <h2 className="font-[family-name:var(--font-head)] text-2xl font-bold text-[#2B3E50] mb-3">
              Master Product Catalog
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[#6B7B8D] mb-8 leading-relaxed">
              Complete specifications, dimensions, and pressure ratings for our PPR, HDPE, Valves, and Electrofusion systems. (PDF, 15MB)
            </p>
            <Link href="/resources/catalog" className="btn-primary mt-auto self-start inline-flex items-center gap-2">
              <ShieldCheck size={16} /> Unlock Download
            </Link>
          </div>

          {/* Fusion Guide (Direct Download Placeholder) */}
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-[#e2e8f0] flex flex-col hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-[#edf2f7] text-[#4A5568] rounded-xl flex items-center justify-center mb-6">
              <FileText size={28} />
            </div>
            <h2 className="font-[family-name:var(--font-head)] text-2xl font-bold text-[#2B3E50] mb-3">
              Fusion Welding Guide
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[#6B7B8D] mb-8 leading-relaxed">
              Step-by-step instructions for performing perfect heat fusion joints using TEC PPR and HDPE welding machines. (PDF, 2MB)
            </p>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Document coming soon.'); }} className="btn-ghost mt-auto self-start inline-flex items-center gap-2">
              <Download size={16} /> Download PDF
            </a>
          </div>

          {/* Chemical Chart */}
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-[#e2e8f0] flex flex-col hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-[#edf2f7] text-[#4A5568] rounded-xl flex items-center justify-center mb-6">
              <FileText size={28} />
            </div>
            <h2 className="font-[family-name:var(--font-head)] text-2xl font-bold text-[#2B3E50] mb-3">
              Chemical Resistance Chart
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[#6B7B8D] mb-8 leading-relaxed">
              Detailed compatibility data for PPR and HDPE pipes against 300+ industrial chemicals, acids, and solvents.
            </p>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Document coming soon.'); }} className="btn-ghost mt-auto self-start inline-flex items-center gap-2">
              <Download size={16} /> Download PDF
            </a>
          </div>
          
          {/* Engineering Support */}
          <div className="bg-gradient-to-br from-[#3DAA7A] to-[#2D8B6E] p-8 md:p-10 rounded-2xl shadow-sm text-white flex flex-col">
            <h2 className="font-[family-name:var(--font-head)] text-2xl font-bold mb-3">
              Need CAD Files?
            </h2>
            <p className="font-[family-name:var(--font-body)] text-white/90 mb-8 leading-relaxed">
              We provide comprehensive CAD drawings and Revit families for engineering firms and consultants to easily specify our products.
            </p>
            <Link href="/contact" className="mt-auto self-start bg-white text-[#2D8B6E] hover:bg-[#F5F5F0] transition-colors font-bold font-[family-name:var(--font-body)] px-6 py-3 rounded-lg inline-flex items-center gap-2">
              Contact Engineering <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
