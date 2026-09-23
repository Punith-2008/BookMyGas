# MASTER PROMPT: BookMyGas (Indane LPG Refill Booking) Landing Page + Live Demo

> Copy everything below this line into your AI coding assistant.

---

## ROLE

You are a senior front-end engineer and product designer. Build a **production-quality, business-pitch website** for **BookMyGas**, a refill-booking app for **Indian Oil (Indane) LPG** consumers and distributors. The site has two pages:

1. **Landing page (`/`)** tells the business story to investors, Indane distributors, and partners.
2. **Demo page (`/demo`)** is a clickable, fully mocked Indane refill-booking flow that finishes in under 60 seconds.

**Every call-to-action on the landing page must lead to `/demo`.** This is the most important requirement.

Build everything completely. Do not leave TODOs, lorem ipsum, or unfinished sections.

---

## HARD RULES (do not break these)

1. **Indian Oil (Indane) only.** There is no provider picker. Never mention HP Gas, Bharatgas, or any other oil company.
2. **No login.** No phone number entry, no OTP screen, no sign-up. The demo opens directly on a sample Indane connection.
3. **Landing → Demo redirect.** Every CTA button ("Try Live Demo", "Book a Refill", "Launch Demo", hero sticker, final banner) is a link to `/demo` that opens in a **new tab**:
   `<a href="/demo" target="_blank" rel="noopener noreferrer">`. Use React Router `<Link>` with the same attributes. After the build, check that **every** CTA goes to `/demo`.
4. **No official trademarks as graphics.** Do not use or recreate the official Indane or IndianOil logos. Write "Indane" and "IndianOil / IOCL" as plain text only. All cylinder art must be **original illustrations** labeled with generic text such as "LPG 14.2 kg" or "BookMyGas". Put this text in the footer: *"Indane and IndianOil are trademarks of Indian Oil Corporation Ltd. BookMyGas is an independent concept demo and not an official IOCL product."*
5. **Offline-safe.** No API calls. All data comes from local TypeScript files.
6. **Honest numbers.** Label market stats "indicative", label prices "illustrative", and label testimonials "sample personas".

---

## TECH STACK

- **Vite + React 18 + TypeScript**
- **Tailwind CSS**, with brand tokens in `tailwind.config.ts`
- **React Router v6** with routes `/` and `/demo`. Lazy-load `/demo`.
- **Framer Motion** for scroll reveals, step transitions, and sticker "pop" animations
- **@react-three/fiber + @react-three/drei + three** for the 3D cylinder
- **canvas-confetti** for the booking-confirmed celebration
- **lucide-react** for icons
- Deploy target is Vercel (static). Add a `vercel.json` rewrite so `/demo` works on refresh:
  `{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }`

---

## BRAND

- **Name:** BookMyGas
- **Tagline:** "Book. Track. Cook."
- **Positioning:** "Smart refill booking for Indane LPG consumers."
- **Tone:** warm, confident, Indian, with light Hinglish micro-copy ("Gas khatam? No tension.")
- **Fonts:** Poppins (headings, 600/700/800) and Inter (body, 400/500/600), from Google Fonts

**Color tokens**

| Token | Hex | Use |
|---|---|---|
| `flame-500` | `#FF6B1A` | Primary CTAs, flame accents |
| `flame-100` | `#FFE8D9` | Soft backgrounds, sticker fills |
| `cylinder-red` | `#D7261E` | Domestic cylinder body |
| `cylinder-blue` | `#1F4FA3` | Commercial cylinder body |
| `navy-900` | `#0B1F3A` | Headings, dark sections, footer |
| `navy-600` | `#1E3A8A` | Links, secondary buttons |
| `mint-500` | `#10B981` | Success, "eligible", "confirmed" |
| `amber-400` | `#FBBF24` | Ratings, highlight stickers |
| `slate-50` | `#F8FAFC` | Page background |

---

## CYLINDER VISUAL SYSTEM (use it with purpose, not everywhere)

Build these reusable assets and use them where they help tell the story.

