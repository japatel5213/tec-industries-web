import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact TEC INDUSTRIES — PPR, HDPE & Industrial Piping Inquiry | Vapi, Gujarat',
  description: 'Get in touch with TEC INDUSTRIES for PPR Pipe, HDPE Fittings, Electrofusion, Industrial Valves and Pipe Support Systems. Call +91 94260 31064, visit our Vapi plant, or send a project inquiry.',
  alternates: { canonical: '/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
