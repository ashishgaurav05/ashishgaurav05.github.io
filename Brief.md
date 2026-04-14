# brief.md

## Project
Personal website for Ashish Gaurav — finance-background MSc student in Germany, targeting Werkstudent roles in venture capital at Munich and Berlin funds, with London as the medium-term horizon.

## Audience
The primary reader is a VC associate, principal, or partner at a European fund, opening the link from a CV, LinkedIn message, or cold outreach. They will spend 60–90 seconds on the page before deciding whether to read further or close the tab. The site needs to land its core message inside that window.

The secondary reader is a recruiter or HR partner at a corporate venture capital arm or growth equity fund, scanning for fit before forwarding to an investment team.

## Positioning
**Finance-first, with a founder dimension.** The reader should walk away with a clear single impression: *"Finance analyst with four years inside Lufthansa and Amex GBT, now studying M&A and valuations, and building a startup on the side."* Not "aspiring VC." Not "founder turned investor." Finance is the spine; the side project adds range.

The site must avoid any framing that reads as roleplay (no "my pipeline," no "my fund," no buy/watch/pass deal sheets formatted as if Ashish runs an investment vehicle). Every claim should be a fact a reader could poke at, not an aspirational identity.

## Tone
Understated, factual, no slogans, no taglines. Closer to a personal portfolio of a working analyst than a pitch deck. Quiet confidence over performed enthusiasm. Plain sentences over clever ones.

## Section structure
Seven sections, in this order:

1. About me
2. About Let's Go *(side project)*
3. Work experience *(absorbs presentations, knowledge management, and relationship building as embedded capabilities, not standalone sections)*
4. Sourcing
5. Due diligence
6. Valuation & financial analysis
7. Market & industry research

Sections 4–7 are capability sections that demonstrate VC-relevant skills through real artifacts (Startup Scout for sourcing, investment memos for due diligence, the TeamViewer DCF for valuation, etc.). Each should link to the actual proof rather than just describing it.

Group sections 4–7 under a single parent heading like "Capabilities" so the top-level navigation reads cleaner: About · Let's Go · Work · Capabilities.

## Hard constraints
- **Single page**, scrollable, with anchor navigation. No multi-page architecture.
- **Stack: Astro.** Content lives in markdown files separate from layout, so future edits and additions (new memos, new valuations) are drop-in. No Next.js, no React framework.
- **Deployment:** GitHub Pages, on a clean URL (`ashishgaurav05.github.io` or a custom domain). Do not reuse the existing `MypageVC` repo — the "VC" in the URL contradicts the finance-first positioning.
- **Mobile-first responsive.** A meaningful share of readers will open the link on a phone.
- **No interactive widgets, no animation libraries, no Three.js.** A clean, fast-loading static site does the job.
- **Startup Scout is hosted separately** and linked from the Sourcing section. Do not embed it.

## Content
All section content lives in `site-content.md` (separate file). Do not invent or rewrite content — pull from that file directly. If sections in the content file are marked as PLACEHOLDER, render them as "Coming soon" rather than generating filler.

## Design references

Restraint over flash. Audience is VC partners — over-designed sites hurt credibility.

**Look at:** patrickcollison.com, stratechery.com, paulgraham.com, sive.rs

**Style:**
- Light mode only
- Body: Source Serif Pro or Newsreader
- Headings: Inter
- Background: #FAFAFA
- Text: #1A1A1A
- Accent: #1E40AF (deep blue), used sparingly
- Single column, max-width 720px
- Section spacing: 96px+
- No cards, no shadows, no gradients, no border-radius on content

**Allowed animation:**
- 300ms page-load fade-in (ease-out, once)
- Smooth scroll on anchor links
- 200ms hover colour transition on links

**No:** scroll-triggered animations, parallax, hero images, avatars, skill bars, dark mode toggle, display fonts, gradients, glassmorphism

**Navigation:** sticky top nav — About · Let's Go · Work · Capabilities

If no references provided yet, default to: serif typography for body (Source Serif, Cormorant Garamond, or system serif), sans-serif for headings, generous whitespace, single accent colour, no gradients, no shadows, no card-style boxes around content.

## Deliverable sequencing
Build in this order, pausing for review between each step:

1. Scaffold structure (Astro project setup, navigation, layout shell)
2. About me + Work experience sections
3. About Let's Go section
4. Capability sections (Sourcing, Due diligence, Valuation, Market research) — render placeholders as "Coming soon"
5. Styling and typography pass
6. Mobile responsive
7. Deployment to GitHub Pages

Do not produce a full site in one go. Incremental builds with review at each step.

## What success looks like
A reader lands on the page, scrolls once, and forms the impression: *"This is a serious finance person with real work behind them, who's also genuinely curious about how companies get built. Worth a 15-minute call."* If the reader closes the tab thinking "another aspiring VC portfolio site," the brief has failed.