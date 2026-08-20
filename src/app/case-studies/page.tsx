import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Building2, Factory, Droplets, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Case Studies — Industrial PPR, HDPE & Cooling Tower Installations | TEC INDUSTRIES',
  description: 'Real-world industrial installations using TEC INDUSTRIES PPR, HDPE, and Cooling Tower systems — from chemical plants and municipal water networks to pharmaceutical facilities across India.',
  alternates: { canonical: '/case-studies' },
};

const CASE_STUDIES = [
  {
    id: 1,
    client: 'Apex Chemical Processors',
    location: 'Ahmedabad, Gujarat',
    industry: 'Chemical Processing',
    icon: <Factory size={24} />,
    title: 'High-Temperature Acid Transfer System Overhaul',
    problem: 'The client was experiencing frequent leaks and downtime with their legacy PVC piping system when transferring corrosive acids at 70°C.',
    solution: 'TEC INDUSTRIES supplied PN20 PPR Pipes and CPVC Industrial Valves. The homogeneous fusion-welded joints of the PPR system eliminated leak points, while the CPVC valves handled the corrosive fluid perfectly.',
    results: 'Zero leaks reported in 18 months, reducing maintenance downtime by 90% and improving overall plant safety.',
    image: '/assets/ppr-pipes.png',
  },
  {
    id: 2,
    client: 'Metro Water Infrastructure',
    location: 'Pune, Maharashtra',
    industry: 'Municipal Infrastructure',
    icon: <Droplets size={24} />,
    title: 'Underground Water Distribution Network Expansion',
    problem: 'A new residential township required a durable, earthquake-resistant underground water distribution network that could be installed rapidly.',
    solution: 'We provided 15km of PN10 HDPE Pipes (110mm to 315mm) along with high-precision Electrofusion Fittings and welding equipment.',
    results: 'The flexibility of HDPE allowed for faster trenching. The electrofusion joints passed all pressure tests on the first try, completing the project 3 weeks ahead of schedule.',
    image: '/assets/electrofusion.png',
  },
  {
    id: 3,
    client: 'Zenith Pharma Corp',
    location: 'Baddi, Himachal Pradesh',
    industry: 'Pharmaceuticals',
    icon: <Building2 size={24} />,
    title: 'Clean Cooling System for HVAC & Reactors',
    problem: 'The facility needed to upgrade its cooling capacity without expanding the physical footprint, while maintaining strict hygienic standards.',
    solution: 'TEC installed two 500 TR FRP Square Cooling Towers equipped with high-efficiency PVC honeycomb fills and SS 304 hardware.',
    results: 'Cooling capacity increased by 40% within the exact same footprint, while energy consumption dropped by 15% due to the aerodynamic fan design.',
    image: '/assets/cooling-tower.png',
  }
];

export default function CaseStudiesPage() {
  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-32 pb-24">
      {/* Header */}
      <div className="container-xl mb-16 text-center">
        <span className="section-eyebrow">Proven Results</span>
        <h1 className="font-[family-name:var(--font-head)] text-4xl md:text-5xl font-extrabold text-[#2B3E50] mb-4">
          Industrial Case Studies
        </h1>
        <div className="teal-rule mx-auto mb-6" />
        <p className="font-[family-name:var(--font-body)] text-[#6B7B8D] max-w-2xl mx-auto">
          See how leading industrial plants, municipal contractors, and commercial facilities rely on TEC INDUSTRIES for their critical piping and cooling infrastructure.
        </p>
      </div>

      <div className="container-xl max-w-6xl">
        <div className="flex flex-col gap-12">
          {CASE_STUDIES.map((study, idx) => (
            <div key={study.id} className="bg-white rounded-3xl shadow-sm border border-[#e2e8f0] overflow-hidden flex flex-col lg:flex-row">
              
              {/* Image Side */}
              <div className={`relative w-full lg:w-2/5 min-h-[300px] lg:min-h-[auto] ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <Image src={study.image} alt={study.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141C28]/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-flex items-center gap-2 bg-[#3DAA7A] text-white text-xs font-bold px-3 py-1.5 rounded-md font-[family-name:var(--font-head)] tracking-wider mb-2">
                    {study.icon} {study.industry}
                  </div>
                  <div className="text-white font-[family-name:var(--font-body)] font-medium text-lg">
                    {study.client}
                  </div>
                  <div className="text-white/70 text-sm font-[family-name:var(--font-body)] flex items-center gap-1">
                    <MapPin size={14} /> {study.location}
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className={`p-8 md:p-12 lg:w-3/5 flex flex-col justify-center ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
                <h2 className="font-[family-name:var(--font-head)] text-3xl font-bold text-[#2B3E50] mb-8 leading-tight">
                  {study.title}
                </h2>
                
                <div className="space-y-6 font-[family-name:var(--font-body)]">
                  <div>
                    <h3 className="text-[#E85D26] font-bold text-sm tracking-wider uppercase mb-2">The Challenge</h3>
                    <p className="text-[#6B7B8D] leading-relaxed">{study.problem}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-[#3DAA7A] font-bold text-sm tracking-wider uppercase mb-2">The TEC Solution</h3>
                    <p className="text-[#6B7B8D] leading-relaxed">{study.solution}</p>
                  </div>
                  
                  <div className="bg-[#e6f4ef] p-6 rounded-xl border border-[#3DAA7A]/20">
                    <h3 className="text-[#2D8B6E] font-bold text-sm tracking-wider uppercase mb-2">Results</h3>
                    <p className="text-[#2B3E50] font-medium leading-relaxed">{study.results}</p>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/contact" className="btn-primary">
            Discuss Your Next Project <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