### A. `<CylinderLogo />`, the brand mark (SVG component)
- A rounded LPG cylinder silhouette: body, shoulder dome, collar ring, and valve on top. A **flame** shape rises from the valve, and the flame's inner cut-out forms a **location pin**, which signals "gas + delivery".
- Variants: `full` (mark and "BookMyGas" wordmark), `mark` (icon only), `mono` (white, for dark backgrounds).
- Use it in the navbar, footer, favicon (`public/favicon.svg`), OG image, demo top bar, and cash memo header.

### B. `<Cylinder3D />`, the interactive 3D cylinder (react-three-fiber)
- Model it procedurally, with no external model files:
  - Body: `CylinderGeometry` with rounded top and bottom shoulders (use `LatheGeometry` with a profile curve for a realistic LPG shape)
  - Foot ring at the bottom and collar/guard ring at the top (`TorusGeometry` or a thin lathe)
  - Brass-colored valve (small cylinder with a metallic material)
  - A **wrap-around label** made as a canvas texture that reads "LPG · 14.2 kg" and "BookMyGas" with the small flame icon. No official logos.
- Material: `meshPhysicalMaterial` with `color: #D7261E`, `clearcoat: 1`, `roughness: 0.35`, for a glossy painted-steel look. Use drei `<Environment preset="city" />` and `<ContactShadows />`.
- Behavior: slow idle auto-rotate, the user can drag to rotate (`OrbitControls` with zoom and pan disabled), a gentle float (drei `<Float>`), and a soft orange glow under the valve.
- Props: `variant: 'domestic14' | 'domestic5' | 'ftl5' | 'commercial19'`. These change height and scale, body color (red for domestic, blue `#1F4FA3` for commercial, silver or white for FTL), and the label text.
- **Performance fallback:** if `prefers-reduced-motion` is set, WebGL is unavailable, or the screen is under 640px wide, render `<CylinderIllustration />` instead (see C). Wrap the canvas in `<Suspense>` and show the SVG while it loads.
- Where it's used: the **hero** (large, right side) and the **Step 2 cylinder picker** in the demo (small, updating live as the user switches cylinder type).

### C. `<CylinderIllustration />`, a flat or 2.5D SVG cylinder
- A stylized SVG with highlights and shading (a linear gradient gives the fake-3D sheen). Same variants as the 3D model.
- Used in: the How-It-Works timeline, feature cards, the Problem before/after slider, the market section, and as the 3D fallback.
- Fun variants: a **"happy cylinder"** mascot with simple eyes and a smile (use sparingly, on the 404/empty state and the confirmation screen), and an **"empty cylinder"** (greyed-out, tilted) for the Problem section.

### D. `<Sticker />`, die-cut sticker badges
- Look: bold text or an icon inside a shape with a **thick white outline** (4–6px stroke), a soft drop shadow, a slight random rotation (−8° to +8°), and a peel-corner highlight on hover. On scroll-in they animate like a sticker being slapped on (scale 1.3 → 1, spring).
- Shapes: circle, star-burst, rounded rectangle, cylinder-shaped.
- Sticker set (use each where it fits):
  - 🔥 "Gas khatam? No tension." (hero, next to the headline)
  - ⚡ "Booked in 30 sec" (hero, overlapping the phone mockup)
  - 🛢️ "14.2 kg" cylinder-shaped sticker (features, cylinder picker)
  - ✅ "Eligible for refill" (demo Step 1)
  - 🔐 "DAC ready" (demo confirmation)
  - 🧾 "Digital cash memo" (features)
  - 🛡️ "Safety first · Call 1906" (safety feature card, footer, confirmation)
  - 🚚 "Doorstep delivery" (How It Works step 4)
  - 🎉 "Refill booked!" (confirmation screen, big)
  - "DEMO MODE" in a yellow and black hazard-tape style (demo top bar)
- Keep it to **2–3 stickers per viewport** so they stay playful without cluttering the page.

### E. Decorative cylinder touches
- A faint cylinder-outline pattern as the background texture of the dark navy sections (at 4% opacity).
- A loading spinner that is a small cylinder filling up with orange liquid, used during "Processing payment…".
- A demo progress bar drawn as a **horizontal cylinder** that fills with flame orange as the user moves through steps.

---

## LANDING PAGE (`/`): build every section

1. **Sticky navbar.** `<CylinderLogo full />` on the left. Links: Problem · How it Works · Market · Business Model (smooth scroll). A **"Try Live Demo ↗"** button on the right (flame orange, pulsing glow) → `/demo` in a new tab. The navbar turns into frosted glass once the user scrolls. On mobile it collapses into a hamburger menu that still shows the demo CTA.

