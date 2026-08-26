import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/ProductPageTemplate';

/* TEC PPR PRODUCT PAGE — only confirmed product facts are published here. */

export const metadata: Metadata = {
  title: 'PPR Pipe & Fittings — Green & Blue Triple-Layer Systems',
  description: 'Explore TEC INDUSTRIES green and blue triple-layer PPR pipe systems and fitting families for industrial piping project conversations. Request current technical documents for applicable product details.',
  alternates: { canonical: '/products/ppr' },
};

export default function PPRPage() {
  return <ProductPageTemplate
    badge="Primary product system"
    name="PPR Pipe & Fittings"
    tagline="Green + blue triple-layer PPR system"
    description="TEC INDUSTRIES supplies green and blue triple-layer PPR pipe systems with coordinated fitting families for industrial project conversations. Begin with your application, line size, operating requirement and quantity; TEC first reviews whether PPR fits the duty, then can discuss PPH, PP-RCT or PPCH alternatives where the requirement calls for them."
    image="https://files.manuscdn.com/user_upload_by_module/session_file/310519663160765145/QbOvddWIZIVIuIGv.jpg"
    gallery={[
      { src: '/manus-storage/tec-industries-ppr-pipe-green-blue_2aec4472.jpg', alt: 'Green and blue triple-layer PPR pipe lengths in an industrial setting', label: 'Green + blue PPR pipe system' },
      { src: '/manus-storage/tec-industries-ppr-fittings-elbows-tees_fedf0d44.jpg', alt: 'PPR elbows, tees, reducers, couplings and unions arranged for project review', label: 'Elbows + tees + joining families' },
      { src: '/manus-storage/tec-industries-ppr-fittings-transition-flange_32fab6a0.jpg', alt: 'PPR transition fittings, flanges, unions and valve components', label: 'Transitions + interfaces' },
    ]}
    specs={[
      { label: 'Pipe-system colours', value: 'Green and blue' },
      { label: 'Pipe construction', value: 'Triple-layer PPR' },
      { label: 'Nominal outside diameter range', value: '20 mm–630 mm' },
      { label: 'Available nominal pressure classes', value: 'PN06, PN10 and PN16' },
      { label: 'Pressure-class note', value: 'Confirm the final rating against temperature, size, wall thickness and current manufacturer documentation' },
      { label: 'System scope', value: 'Pipes and fitting families' },
      { label: 'Detailed technical data', value: 'Issued against a project requirement' },
      { label: 'Applicable documents', value: 'Request current technical literature from TEC' },
    ]}
    features={[
      'Green and blue triple-layer PPR pipe-system options',
      '20 mm–630 mm nominal outside-diameter range with PN06, PN10 and PN16 classes',
      'Coordinated fitting-family discussion for project routing',
      'Requirement-led material review: PPR where appropriate, with PPH, PP-RCT and PPCH alternatives available for discussion',
      'Project-specific request route for current technical documents',
      'Fusion-machinery and installation conversation available where relevant',
      'Procurement, contractor, consultant and plant-team enquiry support',
    ]}
    applications={[
      { name: 'Industrial Utility Lines', desc: 'Start the discussion with the service, line size and operating context for a utility-piping review.' },
      { name: 'Process Piping Context', desc: 'Share the operating medium and project requirement so TEC can route a suitable product and document discussion.' },
      { name: 'Water Treatment Projects', desc: 'Prepare an enquiry with application, route, nominal size, project quantity and installation context.' },
      { name: 'Plant Maintenance', desc: 'Use the fitting-family catalogue to identify the system conversation before requesting current documents.' },
      { name: 'MEP & Contracting', desc: 'Coordinate pipe and fitting families against the project BOQ, programme and site requirements.' },
      { name: 'Project Procurement', desc: 'Request current technical literature and commercial support against your actual project scope.' },
    ]}
    relatedProducts={[
      { name: 'HDPE Pipe & Fittings', href: '/products/hdpe' },
      { name: 'Electrofusion Fittings', href: '/products/electrofusion' },
      { name: 'Industrial Valves', href: '/products/valves' },
      { name: 'PPR Fusion Machine', href: '/products/fusion-machine' },
    ]}
  />;
}
