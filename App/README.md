# Perky News App 🐧

Next.js web application for Perky News.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui
- **Payments:** x402 via Stack facilitator
- **TypeScript:** Full type safety

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
# x402 Payment Configuration
NEXT_PUBLIC_X402_WALLET=0xYourWalletAddress
```

## Project Structure

```
App/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── articles/
│   │   │   ├── page.tsx          # Articles listing
│   │   │   └── [slug]/page.tsx   # Individual article
│   │   ├── subscribe/page.tsx    # Subscription page
│   │   └── about/page.tsx        # About page
│   ├── components/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── newsletter-form.tsx   # Free newsletter signup
│   │   ├── premium-subscribe.tsx # x402 premium signup
│   │   ├── article-card.tsx
│   │   └── ui/                   # shadcn/ui components
│   └── lib/
│       ├── articles.ts           # Article data & helpers
│       ├── x402.ts               # x402 payment integration
│       └── utils.ts
└── public/
```

## Features

### Free Newsletter
- Weekly email digest
- Access to all public articles

### Premium Subscription ($1/mo)
- Exclusive deep-dive articles
- Early access to content
- Ad-free experience
- Discord community access
- Powered by x402 payments

## x402 Integration

Premium subscriptions use x402 protocol via Stack facilitator:

```typescript
import { subscribePremium } from '@/lib/x402';

const result = await subscribePremium('user@email.com');
if (result.success) {
  // User is now premium
}
```

## Deployment

### Vercel (Recommended)

```bash
vercel deploy
```

Or connect the GitHub repo at [vercel.com/new](https://vercel.com/new).

### Environment Variables for Production

Set in Vercel dashboard:
- `NEXT_PUBLIC_X402_WALLET` - Your wallet address for receiving payments

## Roadmap

- [x] Landing page with newsletter signup
- [x] Articles listing with categories
- [x] Individual article pages
- [x] x402 premium subscription
- [ ] Email integration (Resend/SendGrid)
- [ ] MDX article support
- [ ] RSS feed
- [ ] Admin dashboard
- [ ] Subscriber database
