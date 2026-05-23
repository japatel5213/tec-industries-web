import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';

// Top 10 industrial cities in India
const CITIES = [
  'mumbai', 'pune', 'ahmedabad', 'surat', 'delhi', 
  'chennai', 'bangalore', 'hyderabad', 'kolkata', 'indore'
];

export function generateStaticParams() {
  return CITIES.map((city) => ({
    city: city,
  }));
}

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const city = params.city.toLowerCase();
  if (!CITIES.includes(city)) return { title: 'Not Found' };
  
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);
  return {
    title: `PPR & HDPE Pipe Manufacturer in ${cityName}`,
    description: `TEC INDUSTRIES supplies industrial-grade PPR pipes, HDPE fittings, and cooling towers directly to plants and contractors in ${cityName}.`,
  };
}

export default async function CityLandingPage(props: Props) {
  const params = await props.params;
  const city = params.city.toLowerCase();
  
  if (!CITIES.includes(city)) {
    notFound();
  }

  const cityName = city.charAt(0).toUpperCase() + city.slice(1);

  return (
    <main className="bg-white min-h-screen">
      {/* City Hero */}
      <section className="relative pt-24 pb-32 bg-gradient-to-br from-[#141C28] to-[#2B3E50] overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#3DAA7A 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container-xl relative z-10 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 font-[family-name:var(--font-head)] text-sm tracking-wide text-[#3DAA7A]">
            <MapPin size={16} /> Serving {cityName} & Surrounding Areas
          </div>
          <h1 className="font-[family-name:var(--font-head)] text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Industrial Piping Solutions <br className="hidden md:block" /> for <span className="text-[#3DAA7A]">{cityName}</span>
          </h1>
          <p className="font-[family-name:var(--font-body)] text-lg text-white/80 max-w-2xl mx-auto mb-10">
            TEC INDUSTRIES supplies premium PPR pipes, HDPE systems, industrial valves, and cooling towers directly from our Gujarat manufacturing plant to contractors and plant managers in {cityName}.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Request a Quote for {cityName}
            </Link>
            <Link href="/products" className="btn-ghost text-white border-white/30 hover:bg-white/10">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[#F5F5F0]">
        <div className="container-xl">
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-head)] text-3xl md:text-4xl font-bold text-[#2B3E50] mb-4">
              Why {cityName} Industries Choose TEC
            </h2>
            <div className="w-16 h-1 bg-[#3DAA7A] mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e2e8f0]">
              <div className="w-12 h-12 bg-[#e6f4ef] text-[#3DAA7A] rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="font-[family-name:var(--font-head)] text-xl font-bold text-[#2B3E50] mb-3">Direct Delivery to {cityName}</h3>
              <p className="font-[family-name:var(--font-body)] text-[#6B7B8D] leading-relaxed">
                We handle the logistics. Get factory-direct pricing and reliable freight shipping directly to your project site or warehouse in {cityName}.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e2e8f0]">
              <div className="w-12 h-12 bg-[#e6f4ef] text-[#3DAA7A] rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="font-[family-name:var(--font-head)] text-xl font-bold text-[#2B3E50] mb-3">Industrial-Grade Quality</h3>
              <p className="font-[family-name:var(--font-body)] text-[#6B7B8D] leading-relaxed">
                Our PPR and HDPE pipes are manufactured to withstand the extreme temperatures and pressures demanded by modern industrial plants.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e2e8f0]">
              <div className="w-12 h-12 bg-[#e6f4ef] text-[#3DAA7A] rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="font-[family-name:var(--font-head)] text-xl font-bold text-[#2B3E50] mb-3">Complete Bundling</h3>
              <p className="font-[family-name:var(--font-body)] text-[#6B7B8D] leading-relaxed">
                Source your entire requirement from one vendor. We provide the pipes, fittings, valves, supports, and fusion machines all in one shipment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#141C28] text-white text-center">
        <div className="container-xl max-w-3xl">
          <h2 className="font-[family-name:var(--font-head)] text-3xl font-bold mb-6">
            Starting a new project in {cityName}?
          </h2>
          <p className="font-[family-name:var(--font-body)] text-white/70 mb-8">
            Connect with our sales engineering team for technical specifications, bulk pricing, and lead times.
          </p>
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
            Contact Sales <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
