# BookMyGas: Indane LPG Refill Booking (pitch site + live demo)

A business-pitch landing page (`/`) and a clickable, fully mocked Indane refill-booking demo (`/demo`).
Every call-to-action on the landing page opens the demo in a new tab.

See [plan.md](plan.md) for the product plan and [master-prompt.md](master-prompt.md) for the full build spec.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build
```

Deploy `dist/` to Vercel or Netlify. `vercel.json` rewrites all paths to `index.html`, so `/demo` works on refresh.

## Where to change things

| What | File |
|---|---|
| Sample consumer, distributor, refill interval | `src/data/connection.ts` |
| Cylinder types and illustrative prices | `src/data/cylinders.ts` |
| Demo offer code | `src/data/offers.ts` |
| Presenter commentary per step | `src/data/commentary.ts` |
| Market stats (indicative) | `src/components/landing/Market.tsx` |
| Brand colours | `tailwind.config.ts` |

## Presenting

- **Start over** clears the booking before each run.
- The **"Not eligible yet"** checkbox shows the refill-interval check.
- Keyboard: Enter goes to the next step, Esc goes back.
- Everything runs offline once loaded, with no API calls.

Indane and IndianOil are trademarks of Indian Oil Corporation Ltd. BookMyGas is an independent concept demo and not an official IOCL product.
