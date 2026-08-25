'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Download, FileText, MessageSquare } from 'lucide-react';

/**
 * Design note: preserve TEC's familiar graphite, white, and technical-green catalogue language.
 * Product families reflect the verified PPR page; exact SKUs, dimensions and pressure data remain request-led.
 */

const ASSETS = {
  hero: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663160765145/wbCJPGEYNbiwAsAe.jpg',
  pipes: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663160765145/xeBDaiLdvsAapIjV.jpg',
  fittings: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663160765145/oYOiEOCKUKlngZfM.jpg',
  fusion: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663160765145/KiLcirVwfjtMwXeE.jpg',
};

const CATALOGUE_ITEMS = [
  {
    family: 'PPR Pipes',
    group: 'Pipes',
    description: 'PPR pipe lengths for industrial hot and cold water, utility and process-water discussions.',
    detail: 'Discuss the required nominal size, pressure class, service temperature and project quantity with TEC.',
    image: ASSETS.pipes,
  },
  {
    family: 'Elbows',
    group: 'Fittings',
    description: 'Direction-change fittings for PPR pipe route planning and installation layouts.',
    detail: 'Request the applicable angle, size and installation specification for your pipe run.',
    image: ASSETS.fittings,
  },
  {
    family: 'Tees',
    group: 'Fittings',
    description: 'Branching fittings for distribution, equipment connections and plant utility routes.',
    detail: 'Confirm the branch configuration and size combination with the technical team.',
    image: ASSETS.fittings,
  },
  {
    family: 'Reducers',
    group: 'Fittings',
    description: 'Transition fittings for a controlled change in nominal pipe size within the PPR system.',
    detail: 'Request reducer combinations against the main and branch line sizes in your BOQ.',
    image: ASSETS.fittings,
  },
  {
    family: 'Couplings',
    group: 'Fittings',
    description: 'Straight joining fittings for continuous PPR pipe runs and repair planning.',
    detail: 'Share the pipe size and service condition for a matching catalogue recommendation.',
    image: ASSETS.fittings,
  },
  {
    family: 'Unions',
    group: 'Fittings',
    description: 'Detachable PPR system connections for planned access and maintenance locations.',
    detail: 'Confirm the connection type and access requirement before issuing a project selection.',
    image: ASSETS.fittings,
  },
  {
    family: 'Flanges',
    group: 'Fittings',
    description: 'Flanged PPR transition points for equipment, valve and service-line interfaces.',
    detail: 'Request the matching flange interface, nominal size and service details for review.',
    image: ASSETS.fittings,
  },
  {
    family: 'PPR Valves',
    group: 'Fittings',
    description: 'PPR-compatible valve families for isolation and service control in utility piping.',
    detail: 'Share the operating medium and control requirement for the suitable valve discussion.',
    image: ASSETS.fittings,
  },
  {
    family: 'Transition Fittings',
    group: 'Fittings',
    description: 'System transition fittings for selected equipment, threaded or mixed-material interfaces.',
    detail: 'Request a project-specific transition recommendation before procurement.',
    image: ASSETS.fittings,
  },
];

const FILTERS = ['All', 'Pipes', 'Fittings'] as const;
type Filter = (typeof FILTERS)[number];

