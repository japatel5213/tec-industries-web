import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, FileDown, ShieldCheck, Download, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Technical Resources, Catalogs & Project Documents | TEC INDUSTRIES',
  description: 'Request technical catalogs, product specifications, installation discussions, and engineering documents for TEC INDUSTRIES piping systems.',
  alternates: { canonical: '/resources' },
};

export default function ResourcesPage() {
  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-32 pb-24">
      <div className="container-xl mb-16">
        <div className="bg-gradient-to-r from-[#141C28] to-[#2B3E50] rounded-3xl p-10 md:p-16 text-white text-center shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#3DAA7A] rounded-full blur-[120px] opacity-20 pointer-events-none" />
          <span className="section-eyebrow text-[#3DAA7A] mb-4 block">Downloads & Docs</span>
          <h1 className="font-[family-name:var(--font-head)] text-4xl md:text-5xl font-extrabold mb-4 relative z-10">Technical Resources Hub</h1>
          <p className="font-[family-name:var(--font-body)] text-lg text-white/80 max-w-2xl mx-auto relative z-10">Access our master product catalogs, technical specifications, document-request routes, and engineering support.</p>
        </div>
      </div>

      <div className="container-xl max-w-5xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-[#e2e8f0] flex flex-col hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-[#e6f4ef] text-[#3DAA7A] rounded-xl flex items-center justify-center mb-6"><FileDown size={28} /></div>
            <h2 className="font-[family-name:var(--font-head)] text-2xl font-bold text-[#2B3E50] mb-3">Master Product Catalog</h2>
            <p className="font-[family-name:var(--font-body)] text-[#6B7B8D] mb-8 leading-relaxed">Request the latest product catalog for the relevant PPR, HDPE, valve or electrofusion system and project scope.</p>
            <Link href="/resources/catalog" className="btn-primary mt-auto self-start inline-flex items-center gap-2"><ShieldCheck size={16} /> Request Catalog</Link>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-[#e2e8f0] flex flex-col hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-[#edf2f7] text-[#4A5568] rounded-xl flex items-center justify-center mb-6"><FileText size={28} /></div>
            <h2 className="font-[family-name:var(--font-head)] text-2xl font-bold text-[#2B3E50] mb-3">Fusion Welding Guide</h2>
            <p className="font-[family-name:var(--font-body)] text-[#6B7B8D] mb-8 leading-relaxed">Request the applicable heat-fusion guidance for your pipe system, size range, equipment and installation scope.</p>
            <Link href="/contact?resource=fusion-welding-guide" className="btn-ghost mt-auto self-start inline-flex items-center gap-2"><Download size={16} /> Request Guide</Link>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-[#e2e8f0] flex flex-col hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-[#edf2f7] text-[#4A5568] rounded-xl flex items-center justify-center mb-6"><FileText size={28} /></div>
            <h2 className="font-[family-name:var(--font-head)] text-2xl font-bold text-[#2B3E50] mb-3">Chemical Compatibility Review</h2>
            <p className="font-[family-name:var(--font-body)] text-[#6B7B8D] mb-8 leading-relaxed">Request an application review for the specific chemical, concentration, temperature and pressure conditions in your process.</p>
            <Link href="/contact?resource=chemical-compatibility-review" className="btn-ghost mt-auto self-start inline-flex items-center gap-2"><Download size={16} /> Request Review</Link>
          </div>

          <div className="bg-gradient-to-br from-[#3DAA7A] to-[#2D8B6E] p-8 sm:p-10 rounded-2xl shadow-sm text-white flex flex-col justify-center">
            <h2 className="font-[family-name:var(--font-head)] text-2xl font-bold mb-3">Need CAD Files?</h2>
            <p className="font-[family-name:var(--font-body)] text-white/90 mb-8 leading-relaxed">Request drawings or engineering support with the product, nominal size, application and project approval stage.</p>
            <Link href="/contact?resource=engineering-documents" className="mt-auto self-start bg-white text-[#2D8B6E] hover:bg-[#F5F5F0] transition-colors font-bold font-[family-name:var(--font-body)] px-6 py-3 rounded-lg inline-flex items-center gap-2">Contact Engineering <ArrowRight size={16} /></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
