'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const engageEvents: Array<keyof WindowEventMap> = ['pointerdown', 'keydown', 'touchstart', 'scroll'];

/**
 * Preserves the existing Google Ads, Meta Pixel, and SalesIQ integrations while
 * avoiding their startup work until a visitor demonstrates browsing intent.
 */
export default function DeferredEngagementIntegrations() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const enable = () => setEnabled(true);
    engageEvents.forEach((eventName) => window.addEventListener(eventName, enable, { once: true, passive: true }));
    const fallback = window.setTimeout(enable, 12_000);
    return () => {
      engageEvents.forEach((eventName) => window.removeEventListener(eventName, enable));
      window.clearTimeout(fallback);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=AW-18182442132" />
      <Script
        id="google-ads-tag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-18182442132');`,
        }}
      />
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '1012544071457752');fbq('track', 'PageView');`,
        }}
      />
      <Script
        id="zsiqchat"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `var $zoho=$zoho || {};$zoho.salesiq = $zoho.salesiq || {widgetcode:"siq5b743a62df5f9d02804076778bf32e4a3170b38a8284acbbaa065758249dd597", values:{},ready:function(){}};var d=document;s=d.createElement("script");s.type="text/javascript";s.id="zsiqscript";s.defer=true;s.src="https://salesiq.zoho.in/widget";t=d.getElementsByTagName("script")[0];t.parentNode.insertBefore(s,t);`,
        }}
      />
    </>
  );
}
