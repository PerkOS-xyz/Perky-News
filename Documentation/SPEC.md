# Perky News - Product Specification

**Product:** Newsletter/Blog platform for Web3 AI ecosystem news  
**Owner:** PerkOS / Julio Cruz  
**Status:** MVP Complete → Phase 2  
**Repository:** https://github.com/PerkOS-xyz/perky-news

## Overview

Perky News is a subscription-based newsletter site covering:
- x402 Protocol
- ERC-8004 (Trustless Agents)
- AI Agents & Infrastructure
- OpenClaw Framework
- ElizaOS
- DeFi + AI (DeFAI)

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Payments | x402 via Stack facilitator |
| Database | Supabase (planned) |
| Email | Resend (planned) |
| Deployment | Vercel |

## Features

### Phase 1 - MVP ✅
- [x] Landing page with newsletter subscription
- [x] Email capture form (free tier)
- [x] Premium subscription via x402 ($1/mo)
- [x] Blog/articles listing page
- [x] Individual article pages
- [x] Categories/tags for topics
- [x] Basic SEO (meta tags)
- [x] Dark mode
- [x] Mobile responsive

### Phase 2 - In Progress
- [ ] Supabase database integration
- [ ] Subscriber persistence
- [ ] Email newsletter sending (Resend)
- [ ] MDX article support
- [ ] RSS feed
- [ ] Admin dashboard
- [ ] Analytics

### Phase 3 - Planned
- [ ] Author profiles
- [ ] Comments/reactions
- [ ] Subscription NFT (Contracts/)
- [ ] API for programmatic access

## Design Guidelines

- **Brand:** PerkOS ecosystem (Perky 🐧 mascot)
- **Colors:** Purple primary (#8B5CF6), dark theme
- **Tone:** Professional but approachable, technical but accessible
- **Audience:** Developers, builders, crypto-native users

## Pages Structure

```
/                     → Landing + subscription CTA
/articles             → Blog listing (filterable by category)
/articles/[slug]      → Individual article
/subscribe            → Free + Premium subscription
/about                → About Perky News + team
```

## Data Models

### Article
```typescript
interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: 'x402' | 'erc-8004' | 'ai-agents' | 'openclaw' | 'eliza' | 'defi' | 'general';
  tags: string[];
  author: string;
  publishedAt: Date;
  updatedAt: Date;
  featured: boolean;
}
```

### Subscriber
```typescript
interface Subscriber {
  id: string;
  email: string;
  name?: string;
  subscribedAt: Date;
  confirmed: boolean;
  premium: boolean;
  premiumExpiresAt?: Date;
  preferences: string[];
}
```

## Content Strategy

Topics to cover:
1. "What is x402? The HTTP Payment Protocol Explained"
2. "ERC-8004: Identity and Trust for AI Agents"
3. "The Agent Protocol Stack: A2A + MCP + x402"
4. "Getting Started with OpenClaw"
5. "ElizaOS: Building Crypto-Native AI Agents"

## Success Metrics

- Subscribers count (free + premium)
- Premium conversion rate
- Email open rate
- Article views
- Time on site

---

*Created: 2026-01-30*  
*Last Updated: 2026-01-30*
