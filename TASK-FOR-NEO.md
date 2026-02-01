# Task Briefing for Neo

## Project: Perky News
**Repo:** /root/neo/perky-news
**GitHub:** https://github.com/PerkOS-xyz/perky-news

## What Winston Already Did

1. **Created project structure:**
   - App/ - Next.js 16 app
   - Contracts/ - For future smart contracts
   - Documentation/ - Specs and tasks

2. **Built MVP pages:**
   - Landing page with hero, newsletter signup
   - Articles listing with category filters
   - Individual article pages
   - Subscribe page with pricing

3. **Redesigned with PerkOS brand:**
   - Dark mode default (#0E0716 background)
   - Pink→Orange gradient CTAs (#EB1B69 → #FD8F50)
   - Typography: Sora + Outfit fonts
   - Added Perky mascot and PerkOS logo

4. **Added x402 payment foundation:**
   - lib/x402-payment.ts - Payment utilities
   - Documentation/x402-payment-guide.md - Implementation guide
   - Wallet: 0xc2564e41B7F5Cb66d2d99466450CfebcE9e8228f

## YOUR TASK: Implement Premium Subscription

### Goal
Add working $1/month premium subscription using x402 protocol via Stack facilitator.

### Files to Create/Modify

1. **components/premium-subscribe.tsx** - Payment component with:
   - Wallet connection (wagmi/viem)
   - Network selector (Base, Polygon, Arbitrum, Optimism)
   - USDC balance display
   - EIP-712 signature flow
   - Payment verification

2. **app/api/subscribe/premium/route.ts** - Backend to:
   - Verify payment with Stack facilitator
   - Mark user as premium subscriber

3. **Modify app/subscribe/page.tsx** - Add PremiumSubscribe component

### Reference Code
Study these files:
- lib/x402-payment.ts (already created)
- Documentation/x402-payment-guide.md
- /root/neo/x402-payment-guide.md (copy)

### Stack Facilitator
- URL: https://stack.perkos.xyz
- Use the pattern from PerkOS Stack repo

### Brand Guidelines
Read: /root/neo/.claude/skills/frontend-design.md

### Quality Checklist
- [ ] Uses brand colors (#EB1B69, #FD8F50, etc.)
- [ ] Professional UI (no AI slop)
- [ ] Mobile responsive
- [ ] Build passes (npm run build)
- [ ] Tested locally before push

### Git Workflow
```bash
cd /root/neo/perky-news
# Make changes
npm run build  # Test build
git add -A
git commit -m "feat: description"
git push
```

### Deploy
After push, Winston will deploy to Netlify.

---
Start by reading the documentation, then implement step by step.
Good luck! 🚀
