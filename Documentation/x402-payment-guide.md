# x402 Payment Integration Guide

## Overview

Perky News uses the x402 protocol via PerkOS Stack for $1/month subscriptions.

**Facilitator:** https://stack.perkos.xyz
**Receiver Wallet:** 0xc2564e41B7F5Cb66d2d99466450CfebcE9e8228f

## Payment Flow

1. User connects wallet (Base, Polygon, Arbitrum, Optimism)
2. User clicks "Subscribe Premium" ($1/month)
3. App creates EIP-712 payment authorization
4. User signs with wallet (no gas required for signing)
5. Signature sent to Stack facilitator for verification
6. Stack settles payment and returns transaction hash
7. User marked as premium subscriber

## Tech Stack

- **EIP-3009:** TransferWithAuthorization for gasless USDC transfers
- **EIP-712:** Typed data signing for security
- **Multi-chain:** Base, Polygon, Arbitrum, Optimism

## Implementation Files

- `lib/x402-payment.ts` - Payment utilities
- `app/api/subscribe/premium/route.ts` - Backend verification
- `components/premium-subscribe.tsx` - Frontend form

## Key Functions

### Create Payment Authorization
```typescript
import {
  generateNonce,
  createEIP712Domain,
  parsePriceToUSDC,
  getValidBefore,
  getValidAfter,
  TRANSFER_WITH_AUTHORIZATION_TYPES,
  PAYMENT_RECEIVER,
} from '@/lib/x402-payment';

const authorization = {
  from: userAddress,
  to: PAYMENT_RECEIVER,
  value: parsePriceToUSDC(1.00), // $1
  validAfter: getValidAfter(),
  validBefore: getValidBefore(),
  nonce: generateNonce(),
};

const domain = createEIP712Domain('base');

// Sign with wallet
const signature = await walletClient.signTypedData({
  account: userAddress,
  domain,
  types: TRANSFER_WITH_AUTHORIZATION_TYPES,
  primaryType: "TransferWithAuthorization",
  message: authorization,
});
```

### Verify Payment
```typescript
import { formatPaymentPayload, verifyPaymentWithStack } from '@/lib/x402-payment';

const envelope = {
  network: 'base',
  authorization: {
    from: authorization.from,
    to: authorization.to,
    value: authorization.value.toString(),
    nonce: authorization.nonce,
    validAfter: authorization.validAfter.toString(),
    validBefore: authorization.validBefore.toString(),
  },
  signature,
};

const result = await verifyPaymentWithStack(
  formatPaymentPayload(envelope),
  userAddress
);

if (result.success) {
  // Mark user as premium
  // result.transactionHash contains the tx hash
}
```

## Reference

Full implementation in PerkOS Stack repo:
- https://github.com/PerkOS-xyz/Stack
- See `StackApp/app/(wallet)/subscription/pay/page.tsx`
- See `StackApp/lib/utils/x402-payment.ts`
