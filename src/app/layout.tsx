import type { Metadata } from "next";
import { Poppins, Open_Sans, JetBrains_Mono } from "next/font/google";
import { GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';
import "./globals.css";
import PublicShell from "@/components/PublicShell";

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
  alternates: {
    canonical: '/',
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
    streetAddress: "Plot No. 700/1, 40 Shade Area, GIDC",
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
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-18182442132"
        />
        <Script
          id="google-ads-tag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18182442132');
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1012544071457752');
              fbq('track', 'PageView');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {/* Zoho SalesIQ (Visitor Tracking & Live Chat Widget) */}
        <Script
          id="zsiqchat"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var $zoho=$zoho || {};$zoho.salesiq = $zoho.salesiq || {widgetcode:"siq5b743a62df5f9d02804076778bf32e4a3170b38a8284acbbaa065758249dd597", values:{},ready:function(){}};
              var d=document;s=d.createElement("script");s.type="text/javascript";s.id="zsiqscript";s.defer=true;s.src="https://salesiq.zoho.in/widget";t=d.getElementsByTagName("script")[0];t.parentNode.insertBefore(s,t);
            `
          }}
        />
        {/* Crisp Live Chat (P2-05) */}
        {/*
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.$crisp=[];window.CRISP_WEBSITE_ID="YOUR_CRISP_WEBSITE_ID";
              (function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";
              s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
            `,
          }}
        />
        */}
      </head>
      <body>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1012544071457752&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
