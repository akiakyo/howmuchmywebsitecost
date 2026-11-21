# How much will my website cost?

An open source website cost calculator. Visitors pick what they're building, how many pages, the design level, features, timeline and an aftercare plan, and get an instant estimate with a breakdown, delivery time and price range.

It covers everything from a one-page landing page to a full online store, POS system, web app, SaaS or marketplace.

Built by [akiakyo.dev](https://akiakyo.dev) with **Next.js**, **React**, **TypeScript**, **Motion** and **Solar icons (Bold)**.
np
## Features

- **9 project types:** landing page, portfolio, business site, blog, full online store, POS system, web app, SaaS, marketplace
- **54 features in 7 categories:**
  - **Content & CMS:** headless CMS, blog, forms, media library, search, multiple languages
  - **E-commerce:** catalog, cart & checkout, GCash/Maya/card payments, orders, inventory, shipping, vouchers, reviews, wishlist, invoices, multi-vendor
  - **POS:** POS terminal, barcode/QR scanning, receipt printing, staff & shifts, multi-branch sync, offline mode, sales reports
  - **Web app & development:** accounts, social login, roles, admin dashboard, database & API, realtime chat, notifications, uploads, booking, subscriptions, integrations, AI features, PWA
  - **Marketing & SEO**, **Design extras** and **Launch & infrastructure**
- **Suggested features** for each project type, which visitors can add with one click
- **Animations:** staggered hero, scroll-in sections, spring card selection, a counting total, an animated breakdown list and a cursor spotlight. All of them respect `prefers-reduced-motion`.
- **Black-and-white theme** with Geist and Geist Mono fonts
- **Copy estimate** and **email inquiry** buttons
- Mobile layout with a sticky total bar
- Accessible: radio and checkbox roles, keyboard focus states and live price updates
- Static export, so it runs on any host with no server

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

Build for production:

```bash
npm run build      # outputs static files to /out
```

## Customize

Everything lives in **`src/config/pricing.ts`**: prices, currency, brand, email, project types, features, icons and labels.

```ts
brand:    { name: "Your Studio", url: "https://example.com", email: "you@example.com" },
currency: { code: "USD", locale: "en-US" },
```

- **Add a feature:** add an object to any `featureGroups[].features` array.
- **Add a category:** add a new group to `featureGroups`.
- **Change an icon:** import any `...BoldIcon` from `@solar-icons/react` ([browse icons](https://solar-icons.vercel.app)).
- **Suggest features for a project type:** list their ids in `recommended`.

> The default prices are sample numbers in PHP. Set your own rates before you publish.

Theme colors are CSS variables at the top of `src/app/globals.css`.

## How the estimate works

```
build    = base + extraPages × pricePerExtraPage
subtotal = build × designMultiplier + sum(feature prices)
total    = subtotal × timelineMultiplier          (rounded to roundTo)
range    = total ± rangePercent
weeks    = (type weeks + page weeks + feature weeks) × design effort × timeline speed
```

The logic is in `src/lib/calculate.ts`.

## Project structure

```
src/
  app/            layout, page, global styles
  components/     Calculator, Step, OptionCard, FeatureGroups, Summary, AnimatedNumber
  config/         pricing.ts  ← edit this
  lib/            calculate.ts (pricing math + formatting)
```

## Deploy

- **Cloudflare Pages:** framework preset "Next.js (Static HTML Export)", build command `npm run build`, output directory `out`
- **Vercel:** import the repo; it works with no extra setup
- **Netlify / GitHub Pages:** build, then serve the `out` folder

## Contributing

Pull requests are welcome. Ideas:

- Shareable estimate links (selection saved in the URL)
- PDF export of the estimate
- Translations (Filipino, etc.)
- Light theme toggle

## License

[MIT](LICENSE) © Aquio Fulgencio