2. **Hero.**
   - Left side: an eyebrow line "For Indane (IOCL) consumers & distributors". The headline **"Book your Indane LPG refill in 30 seconds."** Subtext: "Confirm your connection, pick a delivery slot, pay by UPI, and get your DAC and digital cash memo on your phone. No IVRS calls. No visits to the distributor." Primary CTA **"Try the Live Demo ↗"** → `/demo` in a new tab. Secondary CTA "See how it works ↓".
   - Right side: **`<Cylinder3D variant="domestic14" />`** floating beside a phone mockup that previews the demo's Step 1 screen. The stickers "Gas khatam? No tension." and "Booked in 30 sec" overlap the edges.
   - Background: a soft radial flame-orange glow and a subtle animated flame particle effect.

3. **Problem: "Refilling LPG shouldn't be this hard".** Three cards: 📞 busy IVRS lines (10+ minutes to book), ❓ no delivery visibility, 🧾 cash, paper memos, and DAC confusion. Below them, a **Before/After drag slider**. The Before side shows an SVG scene with the empty grey cylinder, a phone on hold, and a queue at the distributor's office. The After side shows a clean phone with a booking confirmed and the happy cylinder.

4. **How it works.** A 4-step horizontal timeline (vertical on mobile), each step with a `<CylinderIllustration />` vignette: (1) Confirm your Indane connection → (2) Choose cylinder and slot → (3) Pay by UPI, card, or cash on delivery → (4) Share your DAC and get a digital cash memo. The connecting line fills with orange as the user scrolls. The "Doorstep delivery" sticker sits on step 4.

5. **Features grid (6 cards).** One-tap refill rebooking · Refill eligibility check (last refill date and interval) · Choose-your-slot delivery · UPI and digital cash memo · Refill and mandatory safety-inspection reminders · LPG safety tips with one-tap **1906** emergency call. Each card has an icon and a small cylinder accent, and tilts slightly on hover.

6. **Cylinder range showcase.** A row of four `<CylinderIllustration />` cylinders standing side by side at their relative heights: **14.2 kg Domestic**, **5 kg Domestic**, **5 kg FTL "Chhotu"**, **19 kg Commercial**. Each has a name, a use case, and a cylinder-shaped sticker showing its weight. Hovering lifts the cylinder and shows a tooltip. A button below reads **"Book any of these in the demo ↗"** → `/demo`.

7. **Market opportunity.** Count-up stats labeled "indicative, verify with PPAC/IOCL": ~33 crore domestic LPG connections in India · ~15 crore+ Indane customers · ~12,000+ Indane distributors · ~10 crore+ PMUY connections. Add a TAM → SAM → SOM graphic of three concentric circles: all LPG consumers → Indane consumers → urban and semi-urban Indane smartphone users.

8. **Business model.** Three cards: **Distributor SaaS (primary)**, a monthly plan covering booking intake, slot planning, delivery-person assignment, and digital cash memos · **Premium convenience (optional, only where rules allow it)** · **Partnerships** (stove servicing, Suraksha hose replacement, kitchen safety). Add a small unit-economics table with CAC, LTV, and payback as placeholders.

9. **Comparison table.** Columns: BookMyGas / IVRS call / SMS or missed call / Visit to distributor. Rows: slot choice, UPI payment, delivery visibility, DAC shown in-app, digital cash memo, reminders. Use ✓ and ✗ icons. Add a note: "BookMyGas works alongside IOCL's official channels."

10. **Roadmap.** Q1 MVP → Q2 pilot with 10 Indane distributors in 1 city → Q3 5 cities → Q4 distributor SaaS launch. Draw it as a road, with a small delivery-truck icon that moves along it as the user scrolls.

11. **Testimonials (sample personas).** Quote cards from "Homemaker, Pune", "Indane distributor, Indore", and "Restaurant owner, Nagpur (19 kg commercial)", with initial avatars. Add a small label: "Sample personas for illustration".

12. **Final CTA banner.** A dark navy section with the cylinder-pattern background. The headline "See it in action. Book an Indane refill in under a minute." A large **"Launch Demo ↗"** button → `/demo` in a new tab, with the happy-cylinder mascot waving next to it.

