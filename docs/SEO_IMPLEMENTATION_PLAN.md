# SEO Implementation Plan

## Goals
- Improve technical SEO hygiene (metadata, sitemap/robots, structured data)
- Strengthen on-page SEO and information architecture
- Enhance performance signals affecting Core Web Vitals
- Prepare the site for scalable content and rich results

## Scope
Applies to the Next.js App Router site in `src/app/*` and components in `src/components/*` plus public assets.

---

## Priority 0 – Baseline fixes (week 1)

1) Align metadata titles across all surfaces
- What: Make `title.default`, Open Graph title, and Twitter title consistent (choose “Company” or “Agency”).
- Owner: Eng
- Effort: XS
- Acceptance: Page source and Open Graph debugger show consistent titles.

2) Add OG/Twitter images and validate
- What: Create `public/mindbit-og-image.png` (1200x630) and reuse for Twitter; update paths if needed.
- Owner: Design + Eng
- Effort: S
- Acceptance: Facebook Sharing Debugger and Twitter Card Validator render images.

3) Fix sitemap (remove fragment URLs)
- What: Replace `/#section` entries with real routes only; for now keep only `/` until routes exist.
- Owner: Eng
- Effort: XS
- Acceptance: `sitemap.xml` validates; no fragment URLs.

4) Consolidate robots to single source of truth
- What: Keep `src/app/robots.ts` and remove conflicting `public/robots.txt` (or vice versa based on deployment).
- Owner: Eng
- Effort: XS
- Acceptance: Only one robots definition served in production.

5) Resolve duplicate IDs and broken anchors
- What: Ensure unique IDs: keep `id="contact"` in CTA, remove/rename in `Footer`; remove `#team` links or re-enable Team section.
- Owner: Eng
- Effort: S
- Acceptance: No duplicate IDs; all internal links scroll to existing targets.

6) Verify icons exist and references are correct
- What: Ensure favicon and touch icons referenced in `layout.tsx` exist in `public/icons/` or update references.
- Owner: Eng
- Effort: XS
- Acceptance: No 404s on icons; Lighthouse PWA checks pass for icons.

7) Replace verification placeholders and set up GSC
- What: Add real verification tokens or remove placeholders; verify domain in Google Search Console; submit sitemap.
- Owner: SEO/Eng
- Effort: S
- Acceptance: Domain verified; sitemap indexed.

---

## Priority 1 – Structured data correctness (week 1–2)

8) Fix Organization schema property names
- What: Replace non-standard `service` array with `serviceOffered` (or `makesOffer`/`hasOfferCatalog`).
- Owner: Eng
- Effort: S
- Acceptance: Google Rich Results Test shows valid Organization schema.

9) Add WebSite schema (+ potentialAction)
- What: Add `WebSite` with `potentialAction` for site search (if you expose search), or minimal `WebSite` otherwise.
- Owner: Eng
- Effort: XS
- Acceptance: Valid `WebSite` schema appears in structured data testing tools.

10) Plan BreadcrumbList (blocker: routes)
- What: Once separate routes exist for services/portfolio, add `BreadcrumbList` on those pages.
- Owner: Eng
- Effort: S (later)
- Acceptance: Breadcrumb schema validates on non-home routes.

---

## Priority 2 – Information architecture and content (week 2–3)

11) Create dedicated pages and link structure
- What: Add routes: `/services`, `/portfolio`, `/about`, `/contact`; optionally nested `/services/ai-integration`, etc.
- Owner: Eng
- Effort: M
- Acceptance: Pages exist, are indexable, and linked in Header/Footer; sitemap lists them.

12) Expand topic depth and FAQs
- What: Add descriptive, entity-rich copy, include FAQs per service; consider FAQPage schema.
- Owner: Content + SEO
- Effort: M
- Acceptance: Each service page exceeds 600–800 words of high-quality content; FAQs validated if schema added.

13) Case studies/testimonials (E-E-A-T)
- What: Add case studies with outcomes/metrics, testimonials, and team bios with credentials.
- Owner: Content + Design
- Effort: M
- Acceptance: At least 2 case studies; testimonials attributed; team bios expanded.

---

## Priority 3 – Performance polish (week 3)

14) Remove obsolete meta and redundant preconnects
- What: Remove `revisit-after`, `distribution`, `rating`; drop Google Fonts preconnects if using `next/font` only.
- Owner: Eng
- Effort: XS
- Acceptance: Clean head; Lighthouse SEO/Performance unaffected or improved.

15) Image responsiveness hints
- What: For `next/image` with `fill`, add appropriate `sizes`; audit LCP images priority if needed.
- Owner: Eng
- Effort: S
- Acceptance: PageSpeed Insights shows no obvious image sizing warnings; LCP stable.

---

## Priority 4 – Local SEO (optional, if applicable)

16) NAP and LocalBusiness schema
- What: Add business address/phone on site and `LocalBusiness` schema; create/optimize Google Business Profile.
- Owner: SEO/Eng
- Effort: S
- Acceptance: LocalBusiness validates; GBP live with correct NAP; consistent across site.

---

## Monitoring & QA
- Add Lighthouse SEO/Performance checks to pre-release QA.
- Validate structured data via Google Rich Results Test post-deploy.
- Track Search Console coverage, CWV, and enhancements after rollout.

## Rollout plan
- Ship Priority 0 as one PR.
- Ship Priority 1 as a follow-up PR.
- Create routes/content (Priority 2) in iterative PRs per page.
- Performance and Local SEO in separate PRs.

## Risks & mitigations
- Fragment URLs in sitemap: mitigated by removing anchors until routes exist.
- Social preview regressions: validate with OG/Twitter tools before merging.
- Content bottlenecks: schedule copywriting/design alongside dev tasks.
