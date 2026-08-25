'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';

const PRODUCTS_MENU = [
  { label: 'PPR Pipe & Fittings', href: '/products/ppr', desc: 'Green and blue triple-layer PPR systems' },
  { label: 'HDPE Pipe & Fittings', href: '/products/hdpe', desc: 'Industrial and underground routing' },
  { label: 'Electrofusion Fittings', href: '/products/electrofusion', desc: 'Coupling and branch connections' },
  { label: 'Industrial Valves', href: '/products/valves', desc: 'Flow-control system components' },
  { label: 'Pipe Support Systems', href: '/products/pipe-support', desc: 'Installation support and brackets' },
  { label: 'Fusion Machinery', href: '/products/fusion-machine', desc: 'PPR welding equipment' },
];

const NAV_LINKS = [
  { label: 'Industries', href: '/industries' },
  { label: 'Quality', href: '/quality' },
  { label: 'Resources', href: '/resources' },
  { label: 'About', href: '/about' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-200"
      style={{
        height: 'var(--header-height)',
        background: scrolled ? 'rgba(9, 15, 20, 0.96)' : 'rgba(9, 15, 20, 0.9)',
        borderColor: scrolled ? 'rgba(221, 228, 229, 0.16)' : 'rgba(221, 228, 229, 0.08)',
        boxShadow: scrolled ? '0 12px 32px rgba(0,0,0,0.22)' : 'none',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div className="container-xl h-full">
        <div className="flex h-full items-center justify-between gap-6">
          <Link href="/" className="group flex min-w-0 items-center gap-3" aria-label="TEC INDUSTRIES home">
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center border border-white/25 bg-white/[0.03]">
              <Image
                src="/assets/tec-logo.png"
                alt=""
                fill
                sizes="40px"
                className="object-contain p-1.5 brightness-0 invert transition-transform duration-200 group-hover:scale-105"
              />
            </span>
            <span className="hidden min-w-0 sm:block">
              <span className="block whitespace-nowrap font-[var(--font-body)] text-[0.8rem] font-extrabold tracking-[0.19em] text-white">TEC INDUSTRIES</span>
              <span className="mt-0.5 block font-[var(--font-mono)] text-[0.5rem] tracking-[0.16em] text-[#55ca92]">INDUSTRIAL PIPING SYSTEMS</span>
            </span>
          </Link>

          <nav className="hidden h-full items-center gap-6 xl:flex" aria-label="Primary navigation">
            <Link href="/" className="nav-link">Home</Link>
            <div
              className="relative flex h-full items-center"
              onMouseEnter={() => setProductOpen(true)}
              onMouseLeave={() => setProductOpen(false)}
            >
              <button
                type="button"
                className="nav-link gap-1.5 border-0 bg-transparent"
                aria-expanded={productOpen}
                aria-controls="product-navigation-panel"
                onClick={() => setProductOpen((open) => !open)}
              >
                Products <ChevronDown size={13} className={`transition-transform duration-200 ${productOpen ? 'rotate-180 text-[#55ca92]' : ''}`} />
              </button>
              <div
                id="product-navigation-panel"
                className={`absolute left-1/2 top-full w-[43rem] -translate-x-1/2 pt-3 transition-all duration-200 ${productOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'}`}
              >
                <div className="overflow-hidden border border-white/15 bg-[#0f171f] shadow-[0_24px_60px_rgba(0,0,0,0.42)]">
                  <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                    <div>
                      <p className="font-[var(--font-mono)] text-[0.61rem] tracking-[0.15em] text-[#55ca92] uppercase">Product Systems</p>
                      <p className="mt-1 text-sm text-white/60">Select a product family for your project review.</p>
                    </div>
                    <Link href="/products" className="text-xs font-extrabold uppercase tracking-[0.1em] text-white transition-colors hover:text-[#55ca92]" onClick={() => setProductOpen(false)}>All systems <ArrowUpRight size={14} className="ml-1 inline" /></Link>
                  </div>
                  <div className="grid grid-cols-2 gap-px bg-white/10">
                    {PRODUCTS_MENU.map((item, index) => (
                      <Link key={item.href} href={item.href} className="group/item bg-[#0f171f] px-6 py-5 transition-colors hover:bg-white/[0.055]" onClick={() => setProductOpen(false)}>
                        <span className="font-[var(--font-mono)] text-[0.58rem] tracking-[0.12em] text-[#55ca92]">0{index + 1}</span>
                        <span className="mt-2 block font-[var(--font-display)] text-xl font-bold uppercase tracking-[0.01em] text-white transition-colors group-hover/item:text-[#55ca92]">{item.label}</span>
                        <span className="mt-1 block text-xs leading-5 text-white/52">{item.desc}</span>
                      </Link>
                    ))}
                  </div>
                  <Link href="/resources/ppr-catalog" className="flex items-center justify-between bg-[#173c36] px-6 py-4 font-[var(--font-mono)] text-[0.65rem] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#1e5048]" onClick={() => setProductOpen(false)}>
                    View the PPR pipe and fitting-family catalogue <ArrowUpRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
            {NAV_LINKS.map((link) => <Link key={link.href} href={link.href} className="nav-link">{link.label}</Link>)}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/contact" className="btn-primary hidden min-h-0 px-4 py-3 text-[0.63rem] lg:inline-flex">Request a Quote <ArrowUpRight size={14} /></Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center border border-white/25 bg-white/[0.03] text-white transition-colors hover:border-[#55ca92] hover:text-[#55ca92] xl:hidden"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`absolute inset-x-0 top-full overflow-hidden border-b border-white/10 bg-[#090f14] transition-[max-height,opacity] duration-300 xl:hidden ${menuOpen ? 'max-h-[calc(100vh-var(--header-height))] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="container-xl max-h-[calc(100vh-var(--header-height))] overflow-y-auto py-5">
          <div className="border-t border-white/10">
            <Link href="/" className="flex items-center justify-between border-b border-white/10 py-4 font-[var(--font-display)] text-2xl font-bold uppercase text-white" onClick={() => setMenuOpen(false)}>Home <ArrowUpRight size={18} className="text-[#55ca92]" /></Link>
            <div className="border-b border-white/10 py-4">
              <p className="font-[var(--font-mono)] text-[0.62rem] uppercase tracking-[0.15em] text-[#55ca92]">Product Systems</p>
              <div className="mt-3 grid gap-1 sm:grid-cols-2">
                {PRODUCTS_MENU.map((item, index) => (
                  <Link key={item.href} href={item.href} className="group flex items-start gap-3 px-2 py-3 text-white/80 transition-colors hover:bg-white/[0.05] hover:text-white" onClick={() => setMenuOpen(false)}>
                    <span className="mt-0.5 font-[var(--font-mono)] text-[0.58rem] text-[#55ca92]">0{index + 1}</span>
                    <span><span className="block font-[var(--font-body)] text-sm font-bold">{item.label}</span><span className="mt-0.5 block text-xs leading-5 text-white/45">{item.desc}</span></span>
                  </Link>
                ))}
              </div>
            </div>
            {NAV_LINKS.map((link) => <Link key={link.href} href={link.href} className="flex items-center justify-between border-b border-white/10 py-4 font-[var(--font-display)] text-2xl font-bold uppercase text-white" onClick={() => setMenuOpen(false)}>{link.label}<ArrowUpRight size={18} className="text-[#55ca92]" /></Link>)}
          </div>
          <Link href="/contact" className="btn-primary mt-5 w-full" onClick={() => setMenuOpen(false)}>Start a project enquiry <ArrowUpRight size={16} /></Link>
        </div>
      </div>
    </header>
  );
}
