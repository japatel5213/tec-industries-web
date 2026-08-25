'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

// Routes where the public site chrome (Header/Footer/WhatsApp float) should NOT render.
const DASHBOARD_ROUTES = ['/dashboard'];

export default function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = DASHBOARD_ROUTES.some((r) => pathname?.startsWith(r));
  const isContactRoute = pathname?.startsWith('/contact');

  if (isDashboard) {
    // Dashboard is full-screen fixed; no chrome, no padding
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main style={{ paddingTop: 'var(--header-height)' }}>{children}</main>
      <Footer />
      {!isContactRoute && <WhatsAppFloat />}
    </>
  );
}
