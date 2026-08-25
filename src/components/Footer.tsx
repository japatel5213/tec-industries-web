import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';

const FOOTER_GROUPS = [
  {
    heading: 'Product Systems',
    links: [
      { label: 'PPR Pipe & Fittings', href: '/products/ppr' },
      { label: 'HDPE Pipe & Fittings', href: '/products/hdpe' },
      { label: 'Electrofusion Fittings', href: '/products/electrofusion' },
      { label: 'Industrial Valves', href: '/products/valves' },
      { label: 'Fusion Machinery', href: '/products/fusion-machine' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About TEC', href: '/about' },
      { label: 'Industries Served', href: '/industries' },
      { label: 'Quality', href: '/quality' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Dealer Enquiry', href: '/dealer' },
    ],
  },
  {
    heading: 'Technical Resources',
    links: [
      { label: 'PPR Catalogue', href: '/resources/ppr-catalog' },
      { label: 'Resources Hub', href: '/resources' },
      { label: 'Blog & Insights', href: '/blog' },
      { label: 'Contact for Documents', href: '/contact?resource=documents' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#090f14] text-white">
      <div className="h-px bg-gradient-to-r from-transparent via-[#55ca92] to-transparent" />
      <div className="container-xl py-[clamp(4rem,7vw,7rem)]">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,0.7fr)]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="relative block h-11 w-11"><Image src="/assets/tec-logo.png" alt="" fill sizes="44px" className="object-contain brightness-0 invert" /></span>
              <span><span className="block font-[var(--font-body)] text-[0.86rem] font-extrabold tracking-[0.18em]">TEC INDUSTRIES</span><span className="mt-0.5 block font-[var(--font-mono)] text-[0.53rem] tracking-[0.15em] text-[#55ca92]">BUILT ON TRUST. DRIVEN BY COMMITMENT.</span></span>
            </Link>
            <p className="mt-7 max-w-md text-[0.9rem] leading-7 text-white/58">Industrial piping solutions for manufacturing plants and industrial projects. Based in Vapi, Gujarat, supporting project conversations across Gujarat and Pan-India.</p>
            <div className="mt-8 grid gap-3 text-sm text-white/65">
              <p className="flex items-start gap-3"><MapPin size={16} className="mt-1 shrink-0 text-[#55ca92]" /><span>PLOT NO. 700/1, 40 SHADE AREA,<br />GIDC, VAPI, GUJARAT 396195 (IN)</span></p>
              <a href="tel:+919426031064" className="flex items-center gap-3 transition-colors hover:text-[#55ca92]"><Phone size={15} className="text-[#55ca92]" />+91 94260 31064</a>
              <a href="mailto:info@tecindustries.in" className="flex items-center gap-3 transition-colors hover:text-[#55ca92]"><Mail size={15} className="text-[#55ca92]" />info@tecindustries.in</a>
            </div>
            <Link href="/contact" className="btn-primary mt-8">Start a project enquiry <ArrowUpRight size={16} /></Link>
          </div>
          {FOOTER_GROUPS.map((group) => (
            <div key={group.heading}>
              <h2 className="font-[var(--font-mono)] text-[0.64rem] font-medium uppercase tracking-[0.15em] text-[#55ca92]">{group.heading}</h2>
              <ul className="mt-5 grid gap-3">
                {group.links.map((link) => <li key={link.href}><Link href={link.href} className="group inline-flex items-center gap-2 text-sm text-white/58 transition-colors hover:text-white"><span className="h-px w-0 bg-[#55ca92] transition-all group-hover:w-3" />{link.label}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-xl flex flex-col gap-3 py-5 text-[0.66rem] text-white/60 sm:flex-row sm:items-center sm:justify-between"><p className="font-[var(--font-mono)] tracking-[0.06em]">© {new Date().getFullYear()} TEC INDUSTRIES · GSTIN: 24ACBFM4650R1ZU</p><div className="flex gap-5"><Link href="/privacy" className="transition-colors hover:text-white">Privacy</Link><Link href="/terms" className="transition-colors hover:text-white">Terms</Link><Link href="/sitemap.xml" className="transition-colors hover:text-white">Sitemap</Link></div></div>
      </div>
    </footer>
  );
}
