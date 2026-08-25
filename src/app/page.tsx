'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Check, FileText, Layers3, MoveRight } from 'lucide-react';
import { useEffect } from 'react';

/*
 * TEC INDUSTRIES HOMEPAGE — Bold Industrial / International-grade.
 * The layout is deliberately asymmetric: editorial text block at left, product
 * evidence at right, then a technical dossier rhythm of dark and light surfaces.
 */

const SYSTEMS = [
  {
    number: '01',
    title: 'PPR Pipe Systems',
    body: 'Green and blue triple-layer PPR pipes, coordinated fittings and project-led document support for industrial utility discussions.',
    href: '/products/ppr',
    label: 'Pipe + fitting systems',
  },
  {
    number: '02',
    title: 'Industrial Piping',
    body: 'HDPE, electrofusion, valves and support-system families for project teams planning dependable routing and interfaces.',
    href: '/products',
    label: 'Plant utility routing',
  },
  {
    number: '03',
    title: 'Fusion Equipment',
    body: 'PPR fusion welding machinery and installation support for a more coordinated product-and-process conversation.',
    href: '/products/fusion-machine',
    label: 'Joining + installation',
  },
];

const PROJECT_INPUTS = ['Application or service medium', 'Nominal size / DN range', 'Operating pressure or class', 'Project location and quantity'];

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What should an industrial piping RFQ include?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A useful industrial piping RFQ identifies the application, nominal size, operating requirement, project location and approximate quantity. This helps TEC route the request to the right product and document conversation.',
      },
    },
  ],
};