13. **Footer.** `<CylinderLogo mono />`, tagline, contact email (hello@bookmygas.in placeholder), social icons, a **"LPG Emergency: 1906"** sticker, the trademark disclaimer, and © 2026 BookMyGas.

---

## DEMO PAGE (`/demo`): Indane refill-booking flow

### Layout
- **Top bar:** `<CylinderLogo mark />` and "BookMyGas", the hazard-tape **DEMO MODE** sticker, a **Reset demo** button, an **Autoplay ▶** toggle, and a "← Back to site" link.
- **Desktop:** a **realistic phone frame** in the center with the app inside it. On the left, a **commentary panel** titled "What's happening" shows one pitch line per step. On the right, a small `<Cylinder3D />` shows the selected cylinder.
- **Mobile:** no phone frame. The app goes full-screen and the commentary is hidden.
- **Progress:** the horizontal-cylinder progress bar, which fills orange as the user goes through the steps. Label the steps Connection · Cylinder · Address · Slot · Pay · Done.
- Steps slide in and out with Framer Motion `AnimatePresence`. Back and Next buttons are pinned to the bottom of the phone screen.

### Steps (use these exact LPG/IOCL terms)

**Step 1: Your Indane Connection** (the demo opens here, with no login)
- A connection card: consumer name "Priya Sharma", **Consumer No.** `100245`, **LPG ID** `71234567890123456` (17 digits), **Distributor** "Shree Sai Indane Gramin Vitrak, Pune" (fictional), **Connection type** DBC (Double Bottle Connection), **Last refill:** 28 days ago.
- Chips: the ✅ "Eligible for refill" sticker, "DBTL subsidy linked", "Registered mobile ••••••4321".
- Commentary: "Consumer details are already linked, so there's nothing to type."

**Step 2: Choose Cylinder**
- Four selectable cards, each with a `<CylinderIllustration />`: 14.2 kg Domestic (default, ₹853*), 5 kg Domestic (₹318*), 5 kg FTL "Chhotu" (₹450*), 19 kg Commercial (₹1,720*). *Mark all prices illustrative.
- The side `<Cylinder3D />` changes variant with a smooth scale and color transition.
- Quantity stepper: 1 for SBC, up to 2 for DBC. Commercial has its own rules.
- The price updates live with an animated number.

**Step 3: Delivery Address**
- The registered address is pre-selected, with the note "Refills are delivered to your registered address." It sits over a stylized SVG map where a pin drops in with a bounce. A small truck icon waits at the distributor's godown on the map.

**Step 4: Delivery Slot**
- A date strip for the next 3 days, generated from today's date. Time chips: Morning 8–12 · Afternoon 12–4 · Evening 4–8. One chip shows a "Filling fast 🔥" micro-sticker.

**Step 5: Review & Pay**
- Summary: cylinder, quantity, distributor, slot, address.
- Breakdown: Refill RSP (incl. GST) · Home delivery ₹0 · Offer `FIRSTREFILL` −₹25 (demo) · **Total**.
- Payment: UPI (default, with sample app chips as generic icons) · Card · Cash on Delivery.
- Info note: "If eligible, the DBTL subsidy is credited to your linked bank account after delivery."
- Button: **"Pay & Book Refill"**.

**Step 6: Booking Confirmed 🎉**
- 1.5 seconds of "Processing payment…" with the **cylinder-filling loader**, then confetti and a big "Refill booked!" sticker that slaps on.
- The happy-cylinder mascot, and the **Booking Reference No.** `BMG-2026-` followed by 5 random digits.
- A highlighted **DAC** card (4 random digits, big mono font, and the "DAC ready" sticker) with the note: "Share this code with the delivery person only when you receive the cylinder."
- Delivery slot and distributor name.
- An **SMS toast** slides down from the phone's top edge: *"Your Indane refill booking BMG-2026-XXXXX is confirmed. DAC: XXXX. Distributor: Shree Sai Indane Gramin Vitrak. – BookMyGas"*.
- Buttons: **"Download cash memo"** opens a print-friendly `<CashMemo />` (logo, consumer details, cylinder, RSP, GST, total, booking ref, and the "Demo document, not a valid tax invoice" watermark) and calls `window.print()`. The other button is **"Book another refill"**.
- A safety card with the "Safety first · Call 1906" sticker: "Check the seal and weight before accepting the cylinder."

