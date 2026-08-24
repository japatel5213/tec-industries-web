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
