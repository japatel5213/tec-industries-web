# Targeted Improvement Checklist

- [ ] Preserve the current Next.js page architecture, navigation, typography family, color system, and familiar homepage composition.
- [ ] Correct canonical and metadata inheritance on resources, privacy, and terms pages.
- [ ] Ensure indexable article routes are included in the XML sitemap and have distinct metadata.
- [ ] Improve structured data with page-appropriate Organization, Product, Article, and BreadcrumbList markup where source facts support it.
- [ ] Replace unsupported universal technical, cost, and outcome statements with qualified technical language or a document-request path.
- [ ] Improve the existing RFQ form with semantic role controls, native required fields, project inputs, accessible validation, and a clear status handoff.
- [ ] Reduce first-load work by deferring non-critical third-party scripts and maintaining the existing interface.
- [ ] Refresh existing visual assets in the current dark industrial style without changing the established page layout.
- [ ] Test the original website source, check build output, and document the exact changes.

## Production Build Repair

- [x] Capture the complete `_global-error` production-build trace with framework diagnostics enabled.
- [x] Compare the root layout and error-boundary integrations against the installed Next 16 runtime requirements.
- [x] Test the smallest isolated root-layout variant to identify the component or script integration that triggers the prerender fault.
- [x] Apply and validate the minimal compatible repair with `next build`.
- [x] Document the root cause, evidence, and required deployment steps.

## Performance and SEO Implementation

- [x] Audit the current analytics, advertising, chat, hero, metadata, and article-route code paths before changing them.
- [x] Defer non-essential chat and marketing integrations until consent or user intent without removing required lead handling.
- [x] Reduce the homepage LCP asset and script dependency path while preserving the existing hero presentation.
- [x] Remove repeated brand suffixes from route-level metadata and make public articles cacheable.
- [x] Add a lightweight, privacy-conscious RFQ measurement event where the current analytics configuration supports it.
- [x] Confirm the production build and remeasure representative mobile Lighthouse routes.

## Weekly Monitoring Automation

- [ ] Confirm available scheduling, Search Console, analytics, and notification integrations.
- [ ] Define monitored routes, baseline metrics, alert thresholds, and weekly summary fields.
- [ ] Configure an automated weekly task for live performance and technical SEO checks.
- [ ] Document Search Console/GA4 connection and GTM conversion setup requirements.

## Review Before Monitoring

- [ ] Show and verify the current public website preview before resuming monitoring configuration.

## PPR Catalog Upgrade

- [x] Review current catalog pages, product data, navigation, and approved PPR product claims.
- [x] Define the PPR pipe and fitting-family catalog structure without inventing unapproved SKU specifications.
- [x] Generate catalog-specific hero, system, and fitting-family visuals in the established TEC industrial style.
- [x] Build the PPR catalog route with filtering, technical-request paths, and relevant internal navigation.
- [x] Verify responsive catalog behavior, crawl controls, and production build before deployment.

## Mobile Responsiveness Validation

- [x] Open the live homepage, PPR catalogue, and contact route at a mobile viewport.
- [x] Check mobile navigation, hero legibility, card stacking, filter controls, and fixed contact actions.
- [x] Verify the RFQ form remains readable and usable without horizontal overflow.
- [x] Record the responsive findings and apply only necessary corrections.

## Bold Industrial Redesign and AEO

- [x] Establish the shared dark industrial design system: responsive gutters, header height, sections, buttons, cards, forms, focus treatment, and motion tokens.
- [x] Generate and place a purpose-built visual suite, including verified green and blue triple-layer PPR pipe cues.
- [x] Rebuild the shared navigation, footer, and homepage with the approved asymmetric international industrial composition.
- [x] Apply the redesign system to product, PPR catalogue, resources, industries, quality, and RFQ/contact routes without changing verified product facts or conversion handling.
- [x] Add answer-first page modules, semantic heading structures, contextual internal links, and visible-content-backed structured data for AEO.
- [x] Verify 390 px, 768 px, 1024 px, and 1440 px route behavior, reduced-motion support, accessibility, build output, AEO metadata, and performance safeguards.
- [ ] Commit, push, and confirm the production release from the existing repository.
