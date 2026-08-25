'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowUpRight, Check, FileText, SlidersHorizontal } from 'lucide-react';

/* TEC PPR CATALOGUE — Bold Industrial / International-grade. */

const ASSETS = {
  system: '/manus-storage/tec-industries-ppr-pipe-green-blue_2aec4472.jpg',
  fusion: '/manus-storage/tec-industries-ppr-fusion-joining_f5b1bacd.jpg',
  material: '/manus-storage/tec-industries-ppr-fittings-transition-flange_32fab6a0.jpg',
  fittings: '/manus-storage/tec-industries-ppr-fittings-elbows-tees_fedf0d44.jpg',
};

const CATALOGUE_ITEMS = [
  { family: 'PPR Pipes', group: 'Pipes', image: ASSETS.system, description: 'Green and blue triple-layer PPR pipe lengths for industrial utility and project conversations.', detail: 'Request the applicable nominal size, project quantity and current documentation.' },
  { family: 'Elbows', group: 'Fittings', image: ASSETS.fittings, description: 'Direction-change fittings for PPR route planning and installation layouts.', detail: 'Share the required angle and line-size context for review.' },
  { family: 'Tees', group: 'Fittings', image: ASSETS.fittings, description: 'Branching fittings for distribution, equipment connections and plant utility routes.', detail: 'Confirm the branch configuration and size combination with TEC.' },
  { family: 'Reducers', group: 'Fittings', image: ASSETS.fittings, description: 'Transition fittings for a controlled change in nominal pipe size.', detail: 'Request reducer combinations against the main and branch line requirements.' },
  { family: 'Couplings', group: 'Fittings', image: ASSETS.fittings, description: 'Straight joining fittings for continuous PPR pipe runs and repair planning.', detail: 'Share the pipe size and service condition for a matching discussion.' },
  { family: 'Unions', group: 'Fittings', image: ASSETS.fittings, description: 'Detachable system connections for planned access and maintenance locations.', detail: 'Confirm connection type and access requirements before selection.' },
  { family: 'Flanges', group: 'Fittings', image: ASSETS.material, description: 'Flanged PPR transition points for equipment, valve and service-line interfaces.', detail: 'Request the matching interface and project context for review.' },
  { family: 'PPR Valves', group: 'Fittings', image: ASSETS.material, description: 'PPR-compatible valve families for isolation and utility service control.', detail: 'Share the operating-medium and control requirement for the right discussion.' },
  { family: 'Transition Fittings', group: 'Fittings', image: ASSETS.material, description: 'System transitions for selected equipment, threaded or mixed-material interfaces.', detail: 'Request a project-specific review before procurement.' },
];

const FILTERS = ['All', 'Pipes', 'Fittings'] as const;
type Filter = (typeof FILTERS)[number];

