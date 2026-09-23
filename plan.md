# BookMyGas — Landing Page + Booking Demo Plan

> **Goal:** A business-pitch website for **BookMyGas**, a refill-booking app for **Indane LPG (Indian Oil Corporation Ltd, IOCL)** consumers and distributors.
> A polished **landing page** tells the story. A clear **"Try the Live Demo"** button opens a
> **demo page in a new tab**, where the viewer books an Indane LPG refill from start to finish in under 60 seconds.
>
> **Scope:** Indian Oil (Indane) cylinders only. There is no provider picker, and no other oil company's name, product, or pricing appears anywhere on the site or in the demo.

---

## 1. Objectives

| # | Objective | How we'll know it worked |
|---|-----------|--------------------------|
| 1 | Get the value across in about 5 seconds | The hero headline and subtext explain the product without scrolling |
| 2 | Make the business case clearly | Problem → solution → market → revenue model sections |
| 3 | Show, don't tell | A working Indane refill-booking demo a pitch audience can click through live |
| 4 | Speak the LPG industry's language | Real terms throughout: consumer number, distributor, DAC, cash memo, DBTL, refill interval |
| 5 | Look investor-grade | Consistent branding, smooth motion, responsive on laptop and phone |
| 6 | Be easy to present | Demo works offline with mock data, no login, a reset button for repeat runs |

**Out of scope (for now):** real payments, real IOCL/distributor system integration, a backend, order tracking, a distributor dashboard.

---

## 2. Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Build | **Vite + React 18 + TypeScript** | Fast dev server, simple static build |
| Styling | **Tailwind CSS** | Quick, consistent design tokens |
| Animation | **Framer Motion** | Hero motion, step transitions, success celebration |
| Routing | **React Router** | `/` (landing) and `/demo` (booking) |
| Icons | **Lucide React** | Clean, consistent icon set |
| Celebration | **canvas-confetti** | Booking-confirmed moment |
| Forms | React state + small validators (no heavy form lib) | The demo has only a few fields |
| Deploy | **Vercel / Netlify** (static) | One-click, shareable pitch URL |

The **"Try Live Demo"** button uses `<a href="/demo" target="_blank" rel="noopener">` so the pitch deck and landing page stay open in the original tab.

---

## 3. Brand Identity

**Name:** BookMyGas
**Positioning line:** "Smart refill booking for Indane LPG consumers."
**Tagline options:**
- "Your Indane refill, one tap away."
- "LPG refills, without the queue."
- "Book. Track. Cook." ✅ *(recommended: short and memorable)*

**Logo concept:** A rounded LPG cylinder silhouette with a small flame replacing the dot of a location pin. It signals LPG plus home delivery.