export default function PprCatalogPage() {
  const [filter, setFilter] = useState<Filter>('All');
  const visibleItems = useMemo(
    () => CATALOGUE_ITEMS.filter((item) => filter === 'All' || item.group === filter),
    [filter],
  );

  return (
    <div className="bg-[#F5F5F0] min-h-screen" style={{ paddingTop: '80px' }}>
      <section className="relative overflow-hidden bg-[#141C28]">
        <div className="absolute inset-0">
          <Image src={ASSETS.hero} alt="PPR pipes and fitting families arranged for industrial catalogue review" fill priority sizes="100vw" className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,28,40,0.98)_0%,rgba(20,28,40,0.88)_42%,rgba(20,28,40,0.42)_100%)]" />
        </div>
        <div className="container-xl relative z-10 py-24 md:py-32">
          <div className="max-w-3xl">
            <span className="section-eyebrow block text-[#3DAA7A] mb-5">PPR System Catalogue</span>
            <h1 className="font-[family-name:var(--font-head)] text-4xl md:text-6xl font-extrabold leading-[1.02] text-white mb-6">
              Pipes &amp; Fitting Families, Organised for Project Review.
            </h1>
            <p className="font-[family-name:var(--font-body)] text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mb-8">
              Browse the TEC PPR system range from pipe lengths through elbows, tees, reducers, couplings, unions, flanges, valves and transition fittings. Use the catalogue to prepare your enquiry; TEC will confirm project-specific sizes, pressure requirements and documentation.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#catalogue" className="btn-primary text-[14px] px-6 py-3.5">Browse Fitting Families <ArrowRight size={16} /></a>
              <Link href="/contact?resource=ppr-catalogue" className="btn-secondary text-[14px] px-6 py-3.5" style={{ textDecoration: 'none' }}>Request a Specification Pack</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#dde5e7] bg-white">
        <div className="container-xl grid gap-6 py-8 md:grid-cols-3">
          {[
            ['01', 'Verified Families', 'Every fitting family listed on the current TEC PPR product range is grouped here for a clearer procurement conversation.'],
            ['02', 'Project-Led Selection', 'Select by family first, then provide nominal size, operating service and quantity for an applicable configuration.'],
            ['03', 'Document Request', 'Use the enquiry route for current technical literature, drawings and commercial support against your project.'],
          ].map(([number, title, copy]) => (
            <div className="flex gap-4" key={title}>
              <span className="font-[family-name:var(--font-mono)] text-[#3DAA7A] text-sm pt-1">{number}</span>
              <div>
                <h2 className="font-[family-name:var(--font-head)] text-lg font-bold text-[#2B3E50] mb-1">{title}</h2>
                <p className="font-[family-name:var(--font-body)] text-sm leading-relaxed text-[#6B7B8D]">{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="catalogue" className="container-xl py-16 md:py-20">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <span className="section-eyebrow block text-[#3DAA7A] mb-3">System Index</span>
            <h2 className="font-[family-name:var(--font-head)] text-3xl md:text-4xl font-extrabold text-[#2B3E50]">PPR Product Families</h2>
            <p className="font-[family-name:var(--font-body)] text-[#6B7B8D] mt-3 max-w-2xl leading-relaxed">Filter the complete PPR catalogue by pipe or fitting family. Exact item codes and sizes are issued against the project requirement.</p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="Filter PPR catalogue by product group">
            {FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
                className="rounded-full px-4 py-2 text-sm font-bold transition-colors"
                style={{ background: filter === item ? '#2D8B6E' : '#fff', color: filter === item ? '#fff' : '#2B3E50', border: `1px solid ${filter === item ? '#2D8B6E' : '#d9e2e5'}` }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {visibleItems.map((item, index) => (
            <article key={item.family} className="overflow-hidden rounded-2xl border border-[#dfe6e8] bg-white shadow-[0_12px_35px_rgba(43,62,80,0.06)] transition-transform duration-300 hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden bg-[#141C28]">
                <Image src={item.image} alt={`${item.family} PPR catalogue family`} fill sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" priority={index < 3} />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(20,28,40,0.8)_100%)]" />
                <span className="absolute bottom-4 left-5 rounded-full bg-[#3DAA7A] px-3 py-1 text-[11px] font-bold tracking-[0.12em] text-white uppercase">{item.group}</span>
              </div>
              <div className="p-6">
                <h3 className="font-[family-name:var(--font-head)] text-2xl font-bold text-[#2B3E50] mb-2">{item.family}</h3>
                <p className="font-[family-name:var(--font-body)] text-sm leading-relaxed text-[#6B7B8D] mb-4">{item.description}</p>
                <div className="flex gap-2 border-t border-[#edf1f2] pt-4">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#3DAA7A]" />
                  <p className="font-[family-name:var(--font-body)] text-xs leading-relaxed text-[#4A5568]">{item.detail}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container-xl grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="relative min-h-[290px] overflow-hidden rounded-2xl bg-[#141C28] shadow-[0_18px_45px_rgba(20,28,40,0.2)]">
            <Image src={ASSETS.fusion} alt="PPR fusion system preparation at an industrial workbench" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <span className="section-eyebrow block text-[#3DAA7A] mb-3">System Support</span>
            <h2 className="font-[family-name:var(--font-head)] text-3xl md:text-4xl font-extrabold text-[#2B3E50] mb-4">From Catalogue Family to Project-Ready System.</h2>
            <p className="font-[family-name:var(--font-body)] text-[#6B7B8D] leading-relaxed mb-6">A catalogue family is the starting point—not a final engineering selection. Share your line size, pressure class, service medium, temperature, route and quantity for the relevant product discussion, documentation and quote.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact?resource=ppr-catalogue" className="btn-primary px-6 py-3.5 text-[14px]" style={{ textDecoration: 'none' }}><MessageSquare size={16} /> Discuss Your Requirement</Link>
              <Link href="/resources/catalog" className="btn-ghost px-6 py-3.5 text-[14px]" style={{ textDecoration: 'none' }}><Download size={16} /> Request Master Catalogue</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1E2A3A] py-14">
        <div className="container-xl flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#3DAA7A] mb-2"><FileText size={18} /><span className="font-[family-name:var(--font-head)] text-xs font-bold tracking-[0.14em] uppercase">Document Route</span></div>
            <h2 className="font-[family-name:var(--font-head)] text-2xl md:text-3xl font-extrabold text-white">Need dimensional or pressure-class information?</h2>
            <p className="font-[family-name:var(--font-body)] text-sm text-white/60 mt-2">Request current documentation against your product family and project scope.</p>
          </div>
          <Link href="/contact?resource=ppr-catalogue" className="btn-primary shrink-0 px-6 py-3.5 text-[14px]" style={{ textDecoration: 'none' }}>Request PPR Documents <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
