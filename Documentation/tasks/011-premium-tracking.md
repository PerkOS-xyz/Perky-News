# Task 011: Premium Status Tracking

**Status:** 🔲 Todo  
**Phase:** 2 - Database & Email  
**Date:** TBD  
**Depends on:** Task 009, Task 010

## Objective

Track premium subscription status after x402 payment.

## Requirements

- [ ] Update subscriber to premium on payment
- [ ] Store transaction ID
- [ ] Set expiration date (30 days)
- [ ] Handle renewal flow

## Implementation

### API Route

```typescript
// src/app/api/premium/route.ts
export async function POST(request: Request) {
  const { email, transactionId } = await request.json();
  
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);
  
  const { data, error } = await supabase
    .from('subscribers')
    .upsert({
      email,
      premium: true,
      premium_expires_at: expiresAt.toISOString(),
      premium_transaction_id: transactionId,
    })
    .select()
    .single();
    
  return Response.json({ subscriber: data });
}
```

### Update Premium Component

```typescript
const handleSubscribe = async () => {
  const payment = await subscribePremium(email);
  if (payment.success) {
    await fetch('/api/premium', {
      method: 'POST',
      body: JSON.stringify({ 
        email, 
        transactionId: payment.transactionId 
      }),
    });
  }
};
```

## Verification

- [ ] Premium status saved to DB
- [ ] Expiration date set correctly
- [ ] Transaction ID stored
- [ ] Works for new and existing subscribers