**Color palette: "Flame & Trust"** (orange and deep blue, in the same family as IndianOil's colors, so it feels at home next to Indane without copying its brand)

| Token | Hex | Use |
|-------|-----|-----|
| `flame-500` (primary) | `#FF6B1A` | CTAs, highlights, flame accents |
| `flame-100` | `#FFE8D9` | Soft backgrounds, badges |
| `navy-900` (secondary) | `#0B1F3A` | Headings, dark sections, footer |
| `navy-600` | `#1E3A8A` | Links, secondary buttons |
| `mint-500` (success) | `#10B981` | Confirmations, "delivered" states |
| `slate-50` | `#F8FAFC` | Page background |
| `amber-400` | `#FBBF24` | Ratings, subtle warnings |

**Typography:** *Poppins* (headings, friendly and bold) and *Inter* (body and UI), from Google Fonts.

**Tone of voice:** Warm, confident, and made for Indian households, with light Hinglish touches in micro-copy (for example "Gas khatam? No tension." as a hero badge).

**Brand usage rule:** Write "Indane" and "IndianOil / IOCL" as plain text only. Do not use the official Indane or IndianOil logos, cylinder artwork, or brand colors exactly **unless IOCL or the distributor has given written permission**. Add a footer line: *"Indane and IndianOil are trademarks of Indian Oil Corporation Ltd. BookMyGas is an independent concept demo."*

---

## 4. LPG / IOCL Glossary (use these terms consistently in the UI)

| Term | Meaning | Where it appears |
|------|---------|------------------|
| **Consumer Number** | The consumer's number registered with their Indane distributor | Connection card, receipt |
| **LPG ID** | 17-digit unique LPG identifier linked to the connection | Connection card |
| **Distributor** | The authorised Indane distributorship that delivers refills | Connection card, receipt, SMS |
| **Refill booking** | Ordering a filled cylinder in exchange for the empty one | Everywhere ("Book Refill", never "Buy Gas") |
| **SBC / DBC** | Single Bottle Connection / Double Bottle Connection | Connection card |
| **Booking reference no.** | The number generated when a refill is booked | Confirmation, SMS |
| **DAC** | Delivery Authentication Code, the OTP the consumer gives the delivery person when the cylinder arrives | Confirmation screen, SMS |
| **Cash memo** | The bill/tax invoice given at delivery | Receipt ("Download cash memo") |
| **DBTL / PAHAL** | Direct Benefit Transfer of the LPG subsidy into the linked bank account | Subsidy info chip |
| **PMUY** | Pradhan Mantri Ujjwala Yojana connections | Optional badge in the demo persona |
| **Refill interval** | Minimum gap required between two refill bookings | Booking eligibility check |
| **Mandatory safety inspection** | Periodic safety check of the consumer's LPG installation | Safety tips, reminders |
| **Suraksha hose** | IOCL-recommended LPG rubber hose | Safety tips |
| **1906** | National LPG emergency helpline | Footer, safety section, demo |
| **Retail selling price (RSP)** | Official refill price for the market | Price breakdown |

---

## 5. Site Map

```
/            → Landing page (pitch story)
   └── [Try Live Demo ↗]  → opens /demo in new tab
/demo        → Indane refill-booking demo (5 steps + confirmation)
```

---

## 6. Landing Page: Section-by-Section

### 6.1 Sticky Navbar
- Logo on the left. Links: *Problem · How it Works · Market · Business Model*.
- On the right: a **"Try Live Demo ↗"** button in flame orange with a soft pulsing glow.
- Becomes frosted glass with a shadow once the user scrolls.

### 6.2 Hero (above the fold)
- **Headline:** "Book your Indane LPG refill in 30 seconds."
- **Subtext:** "BookMyGas connects Indane consumers with their distributor: book a refill, pick a delivery slot, pay by UPI, and get your DAC and cash memo on your phone. No IVRS calls, no visits to the distributor."
- **Primary CTA:** `Try the Live Demo ↗` (new tab). **Secondary CTA:** `See how it works ↓`.
- **Visual:** A phone mockup showing the refill-booking screen, with a gently floating 14.2 kg cylinder illustration and a small animated flame.
- **Badge:** "Built for Indane (IOCL) consumers and distributors", in plain text with no official logo.

### 6.3 The Problem ("Why this matters")
Three pain-point cards, each with an icon and a stat-style hook (mark the numbers as illustrative):
1. 📞 **Busy IVRS lines and missed calls**: "Booking a refill by phone can take 10+ minutes."
2. ❓ **No delivery visibility**: "Consumers don't know when the delivery person will arrive, or whether to wait at home."
3. 🧾 **Cash and paper hassle**: "Exact change, paper cash memos, and confusion over the DAC."

Visual idea: a "Before vs After" split slider. The left side shows a busy phone line and a queue at the distributor's office; the right side is a clean app screen.

### 6.4 The Solution / How It Works
A four-step horizontal timeline that animates in on scroll:
1. **Confirm your Indane connection** (consumer number and distributor)
2. **Choose cylinder and delivery slot**
3. **Pay your way** (UPI, card, or cash on delivery)
4. **Get it delivered**: share your DAC with the delivery person and receive a digital cash memo

Each step gets a small illustration. The line between steps fills with orange as the user scrolls.

### 6.5 Key Features Grid (6 cards)
- ⚡ One-tap refill rebooking
- 🔎 Refill eligibility check (shows the refill interval and the date of your last booking)
- 🕒 Choose-your-slot delivery
- 💳 UPI-first payments, with a digital cash memo
- 🔔 Refill and mandatory-safety-inspection reminders
- 🛡️ LPG safety tips and a one-tap **1906** emergency helpline

### 6.6 Market Opportunity (the pitch core)
Animated count-up stats (**indicative, verify against the latest PPAC / IOCL figures before pitching**):
- **~33 crore** active domestic LPG connections in India
- **~15 crore+** of them are Indane (IOCL) customers, the largest share
- **~12,000+** Indane distributors nationwide
- **~10 crore+** PMUY (Ujjwala) connections

Add a simple TAM → SAM → SOM concentric-circles graphic: all LPG consumers → Indane consumers → urban and semi-urban Indane consumers who use smartphones.

### 6.7 Business Model
Three revenue cards (to be validated against IOCL distributor guidelines on consumer charges):
1. **Distributor SaaS (primary)**: a monthly plan for Indane distributors covering booking intake, slot planning, delivery-person assignment, and digital cash memos
2. **Premium convenience** *(optional)*: priority or exact-time slots, only where the rules allow it
3. **Partnerships**: stove and appliance servicing, Suraksha hose replacement, kitchen-safety products

Optional: a small "Unit economics" table with CAC, LTV, and payback period as placeholders.

### 6.8 Competitive Edge
A comparison table with columns **BookMyGas / IVRS call / SMS or missed-call booking / Visit to distributor**, and rows for slot choice, UPI payment, delivery visibility, DAC shown in-app, digital cash memo, and reminders. Ticks and crosses make the advantage obvious.
*Keep the tone respectful toward IOCL's own official channels. Present BookMyGas as a layer that works alongside them, not a replacement.*

### 6.9 Traction / Roadmap
A horizontal roadmap: **Q1 MVP → Q2 pilot with 10 Indane distributors in 1 city → Q3 5 cities → Q4 distributor SaaS launch.**
Traction placeholders: "X pilot distributors · Y refill bookings · Z% repeat rate".

### 6.10 Testimonials (illustrative)
Two or three quote cards from *personas* such as "Homemaker, Pune" and "Indane distributor, Indore", with initial-based avatars. Label them clearly as sample personas. Do not present them as real reviews.

### 6.11 Final CTA Banner
A full-width dark navy band: "See it in action. Book an Indane refill in under a minute." Include a large **`Launch Demo ↗`** button.

### 6.12 Footer
Logo, tagline, contact email (hello@bookmygas.in placeholder), social icons, the **LPG emergency helpline 1906**, the trademark disclaimer from Section 3, a "Concept demo, not an official IOCL product" note, and © 2026.

---

## 7. Demo Page (`/demo`): Indane Refill-Booking Flow

### 7.1 Layout
- **Desktop:** The booking flow sits inside a **realistic phone frame** in the center, like watching the real app. A side panel on the left shows "What's happening", with one line of pitch commentary per step (useful when presenting).
- **Mobile:** The phone frame is dropped and the flow goes full-screen.
- A top bar shows the **"DEMO MODE"** badge, a **Reset demo** button, and a link back to the landing page.
- **No login.** The demo opens straight on a pre-loaded sample Indane connection.

### 7.2 Steps

| Step | Screen | Details |
|------|--------|---------|
| 1 | **Your Indane connection** | A connection card for a sample consumer: name, **Consumer No.** `XXXXXX`, **LPG ID** `7XXXXXXXXXXXXXXXX` (17 digits), **Distributor** e.g. "Shree Sai Indane Gramin Vitrak, Pune" (fictional), connection type **DBC**, and **Last refill: 28 days ago**. A green chip reads "✅ Eligible for refill". A second chip reads "DBTL subsidy linked". |
| 2 | **Choose cylinder** | **14.2 kg Domestic** (default) · **5 kg Domestic** · **5 kg FTL "Chhotu"** · **19 kg Commercial**. Each shows the illustrative RSP. The quantity stepper follows connection rules: 1 for SBC, up to 2 for DBC. |
| 3 | **Delivery address** | The address registered with the distributor is pre-selected, with a note that "Delivery is made to your registered address". Includes a static map illustration with a pin drop animation. |
| 4 | **Delivery slot** | A date strip for the next 3 days and time chips: *Morning 8–12 · Afternoon 12–4 · Evening 4–8*. One slot shows as "Filling fast". |
| 5 | **Review and pay** | Refill summary and price breakdown: **RSP of the refill (incl. GST)** + home delivery ₹0 − first-booking offer `FIRSTREFILL` (demo only). Payment options: UPI (default) · Card · Cash on Delivery. A note explains that the DBTL subsidy, if applicable, is credited to the linked bank account after delivery. |
| 6 | **Booking confirmed 🎉** | A 1.5-second "Processing payment…" state with a UPI-style animation, then confetti and a large green tick. Shows the **Booking Reference No.** `BMG-2026-XXXXX`, the delivery slot, the distributor name, and a highlighted **DAC: 4 digits**, with the note "Share this code with the delivery person only when you receive the cylinder." A mock **SMS toast** slides in: *"Your Indane refill booking BMG-… is confirmed. DAC: XXXX. Distributor: Shree Sai Indane…"*. Buttons: **Download cash memo** (print-friendly view) and **Book another refill**. A safety tip card: "Check the seal and weight of the cylinder before accepting delivery. Emergency? Call 1906." |

### 7.3 UX Details That Impress in a Pitch
- A **progress bar** with step labels at the top, plus back and next navigation.
- **Smooth slide transitions** between steps (Framer Motion `AnimatePresence`).
- A **price that updates live** with an animated number change.
- **Smart defaults** so a presenter can click "Next" repeatedly and finish in under 30 seconds.
- An optional **"Autoplay demo" mode** that walks through every step automatically with the commentary panel, for when the presenter is talking and not clicking.
- An **offline-safe** build: no network calls, and all data comes from local JSON.
- The last booking is stored in `localStorage` so the confirmation survives a refresh. The Reset button clears it.
- An optional **"Not eligible yet" toggle** in the commentary panel. It switches the last refill to "5 days ago" to show how the refill-interval check blocks early bookings, which is a good talking point for distributors.

### 7.4 Mock Data (`src/data/`)
- `connection.ts`: consumer name, consumer number, LPG ID, distributor, SBC/DBC, last refill date, DBTL status
- `cylinders.ts`: type (domestic / FTL / commercial), weight, illustrative RSP, quantity rules
- `address.ts`: registered address
- `slots.ts`: generated for the next 3 days
- `offers.ts`: `FIRSTREFILL` (demo discount)

All prices are illustrative, and the UI footer says so: *"Prices shown are indicative. Actual RSP varies by city and month."*

### 7.5 Business: Bulk Commercial Orders

A **Household | Business · Bulk** switch at the top of the phone screen changes the flow. The landing page's **For Business** section links straight to it (`/demo?mode=business`).

| Step | Screen | Details |
|------|--------|---------|
| 1 | **Commercial account** | Business name, contact person, **GSTIN**, **Commercial Consumer No.**, distributor. No refill interval applies to commercial LPG. |
| 2 | **Bulk order** | Mix **19 kg** (max 100) and **47.5 kg** (max 50) commercial cylinders. Quick picks 5 / 10 / 25 / 50. **Volume discounts** (illustrative): 2% at 10+, 4% at 25+, 6% at 50+. |
| 3 | **Business address** | The registered business address, delivered in a single drop. |
| 4 | **Delivery schedule** | First delivery slot, plus **repeat**: one-time, weekly, fortnightly or monthly. |
| 5 | **Review and pay** | Line items, volume discount, an 18% GST figure for input tax credit. Net banking, UPI, card or cash on delivery. |
| 6 | **Bulk order confirmed** | Reference `BMG-B-2026-XXXXX`, DAC, schedule, and a printable **GST tax invoice** (taxable value, CGST 9% and SGST 9%). |

The household flow now offers only household cylinders (14.2 kg, 5 kg, 5 kg FTL). Commercial cylinders are ordered through the business flow.

---

## 8. Project Structure

```
bokmygasv2/
├─ public/            # favicon, og-image
├─ src/
│  ├─ main.tsx, App.tsx, router.tsx
│  ├─ pages/
│  │  ├─ Landing.tsx
│  │  └─ Demo.tsx
│  ├─ components/
│  │  ├─ landing/     # Navbar, Hero, Problem, HowItWorks, Features,
│  │  │               # Market, BusinessModel, Compare, Roadmap,
│  │  │               # Testimonials, CtaBanner, Footer
│  │  ├─ demo/        # PhoneFrame, Stepper, StepConnection,
│  │  │               # StepCylinder, StepAddress, StepSlot, StepPayment,
│  │  │               # StepConfirmed, CashMemo, CommentaryPanel, SmsToast
│  │  └─ ui/          # Button, Card, Badge, CountUp, SectionHeading
│  ├─ hooks/          # useBooking (reducer), useAutoplay, useInView
│  ├─ data/           # mock connection, cylinder, slot data
│  ├─ lib/            # formatCurrency, generateBookingRef, generateDac,
│  │                  # refillEligibility, slots
│  └─ styles/index.css
├─ tailwind.config.ts # brand tokens from Section 3
└─ plan.md
```

**State:** A single `useBooking` reducer holds `{ step, connection, cylinder, qty, slot, payment, offer, bookingRef, dac }`.

---

## 9. Responsiveness and Accessibility
- Breakpoints for mobile first (360px), tablet (768px), and desktop (1280px).
- Color contrast of at least 4.5:1, and focus rings on every interactive element.
- Every demo step is keyboard-navigable (Enter moves to the next step).
- `prefers-reduced-motion` turns off confetti and parallax.
- Semantic landmarks and alt text on illustrations.

---

## 10. Performance and SEO
- Lighthouse target of 90+ in every category.
- Lazy-load below-the-fold sections and the demo route.
- Use SVG illustrations (no heavy images) and preconnect to Google Fonts.
- Meta title ("BookMyGas: Indane LPG Refill Booking") and description, plus an Open Graph image so the link previews well when shared on WhatsApp or LinkedIn.

---

## 11. Build Milestones

| Phase | Deliverable | Est. |
|-------|-------------|------|
| 1 | Scaffold Vite + React + TS + Tailwind, set up brand tokens, routing | 0.5 day |
| 2 | Landing: Navbar, Hero, Problem, How it Works | 1 day |
| 3 | Landing: Features, Market, Business Model, Compare, Roadmap, Testimonials, CTA, Footer | 1 day |
| 4 | Demo: PhoneFrame, Stepper, `useBooking`, Steps 1–3 (connection, cylinder, address) | 1 day |
| 5 | Demo: Steps 4–6, payment animation, DAC, confetti, SMS toast, cash memo | 1 day |
| 6 | Autoplay mode, commentary panel, eligibility toggle, reset, localStorage | 0.5 day |
| 7 | Responsive polish, accessibility, performance, deploy to Vercel | 0.5 day |

**Total: about 5.5 days**

---

## 12. Pitch-Day Checklist
- [ ] Demo URL deployed and bookmarked, with a local `npm run preview` fallback ready
- [ ] Walk through the full flow on both projector resolution and a phone
- [ ] Autoplay tested end-to-end
- [ ] Market stats checked against the latest PPAC / IOCL data
- [ ] Refill prices updated to the current month's RSP for the pitch city
- [ ] Refill-interval rule and cylinder quantity rules confirmed against current IOCL norms
- [ ] Trademark disclaimer visible, with no official logos used without permission
- [ ] Reset clicked before every presentation

---

## 13. Future Enhancements (after the pitch)
- Live delivery tracking with an animated delivery-person map
- An Indane distributor dashboard (booking queue, godown stock, delivery-person assignment, DAC verification)
- Integration with a payment gateway (Razorpay) and, if authorised, with IOCL booking systems
- Multi-language support (Hindi, Marathi, Tamil…) and WhatsApp refill booking
- DBTL subsidy status, PMUY support, new-connection and SBC→DBC requests
- Mandatory safety inspection scheduling and Suraksha hose replacement orders