export default function HomePage() {
  useEffect(() => {
    const items = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-revealed')),
      { threshold: 0.12 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <section className="relative overflow-hidden bg-[#090f14] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,15,20,0.98)_0%,rgba(9,15,20,0.94)_39%,rgba(9,15,20,0.50)_72%,rgba(9,15,20,0.60)_100%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(85,202,146,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(85,202,146,0.09)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="absolute inset-y-0 right-0 hidden w-[62%] lg:block">
          <Image
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663160765145/CfNlpxGQJYrbQZIj.jpg"
            alt="Green and blue triple-layer PPR pipe production environment"
            fill
            priority
            sizes="(min-width: 1024px) 62vw, 100vw"
            className="object-cover object-center opacity-75"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#090f14_0%,rgba(9,15,20,0.65)_25%,rgba(9,15,20,0.12)_75%,rgba(9,15,20,0.28)_100%)]" />
        </div>

        <div className="container-xl relative z-10 flex min-h-[calc(100svh-var(--header-height))] items-center py-18 lg:py-24">
          <div className="max-w-3xl pb-12 pt-8 lg:w-[57%] lg:pb-0">
            <p className="section-eyebrow text-[#55ca92]">TEC INDUSTRIES · VAPI, GUJARAT</p>
            <h1 className="max-w-[9ch] font-[var(--font-display)] text-[clamp(3.2rem,13.4vw,9.2rem)] font-extrabold uppercase leading-[0.79] tracking-[-0.055em] text-white">
              Built on<br />
              <span className="text-[#55ca92]">Trust.</span><br />
              Driven by<br />
              <span className="text-white/90">Commitment.</span>
            </h1>
            <p className="mt-7 max-w-xl text-[1.02rem] leading-8 text-white/70 sm:text-[1.12rem]">
              Industrial piping solutions for manufacturing plants and industrial projects—built around product families, technical review and an enquiry path that respects your project context.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">Request a project quote <ArrowUpRight size={16} /></Link>
              <Link href="/resources/ppr-catalog" className="btn-secondary">Explore PPR catalogue <ArrowUpRight size={16} /></Link>
            </div>
            <div className="mt-10 grid max-w-2xl gap-3 border-t border-white/15 pt-5 sm:grid-cols-3">
              {['Green + blue triple-layer PPR', 'Pipes, fittings + machinery', 'Project-led technical discussion'].map((item) => (
                <div key={item} className="flex items-start gap-2 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-white/62"><Check size={14} className="mt-0.5 shrink-0 text-[#55ca92]" />{item}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 font-[var(--font-mono)] text-[0.58rem] uppercase tracking-[0.18em] text-white/45 lg:flex"><ArrowDown size={13} className="text-[#55ca92]" /> Scroll to review systems</div>
      </section>

      <section className="border-y border-[#dde4e5] bg-[#f3f5f2] py-5">
        <div className="container-xl grid gap-3 sm:grid-cols-3 sm:gap-6">
          {[['01', 'SYSTEM REVIEW', 'Choose a product family and application context.'], ['02', 'TECHNICAL INPUT', 'Share line size, service and project requirement.'], ['03', 'PROJECT RESPONSE', 'Request applicable documents and a quote discussion.']].map(([number, title, body]) => (
            <div key={number} className="flex items-start gap-3"><span className="font-[var(--font-mono)] text-[0.65rem] text-[#2fae78]">{number}</span><p className="m-0 text-xs leading-5 text-[#607384]"><strong className="mr-1 text-[0.67rem] tracking-[0.09em] text-[#1a2834]">{title}</strong>{body}</p></div>
          ))}
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-xl grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div data-reveal className="reveal">
            <p className="section-eyebrow">System selection</p>
            <h2 className="section-heading">One industrial partner. Clearer system choices.</h2>
            <p className="mt-7 max-w-md text-[0.98rem] leading-7 text-[#607384]">TEC INDUSTRIES supports industrial project conversations with an organised range of piping systems, fittings, valves, supports and fusion machinery.</p>
            <Link href="/products" className="btn-ghost mt-8">View product systems <ArrowUpRight size={16} /></Link>
          </div>
          <div className="grid gap-px border border-[#dde4e5] bg-[#dde4e5] sm:grid-cols-3" data-reveal>
            {SYSTEMS.map((system) => (
              <Link key={system.title} href={system.href} className="group bg-white p-6 transition-colors hover:bg-[#0f171f] sm:min-h-[25rem] sm:p-7">
                <span className="font-[var(--font-mono)] text-[0.64rem] tracking-[0.12em] text-[#2fae78]">{system.number}</span>
                <div className="mt-16 sm:mt-24"><p className="font-[var(--font-mono)] text-[0.59rem] uppercase tracking-[0.12em] text-[#607384] transition-colors group-hover:text-[#55ca92]">{system.label}</p><h3 className="mt-3 font-[var(--font-display)] text-[2.15rem] font-bold uppercase leading-[0.88] tracking-[-0.025em] text-[#1a2834] transition-colors group-hover:text-white">{system.title}</h3><p className="mt-4 text-sm leading-6 text-[#607384] transition-colors group-hover:text-white/65">{system.body}</p><span className="mt-7 inline-flex items-center gap-2 font-[var(--font-mono)] text-[0.65rem] font-medium uppercase tracking-[0.11em] text-[#1a2834] transition-colors group-hover:text-[#55ca92]">Explore <MoveRight size={15} /></span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0f171f] py-[clamp(4.5rem,8vw,8rem)] text-white">
        <div className="container-xl grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div data-reveal className="reveal">
            <p className="section-eyebrow text-[#55ca92]">PPR system focus</p>
            <h2 className="max-w-[11ch] font-[var(--font-display)] text-[clamp(3.2rem,6vw,6.6rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.045em]">Green and blue PPR. One coordinated project conversation.</h2>
            <p className="mt-7 max-w-xl text-[1rem] leading-7 text-white/66">TEC’s green and blue triple-layer PPR pipe range can be reviewed alongside fitting families and project requirements. For exact sizes, pressure classes and current literature, use the documentation route.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/resources/ppr-catalog" className="btn-primary">Browse fitting families <ArrowUpRight size={16} /></Link><Link href="/contact?resource=ppr-catalogue" className="btn-secondary">Request documents <FileText size={15} /></Link></div>
          </div>
          <div data-reveal className="reveal relative border border-white/12 bg-[#14202a] p-3 shadow-[0_30px_70px_rgba(0,0,0,0.28)]">
            <div className="relative aspect-[3/2] overflow-hidden"><Image src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663160765145/QbOvddWIZIVIuIGv.jpg" alt="Green and blue triple-layer PPR pipe system with fittings" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" /><div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgba(9,15,20,0.9),transparent)] p-5"><p className="font-[var(--font-mono)] text-[0.6rem] uppercase tracking-[0.14em] text-[#55ca92]">PPR system cue</p><p className="mt-1 font-[var(--font-display)] text-2xl font-bold uppercase">Pipe lengths + fitting families</p></div></div>
            <div className="absolute -bottom-3 -left-3 hidden border border-[#55ca92]/35 bg-[#173c36] px-5 py-4 md:block"><p className="font-[var(--font-mono)] text-[0.57rem] uppercase tracking-[0.13em] text-[#55ca92]">Document-first selection</p><p className="mt-1 text-sm text-white/78">No unverified SKU data published.</p></div>
          </div>
        </div>
      </section>

      <section className="section-space bg-[#f3f5f2]">
        <div className="container-xl grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div data-reveal className="reveal"><p className="section-eyebrow">Answer-first project support</p><h2 className="section-heading">What should an industrial piping RFQ include?</h2><p className="mt-7 max-w-md text-[0.98rem] leading-7 text-[#607384]">A useful starting enquiry identifies the application, nominal size, operating requirement, project location and approximate quantity. This helps TEC route the request to the right product and document conversation.</p></div>
          <div className="grid gap-px border border-[#dde4e5] bg-[#dde4e5] sm:grid-cols-2" data-reveal>
            {PROJECT_INPUTS.map((input, index) => <div key={input} className="bg-white p-6"><span className="font-[var(--font-mono)] text-[0.62rem] text-[#2fae78]">0{index + 1}</span><p className="mt-10 font-[var(--font-display)] text-[1.8rem] font-bold uppercase leading-[0.95] text-[#1a2834]">{input}</p></div>)}
          </div>
        </div>
      </section>

      <section className="bg-white py-5">
        <div className="container-xl flex flex-col gap-6 border-y border-[#dde4e5] py-8 lg:flex-row lg:items-center lg:justify-between">
          <div><p className="section-eyebrow">Technical request</p><h2 className="font-[var(--font-display)] text-[clamp(2.3rem,4vw,4.25rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.035em] text-[#1a2834]">Let’s make the first project conversation useful.</h2></div>
          <div className="flex flex-wrap gap-3"><Link href="/contact" className="btn-primary">Start an RFQ <ArrowUpRight size={16} /></Link><Link href="/resources" className="btn-ghost">View resources <Layers3 size={16} /></Link></div>
        </div>
      </section>
    </>
  );
}
