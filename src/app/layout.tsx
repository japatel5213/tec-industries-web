import type { Metadata } from "next";
import { Poppins, Open_Sans, JetBrains_Mono } from "next/font/google";
import { GoogleTagManager } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-opensans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tecindustries.in'),
  title: {
    default: "TEC INDUSTRIES — PPR Pipes, HDPE Fittings, Vapi Gujarat",
    template: "%s — TEC INDUSTRIES",
  },
  description:
    "TEC INDUSTRIES manufactures premium PPR Pipe & Fittings, HDPE Pipe & Fittings, Electrofusion Fittings, Industrial Valves and Pipe Support Systems in Vapi, Gujarat, India.",
  keywords: [
    "PPR pipe", "HDPE fittings", "electrofusion fittings", "industrial valves",
    "pipe support system", "PPR fusion machine", "Vapi", "Gujarat", "India", "industrial manufacturer",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.tecindustries.in",
    siteName: "TEC INDUSTRIES",
    images: [{ url: "/assets/tec-logo.png", width: 1200, height: 630 }],
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TEC INDUSTRIES",
  url: "https://www.tecindustries.in",
  logo: "https://www.tecindustries.in/assets/tec-logo.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "A-12, GIDC Industrial Estate",
    addressLocality: "Vapi",
    addressRegion: "Gujarat",
    postalCode: "396195",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-94260-31064",
    contactType: "sales",
    availableLanguage: ["English", "Hindi", "Gujarati"],
  },
  sameAs: ["https://wa.me/919426031064"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${openSans.variable} ${jetbrainsMono.variable}`}>
      <GoogleTagManager gtmId="GTM-TSM3TF6B" />
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>
        <Header />
        <main className="pt-[72px]">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <SpeedInsights />
      </body>
    </html>
  );
}
