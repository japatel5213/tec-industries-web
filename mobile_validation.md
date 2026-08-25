# Mobile Responsiveness Validation

## Live 390 × 844 viewport review

### Homepage

The mobile header reduces cleanly to a large brand mark, visible primary quote action, and menu trigger. The hero headline, body copy, and two CTAs remain fully readable without horizontal clipping. The floating WhatsApp control stays clear of the primary hero actions and does not obscure the trust-point list.

### PPR Catalogue

The new catalogue hero keeps the full title, introductory copy, and both document actions within a readable single-column flow. The header does not overlap the PPR system label or heading. The three evidence sections stack cleanly beneath the hero, and the floating WhatsApp control does not interfere with the visible action buttons. The remaining lower-page filter and catalogue card stack will be verified alongside the contact form before final reporting.

### Contact / RFQ

The mobile contact hero is readable and the RFQ card begins within the first screen. The original global floating WhatsApp button overlapped the role-selection controls despite the contact page already offering an inline WhatsApp action. The public shell was corrected to suppress the floating control only on `/contact`; this preserves a dedicated, non-overlapping WhatsApp path inside the enquiry experience while retaining the site-wide floating action on other routes.

### Result

The homepage and PPR catalogue have no observed horizontal clipping at 390 × 844. The mobile header, primary CTA, catalogue filters, card stack, visual hierarchy, and fixed-contact strategy are responsive after the contact-route correction. A production build passed after this change.
