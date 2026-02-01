# Task 007: x402 Premium Integration

**Status:** ✅ Done  
**Phase:** 1 - MVP  
**Date:** 2026-01-30

## Objective

Integrate x402 payment protocol for premium subscriptions.

## Requirements

- [x] x402 payment utility library
- [x] Premium subscribe component
- [x] Integration on landing page
- [x] Integration on subscribe page
- [x] Environment variable for wallet

## Implementation

### Payment Library

```typescript
// src/lib/x402.ts
export const X402_CONFIG = {
  facilitator: 'https://stack.perkos.xyz',
  recipient: process.env.NEXT_PUBLIC_X402_WALLET || 'WALLET_TBD',
  currency: 'USD',
};

export async function subscribePremium(email: string): Promise<PaymentResponse>
```

### Component

```typescript
// src/components/premium-subscribe.tsx
<PremiumSubscribe variant="card" />   // Full featured card
<PremiumSubscribe variant="inline" /> // Compact inline
```

### Payment Flow

1. User enters email
2. Click "Subscribe with x402"
3. POST to stack.perkos.xyz/api/pay
4. On success: show confirmation
5. (Future: save to database)

### Environment

```bash
# .env.local
NEXT_PUBLIC_X402_WALLET=0xYourWalletAddress
```

## Verification

- [x] Component renders correctly
- [x] Form validates email
- [x] Loading state shows
- [x] Success state shows
- [x] Error handling works

## Notes

- Wallet address is placeholder (WALLET_TBD)
- Database persistence added in Task 011
- Stack facilitator handles actual payment