### Demo extras
- **Autoplay:** steps through the whole flow automatically, about 3 seconds per step, with commentary. It stops if the user clicks anything.
- **"Not eligible yet" toggle** in the commentary panel: sets the last refill to 5 days ago, so Step 1 shows an amber "Refill interval not met, next booking from DD MMM" state and Next is disabled. Use it as a talking point for distributors.
- **Reset:** clears state and `localStorage`, then returns to Step 1.
- **Persistence:** store the confirmed booking in `localStorage` (wrap every read and write in try/catch) so a refresh on Step 6 keeps the confirmation.
- **Keyboard:** Enter = Next, Esc = Back.
- **Smart defaults:** a presenter can press Next repeatedly and finish in under 30 seconds.

### State
One `useBooking` reducer: `{ step, connection, cylinder, qty, slot, payment, offer, bookingRef, dac, eligible }`.

---

## PROJECT STRUCTURE

```
src/
  main.tsx, App.tsx, router.tsx
  pages/Landing.tsx, pages/Demo.tsx
  components/
    brand/     CylinderLogo, Cylinder3D, CylinderIllustration, Sticker, CylinderLoader, CylinderProgress, CylinderPattern
    landing/   Navbar, Hero, Problem, BeforeAfter, HowItWorks, Features, CylinderRange,
               Market, BusinessModel, Compare, Roadmap, Testimonials, CtaBanner, Footer
    demo/      PhoneFrame, DemoTopBar, CommentaryPanel, StepConnection, StepCylinder,
               StepAddress, StepSlot, StepPayment, StepConfirmed, SmsToast, CashMemo
    ui/        Button, Card, Badge, CountUp, SectionHeading, DemoLink
  hooks/       useBooking, useAutoplay, useInView, useReducedMotion, useWebGL
  data/        connection.ts, cylinders.ts, address.ts, slots.ts, offers.ts, commentary.ts
  lib/         formatINR, generateBookingRef, generateDac, refillEligibility, dates
```

Create a single **`<DemoLink />`** component that every CTA uses. It renders the `/demo` link with `target="_blank" rel="noopener noreferrer"`, so the redirect behavior lives in one place.

---

## QUALITY BAR

- **Responsive** at 360px, 768px, and 1280px or wider. No horizontal scroll at any width.
- **Accessibility:** color contrast of at least 4.5:1, visible focus rings, aria-labels on icon buttons, alt text on illustrations, `aria-hidden` on decorative stickers and the 3D canvas, and a live region that announces step changes.
- **`prefers-reduced-motion`:** turns off the 3D canvas (the SVG is shown instead), confetti, parallax, and sticker slap animations.
- **Performance:** Lighthouse 90+. Lazy-load the 3D canvas and the `/demo` route, keep all artwork as SVG, and preconnect to Google Fonts.
- **SEO/OG:** title "BookMyGas: Indane LPG Refill Booking", a meta description, and an OG image (cylinder logo on navy with the tagline).
- **Clean code:** typed props, no `any`, small components, and brand tokens used everywhere (no hard-coded hex values in components).

---

## ACCEPTANCE CHECKLIST (check every item before finishing)

- [ ] Every landing-page CTA opens `/demo` in a new tab using `<DemoLink />`
- [ ] Refreshing directly on `/demo` works (SPA rewrite)
- [ ] No login or OTP screen anywhere
- [ ] Only Indane / Indian Oil is mentioned, with no other oil company
- [ ] No official Indane or IndianOil logo is used, all cylinder art is original, and the trademark disclaimer is in the footer
- [ ] The 3D cylinder renders in the hero and demo, and the SVG fallback works on mobile and reduced motion
- [ ] Stickers appear in the listed spots, 2–3 per viewport at most
- [ ] The demo completes Steps 1→6, with booking ref, DAC, SMS toast, and a printable cash memo
- [ ] Autoplay, Reset, the "Not eligible yet" toggle, and localStorage persistence all work
- [ ] Prices, stats, and testimonials are labeled illustrative, indicative, and sample
- [ ] `npm run build` passes with no TypeScript errors
