'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Droplets, Database, Zap, Settings, Wrench, Flame, Wind } from 'lucide-react';

const PRODUCTS_MENU = [
  { label: 'PPR Pipe & Fittings', href: '/products/ppr', desc: 'Hot & cold water systems', icon: Droplets },
  { label: 'HDPE Pipe & Fittings', href: '/products/hdpe', desc: 'Underground & industrial', icon: Database },
  { label: 'Electrofusion Fittings', href: '/products/electrofusion', desc: 'Precision pipe couplings', icon: Zap },
  { label: 'Industrial Valves', href: '/products/valves', desc: 'Flow control solutions', icon: Settings },
  { label: 'Pipe Support System', href: '/products/pipe-support', desc: 'Hangers & brackets', icon: Wrench },
  { label: 'PPR Fusion Machine', href: '/products/fusion-machine', desc: 'Professional welding tools', icon: Flame },
  { label: 'Cooling Towers', href: '/products/cooling-tower', desc: '10 TR to 1000 TR capacity', icon: Wind },
];

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Industries', href: '/industries' },
  { label: 'Quality', href: '/quality' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(20,28,40,0.92)'
          : 'linear-gradient(180deg, rgba(20,28,40,0.95) 0%, rgba(20,28,40,0.85) 100%)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(45,139,110,0.15)' : '1px solid transparent',
        boxShadow: scrolled ? '0 10px 40px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      <div className="container-xl">
        <div className="flex items-center justify-between h-20 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/assets/tec-logo.png"
              alt="TEC INDUSTRIES"
              width={52}
              height={52}
              className="brightness-0 invert transition-transform duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_rgba(45,139,110,0.5)]"
            />
            <div className="hidden sm:block">
              <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '19px', color: '#fff', letterSpacing: '0.02em', lineHeight: 1 }}>
                TEC INDUSTRIES
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 h-full">
            <Link href="/" className="nav-link text-[14px] uppercase tracking-wider font-semibold hover:text-[#3DAA7A] transition-colors relative group py-8">
              Home
              <span className="absolute bottom-6 left-0 w-0 h-0.5 bg-gradient-to-r from-[#2D8B6E] to-[#3DAA7A] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* Premium Products Mega Menu (CSS Based) */}
            <div className="group relative h-full flex items-center cursor-pointer py-8">
              <div className="nav-link flex items-center gap-1.5 text-[14px] uppercase tracking-wider font-semibold text-white/80 group-hover:text-white transition-colors">
                Products
                <ChevronDown size={14} className="transition-transform duration-300 group-hover:-rotate-180 text-[#3DAA7A]" />
              </div>

              {/* Dropdown Container */}
              <div className="absolute top-[80px] left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out z-50">
                <div 
                  className="w-[640px] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                  style={{ 
                    background: 'rgba(20,28,40,0.95)', 
                    backdropFilter: 'blur(24px)', 
                    border: '1px solid rgba(45,139,110,0.2)',
                  }}
                >
                  {/* Top Highlight line */}
                  <div className="h-1 w-full bg-gradient-to-r from-[#2D8B6E] to-[#3DAA7A]" />
                  
                  {/* Grid */}
                  <div className="p-6 grid grid-cols-2 gap-3 relative">
                    {/* Subtle decorative background glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] bg-[#3DAA7A] opacity-5 blur-[100px] pointer-events-none rounded-full" />
                    
                    {PRODUCTS_MENU.map((item) => (
                      <Link 
                        key={item.href} 
                        href={item.href}
                        className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/[0.04] border border-transparent hover:border-white/[0.05] transition-all duration-200 group/item"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#2D8B6E]/10 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                          <item.icon size={20} className="text-[#3DAA7A]" />
                        </div>
                        <div>
                          <div className="font-[var(--font-head)] font-bold text-[15px] text-white/90 mb-1 group-hover/item:text-white transition-colors">
                            {item.label}
                          </div>
                          <div className="font-[var(--font-body)] text-[12px] text-white/50 leading-tight">
                            {item.desc}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Bottom Footer Area of Dropdown */}
                  <div className="bg-black/20 p-4 border-t border-white/5 flex items-center justify-between">
                    <span className="font-[var(--font-body)] text-[13px] text-white/60">
                      Explore our complete industrial piping range
                    </span>
                    <Link href="/products" className="text-[13px] font-bold text-[#3DAA7A] hover:text-white transition-colors flex items-center gap-1">
                      View All Products <ChevronDown size={14} className="-rotate-90" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {NAV_LINKS.slice(1).map((link) => (
              <Link key={link.href} href={link.href} className="nav-link text-[14px] uppercase tracking-wider font-semibold hover:text-[#3DAA7A] transition-colors relative group py-8">
                {link.label}
                <span className="absolute bottom-6 left-0 w-0 h-0.5 bg-gradient-to-r from-[#2D8B6E] to-[#3DAA7A] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-4">
            <Link href="/contact" className="btn-primary hidden lg:inline-flex shadow-[0_0_20px_rgba(45,139,110,0.3)] hover:shadow-[0_0_30px_rgba(45,139,110,0.5)]" style={{ padding: '12px 24px', fontSize: '13px' }}>
              Get a Quote
            </Link>
            <button
              className="lg:hidden p-2 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: '#fff' }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ background: '#141C28', borderTop: '1px solid rgba(45,139,110,0.2)' }}
      >
        <div className="container-xl py-6 flex flex-col gap-2">
          {NAV_LINKS.slice(0, 1).map(link => (
            <Link key={link.label} href={link.href} className="block py-3 px-4 rounded-xl hover:bg-white/5 transition-colors font-[var(--font-body)] text-[15px] font-bold tracking-wider uppercase text-white/90" onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          
          <div className="py-2">
            <div className="px-4 py-2 font-[var(--font-body)] text-[15px] font-bold tracking-wider uppercase text-[#3DAA7A]">
              Products
            </div>
            <div className="pl-4 pr-2 flex flex-col gap-1 mt-2">
              {PRODUCTS_MENU.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-white/5 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <child.icon size={16} className="text-[#3DAA7A]" />
                  <span className="font-[var(--font-body)] text-[14px] text-white/70 font-semibold">{child.label}</span>
                </Link>
              ))}
              <Link href="/products" className="py-3 px-4 text-[#3DAA7A] text-[13px] font-bold" onClick={() => setMenuOpen(false)}>
                View All Products →
              </Link>
            </div>
          </div>

          {NAV_LINKS.slice(1).map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block py-3 px-4 rounded-xl hover:bg-white/5 transition-colors font-[var(--font-body)] text-[15px] font-bold tracking-wider uppercase text-white/90"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-6 mt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <Link href="/contact" className="btn-primary w-full justify-center py-4 text-[14px]" onClick={() => setMenuOpen(false)}>
              Request a Quote Today
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
