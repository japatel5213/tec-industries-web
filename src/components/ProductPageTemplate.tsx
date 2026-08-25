import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, FileText } from 'lucide-react';

/* TEC PRODUCT TEMPLATE — Bold Industrial / International-grade. */

type Spec = { label: string; value: string };
type Application = { name: string; desc: string };

type ProductPageProps = {
  badge?: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  specs: Spec[];
  features: string[];
  applications: Application[];
  relatedProducts?: { name: string; href: string }[];
};

export default function ProductPageTemplate({ badge, name, tagline, description, image, specs, features, applications, relatedProducts }: ProductPageProps) {
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: `https://www.tecindustries.in${image}`,
    brand: { '@type': 'Brand', name: 'TEC INDUSTRIES' },
    manufacturer: { '@type': 'Organization', name: 'TEC INDUSTRIES', url: 'https://www.tecindustries.in' },
  };

  return (
    <div className="bg-[#f3f5f2]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <section className="relative overflow-hidden bg-[#090f14] text-white">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(85,202,146,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(85,202,146,0.1)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="container-xl relative z-10 grid gap-10 py-[clamp(5rem,10vw,10rem)] lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            {badge && <span className="inline-flex border border-[#55ca92]/40 px-3 py-2 font-[var(--font-mono)] text-[0.6rem] font-medium uppercase tracking-[0.12em] text-[#55ca92]">{badge}</span>}
            <p className="section-eyebrow mt-5 text-[#55ca92]">{tagline}</p>
            <h1 className="mt-5 max-w-[10ch] font-[var(--font-display)] text-[clamp(4rem,7.6vw,8rem)] font-extrabold uppercase leading-[0.79] tracking-[-0.055em]">{name}</h1>
            <p className="mt-7 max-w-xl text-[1rem] leading-7 text-white/67">{description}</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href={`/contact?product=${encodeURIComponent(name)}`} className="btn-primary">Request documents <FileText size={15} /></Link><a href="https://wa.me/919426031064" target="_blank" rel="noopener noreferrer" className="btn-secondary">WhatsApp TEC <ArrowUpRight size={15} /></a></div>
          </div>
          <div className="relative border border-white/15 bg-[#14202a] p-3 shadow-[0_30px_70px_rgba(0,0,0,0.34)]"><div className="relative aspect-[4/3] overflow-hidden"><Image src={image} alt={name} fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" /><div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(9,15,20,0.65),transparent_55%)]" /></div><div className="absolute -bottom-3 left-7 border border-[#55ca92]/35 bg-[#173c36] px-5 py-3"><p className="font-[var(--font-mono)] text-[0.57rem] uppercase tracking-[0.12em] text-[#55ca92]">TEC product system</p><p className="mt-1 text-sm text-white/78">Project-led information request</p></div></div>
        </div>
      </section>

      <section className="section-space bg-white"><div className="container-xl grid gap-12 lg:grid-cols-[1.1fr_0.9fr]"><div><p className="section-eyebrow">Technical data</p><h2 className="section-heading">Specifications</h2><p className="mt-5 max-w-xl text-[0.97rem] leading-7 text-[#607384]">What information is available for {name}? The verified product details currently listed by TEC are shown below. Request current project-specific documents where your requirement needs a complete size or application review.</p><div className="mt-8 overflow-hidden border border-[#c7d1d6]"><table className="w-full border-collapse text-left"><thead className="bg-[#0f171f]"><tr><th className="px-5 py-4 font-[var(--font-mono)] text-[0.63rem] font-medium uppercase tracking-[0.12em] text-white/60">Parameter</th><th className="px-5 py-4 font-[var(--font-mono)] text-[0.63rem] font-medium uppercase tracking-[0.12em] text-white/60">Listed value</th></tr></thead><tbody>{specs.map((spec, index) => <tr key={spec.label} className={index % 2 === 0 ? 'bg-[#f3f5f2]' : 'bg-white'}><td className="border-t border-[#dde4e5] px-5 py-4 text-sm font-bold text-[#273a49]">{spec.label}</td><td className="border-t border-[#dde4e5] px-5 py-4 font-[var(--font-mono)] text-[0.76rem] text-[#1f9a63]">{spec.value}</td></tr>)}</tbody></table></div></div>
        <aside className="bg-[#f3f5f2] p-[clamp(1.5rem,4vw,3rem)]"><p className="section-eyebrow">System considerations</p><h2 className="font-[var(--font-display)] text-[clamp(2.5rem,4vw,4.25rem)] font-extrabold uppercase leading-[0.83] tracking-[-0.035em] text-[#1a2834]">For the right project discussion.</h2><ul className="mt-7 grid gap-px border border-[#c7d1d6] bg-[#c7d1d6]">{features.map((feature, index) => <li key={feature} className="flex gap-3 bg-white p-5"><span className="font-[var(--font-mono)] text-[0.62rem] text-[#2fae78]">0{index + 1}</span><span className="text-sm leading-6 text-[#273a49]">{feature}</span></li>)}</ul></aside></div></section>

      <section className="bg-[#f3f5f2] py-[clamp(4rem,8vw,8rem)]"><div className="container-xl"><div className="max-w-2xl"><p className="section-eyebrow">Application context</p><h2 className="section-heading">Where this system is considered</h2></div><div className="mt-10 grid gap-px border border-[#c7d1d6] bg-[#c7d1d6] sm:grid-cols-2 lg:grid-cols-3">{applications.map((application, index) => <div key={application.name} className="min-h-[15rem] bg-white p-7"><span className="font-[var(--font-mono)] text-[0.62rem] text-[#2fae78]">0{index + 1}</span><h3 className="mt-12 font-[var(--font-display)] text-[2rem] font-bold uppercase leading-[0.88] text-[#1a2834]">{application.name}</h3><p className="mt-4 text-sm leading-6 text-[#607384]">{application.desc}</p></div>)}</div></div></section>

      <section className="bg-[#0f171f] py-[clamp(4rem,7vw,7rem)] text-white"><div className="container-xl grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="section-eyebrow text-[#55ca92]">Technical request</p><h2 className="max-w-[13ch] font-[var(--font-display)] text-[clamp(3rem,5vw,5.5rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.045em]">Need a discussion around {name}?</h2><p className="mt-6 max-w-xl text-[0.98rem] leading-7 text-white/66">Share the application, nominal size, operating requirement, project quantity and location. TEC can route the request to the relevant product, document and quotation conversation.</p></div><div className="flex flex-wrap gap-3"><Link href={`/contact?product=${encodeURIComponent(name)}`} className="btn-primary">Send enquiry <ArrowUpRight size={16} /></Link><Link href="/resources" className="btn-secondary">View technical resources</Link></div></div>
        {relatedProducts?.length ? <div className="container-xl mt-10 border-t border-white/10 pt-6"><p className="font-[var(--font-mono)] text-[0.62rem] uppercase tracking-[0.12em] text-white/42">Related product systems</p><div className="mt-4 flex flex-wrap gap-2">{relatedProducts.map((product) => <Link key={product.href} href={product.href} className="border border-white/16 px-3 py-2 text-xs text-white/68 transition-colors hover:border-[#55ca92] hover:text-[#55ca92]">{product.name}</Link>)}</div></div> : null}
      </section>
    </div>
  );
}
