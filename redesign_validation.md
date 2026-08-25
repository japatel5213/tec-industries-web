# Bold Industrial Redesign Validation

## Responsive capture findings

| Route and viewport | Finding | Status |
| --- | --- | --- |
| Homepage, 390 × 844 | Header and primary CTAs are visible, but the hero word “Commitment” exceeds the right edge at the existing minimum headline size. | Requires correction. |
| PPR catalogue, 768 × 1024 | Tablet header, headline, CTA row, three-part supporting index, and lower-right WhatsApp action render without observed clipping. | Pass. |

## Follow-up

Reduce the homepage mobile-only headline floor while retaining the desktop display scale, then recapture the 390 px homepage. The global WhatsApp action remains intentionally suppressed on `/contact` and has not been found above RFQ controls in the desktop production check.

## Corrected mobile capture findings

| Route and viewport | Finding | Status |
| --- | --- | --- |
| Homepage, 390 × 844 after correction | Full “Built on Trust. Driven by Commitment.” headline, supporting copy, primary and secondary CTAs, and system cues fit inside the viewport. | Pass. |
| RFQ contact, 390 × 844 | Header, enquiry headline, answer-first description, and required-input guidance fit cleanly. The global WhatsApp action is absent from this route, so it cannot overlap RFQ controls. | Pass. |

| Route and viewport | Finding | Status |
| --- | --- | --- |
| RFQ contact, 1024 × 900 | Header, two-column enquiry framing, RFQ panel, and direct-contact panel align without observed collision or overflow. | Pass. |
| Homepage, 1440 × 900 | Full desktop navigation, bold editorial headline, generated green-and-blue PPR production visual, dual CTA hierarchy, and floating action render cleanly. | Pass. |