export default function PprCatalogPage() {
  const [filter, setFilter] = useState<Filter>('All');
  const visibleItems = useMemo(() => CATALOGUE_ITEMS.filter((item) => filter === 'All' || item.group === filter), [filter]);

  return (
    <div className="min-h-screen bg-[#f3f5f2]">
      <section className="relative overflow-hidden bg-[#090f14] text-white">
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(85,202,146,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(85,202,146,0.1)_1px,transparent_1px)] [background-size:54px_54px]" />
        <div className="absolute inset-y-0 right-0 hidden w-[57%] lg:block"><Image src={ASSETS.system} alt="Green and blue triple-layer PPR pipes with fitting families" fill priority sizes="57vw" className="object-cover opacity-62" /><div className="absolute inset-0 bg-[linear-gradient(90deg,#090f14_0%,rgba(9,15,20,0.82)_34%,rgba(9,15,20,0.10)_100%)]" /></div>
        <div className="container-xl relative z-10 py-[clamp(5rem,10vw,10rem)]">
          <div className="max-w-3xl"><p className="section-eyebrow text-[#55ca92]">PPR system catalogue</p><h1 className="mt-5 max-w-[10ch] font-[var(--font-display)] text-[clamp(4rem,8vw,8.5rem)] font-extrabold uppercase leading-[0.79] tracking-[-0.055em]">System families. Project-ready conversation.</h1><p className="mt-7 max-w-xl text-[1rem] leading-7 text-white/68">The TEC PPR catalogue brings pipes, elbows, tees, reducers, couplings, unions, flanges, valves and transition fitting families into one project-review index. Exact item data and current documents are issued against your requirement.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#system-index" className="btn-primary">Browse the system index <ArrowUpRight size={16} /></a><Link href="/contact?resource=ppr-catalogue" className="btn-secondary">Request PPR documents <FileText size={15} /></Link></div></div>
        </div>
      </section>

      <section className="border-b border-[#dde4e5] bg-white"><div className="container-xl grid gap-px border-x border-[#dde4e5] bg-[#dde4e5] md:grid-cols-3">{[['01', 'Verified families', 'Each tile represents a currently listed product family, not a substitute for project-specific data.'], ['02', 'Green + blue PPR', 'TEC’s triple-layer PPR range is represented as a recognisable system cue across this catalogue.'], ['03', 'Document route', 'Request current drawings, technical literature and commercial support against your project.']].map(([number, title, copy]) => <div key={number} className="bg-white p-6"><span className="font-[var(--font-mono)] text-[0.62rem] text-[#2fae78]">{number}</span><h2 className="mt-9 font-[var(--font-display)] text-[1.75rem] font-bold uppercase leading-[0.9] text-[#1a2834]">{title}</h2><p className="mt-3 text-sm leading-6 text-[#607384]">{copy}</p></div>)}</div></section>

      <section id="system-index" className="section-space"><div className="container-xl"><div className="flex flex-col gap-6 border-b border-[#c7d1d6] pb-9 md:flex-row md:items-end md:justify-between"><div><p className="section-eyebrow">System index</p><h2 className="section-heading">PPR product families</h2><p className="mt-5 max-w-xl text-[0.98rem] leading-7 text-[#607384]">What is included in the TEC PPR catalogue? It is a family-level selection guide for pipes and common fittings. Select the family here, then provide your project inputs for an applicable documentation and quotation discussion.</p></div><div className="flex flex-wrap items-center gap-2" aria-label="Filter PPR catalogue by product group"><SlidersHorizontal size={15} className="mr-1 text-[#607384]" />{FILTERS.map((item) => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)} className="border px-4 py-2 font-[var(--font-mono)] text-[0.64rem] font-medium uppercase tracking-[0.1em] transition-colors" style={{ background: filter === item ? '#0f171f' : '#fff', color: filter === item ? '#55ca92' : '#273a49', borderColor: filter === item ? '#0f171f' : '#c7d1d6' }}>{item}</button>)}</div></div>
        <div className={`mt-8 grid gap-px border border-[#c7d1d6] bg-[#c7d1d6] ${visibleItems.length === 1 ? 'max-w-[34rem] grid-cols-1' : 'sm:grid-cols-2 xl:grid-cols-3'}`}>{visibleItems.map((item, index) => <article key={item.family} className="group relative min-h-[21rem] overflow-hidden bg-white transition-colors hover:bg-[#0f171f]"><div className="relative h-40 overflow-hidden bg-[#0f171f]"><Image src={item.image} alt={`${item.family} PPR product family`} fill sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(9,15,20,0.72),rgba(9,15,20,0.08))]" /><span className="absolute bottom-4 left-5 font-[var(--font-mono)] text-[0.62rem] uppercase tracking-[0.12em] text-[#55ca92]">{item.group} · {String(index + 1).padStart(2, '0')}</span></div><div className="p-7"><h3 className="font-[var(--font-display)] text-[2.45rem] font-bold uppercase leading-[0.84] tracking-[-0.03em] text-[#1a2834] transition-colors group-hover:text-white">{item.family}</h3><p className="mt-4 text-sm leading-6 text-[#607384] transition-colors group-hover:text-white/65">{item.description}</p><p className="mt-6 flex items-start gap-2 border-t border-[#dde4e5] pt-4 text-xs leading-5 text-[#273a49] transition-colors group-hover:border-white/15 group-hover:text-white/70"><Check size={15} className="mt-0.5 shrink-0 text-[#2fae78]" />{item.detail}</p></div></article>)}</div>
      </div></section>

      <section className="overflow-hidden bg-white"><div className="container-xl grid gap-0 lg:grid-cols-2"><div className="relative min-h-[23rem] bg-[#0f171f]"><Image src={ASSETS.fusion} alt="Technician preparing a PPR fusion connection" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /><div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(9,15,20,0.58),transparent)]" /></div><div className="flex items-center bg-[#0f171f] p-[clamp(2rem,6vw,6rem)] text-white"><div><p className="section-eyebrow text-[#55ca92]">From system index to requirement</p><h2 className="max-w-[11ch] font-[var(--font-display)] text-[clamp(3rem,5vw,5rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.04em]">Your catalogue family is the starting point.</h2><p className="mt-6 max-w-md text-[0.98rem] leading-7 text-white/66">To move forward, share your application, nominal size, operating requirement, project quantity and location. TEC can then route the enquiry toward current documents and a product discussion.</p><Link href="/contact?resource=ppr-catalogue" className="btn-primary mt-8">Discuss your requirement <ArrowUpRight size={16} /></Link></div></div></div></section>

      <section className="bg-[#173c36] py-8 text-white"><div className="container-xl flex flex-col gap-5 md:flex-row md:items-center md:justify-between"><div><p className="font-[var(--font-mono)] text-[0.62rem] uppercase tracking-[0.13em] text-[#55ca92]">Technical documentation</p><h2 className="mt-2 font-[var(--font-display)] text-[2rem] font-bold uppercase leading-[0.9]">Need size, drawing or pressure-class information?</h2></div><Link href="/contact?resource=ppr-catalogue" className="btn-secondary shrink-0">Request current PPR documents <ArrowUpRight size={16} /></Link></div></section>
    </div>
  );
}
