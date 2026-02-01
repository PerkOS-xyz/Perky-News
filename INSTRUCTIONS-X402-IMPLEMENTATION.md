# Instrucciones Detalladas: Implementación x402 para Perky News

## 📚 REPO DE REFERENCIA
```
/root/neo/x402-reference/
```
Este es el repo de Self-x402 de Julio. Es el **standard** para PerkOS Stack.
**ESTÚDIALO ANTES DE ESCRIBIR CÓDIGO.**

---

## 🎯 OBJETIVO FINAL

Cuando un usuario quiera suscribirse a Premium:
1. Conecta su wallet (MetaMask, Coinbase Wallet, Rainbow, etc.)
2. Ve su balance USDC en la red seleccionada
3. Hace click en "Subscribe $1/mo"
4. Firma un mensaje EIP-712 (SIN GAS - solo firma)
5. La firma va al facilitator que ejecuta el pago
6. Usuario recibe confirmación

---

## 📁 ARCHIVOS CLAVE A ESTUDIAR

### 1. Configuración Wagmi
```
/root/neo/x402-reference/Selfx402Pay/lib/wagmi.ts
```
```typescript
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { celo } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Self x402 Pay',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [celo],
  ssr: true,
});
```

### 2. EIP-712 Signing
```
/root/neo/x402-reference/Selfx402Framework/src/deferred/signing.ts
```

Estructura del voucher que firma el usuario:
```typescript
export const voucherTypes = {
  PaymentVoucher: [
    { name: "payer", type: "address" },
    { name: "payee", type: "address" },
    { name: "amount", type: "uint256" },
    { name: "nonce", type: "bytes32" },
    { name: "validUntil", type: "uint256" },
  ],
} as const;
```

### 3. Wallet Client (Backend/Server)
```
/root/neo/x402-reference/Selfx402Framework/src/wallets/wallet-client.ts
```

---

## 🛠️ PASOS DE IMPLEMENTACIÓN

### Paso 1: Instalar dependencias

```bash
cd /root/neo/perky-news/App
npm install @rainbow-me/rainbowkit wagmi viem @tanstack/react-query
```

### Paso 2: Crear configuración Wagmi

Crear: `App/src/lib/wagmi-config.ts`
```typescript
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base, polygon, arbitrum, optimism } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Perky News',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo',
  chains: [base, polygon, arbitrum, optimism],
  ssr: true,
});

// USDC addresses por chain
export const USDC_ADDRESSES: Record<number, `0x${string}`> = {
  8453: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',  // Base
  137: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',   // Polygon
  42161: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8', // Arbitrum
  10: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',    // Optimism
};
```

### Paso 3: Crear Provider

Crear: `App/src/providers/web3-provider.tsx`
```typescript
'use client';

import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '@/lib/wagmi-config';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

### Paso 4: Modificar layout.tsx

Agregar el provider en `App/src/app/layout.tsx`:
```typescript
import { Web3Provider } from '@/providers/web3-provider';

// En el return:
<Web3Provider>
  {children}
</Web3Provider>
```

### Paso 5: Crear hook de balance USDC

Crear: `App/src/hooks/use-usdc-balance.ts`
```typescript
'use client';

import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { USDC_ADDRESSES } from '@/lib/wagmi-config';

const USDC_ABI = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
] as const;

export function useUsdcBalance() {
  const { address, chainId } = useAccount();
  
  const usdcAddress = chainId ? USDC_ADDRESSES[chainId] : undefined;
  
  const { data: balance, isLoading } = useReadContract({
    address: usdcAddress,
    abi: USDC_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!usdcAddress,
    },
  });

  return {
    balance: balance ? formatUnits(balance, 6) : '0',
    isLoading,
    hasEnough: balance ? balance >= BigInt(1_000_000) : false, // 1 USDC
  };
}
```

### Paso 6: Crear hook de pago x402

Crear: `App/src/hooks/use-x402-payment.ts`
```typescript
'use client';

import { useAccount, useSignTypedData, useChainId } from 'wagmi';
import { parseUnits, keccak256, toHex } from 'viem';
import { useState } from 'react';

const FACILITATOR_URL = 'https://stack.perkos.xyz';
const RECIPIENT = '0xc2564e41B7F5Cb66d2d99466450CfebcE9e8228f';

// EIP-712 types for payment voucher
const voucherTypes = {
  PaymentVoucher: [
    { name: 'payer', type: 'address' },
    { name: 'payee', type: 'address' },
    { name: 'amount', type: 'uint256' },
    { name: 'nonce', type: 'bytes32' },
    { name: 'validUntil', type: 'uint256' },
  ],
} as const;

export function useX402Payment() {
  const { address } = useAccount();
  const chainId = useChainId();
  const { signTypedDataAsync } = useSignTypedData();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pay = async (amountUsd: number) => {
    if (!address) {
      setError('Wallet not connected');
      return { success: false };
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Create voucher
      const amount = parseUnits(amountUsd.toString(), 6); // USDC has 6 decimals
      const nonce = keccak256(toHex(Date.now().toString() + Math.random()));
      const validUntil = BigInt(Math.floor(Date.now() / 1000) + 3600); // 1 hour

      const voucher = {
        payer: address,
        payee: RECIPIENT as `0x${string}`,
        amount,
        nonce,
        validUntil,
      };

      // Create domain
      const domain = {
        name: 'PerkOS Payment',
        version: '1',
        chainId,
        verifyingContract: RECIPIENT as `0x${string}`,
      };

      // Sign the voucher (this prompts the user's wallet)
      const signature = await signTypedDataAsync({
        domain,
        types: voucherTypes,
        primaryType: 'PaymentVoucher',
        message: voucher,
      });

      // Send to facilitator
      const response = await fetch(`${FACILITATOR_URL}/api/pay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          voucher,
          signature,
          chainId,
        }),
      });

      if (!response.ok) {
        throw new Error('Payment failed');
      }

      const result = await response.json();
      return { success: true, transactionId: result.transactionId };

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Payment failed';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsProcessing(false);
    }
  };

  return { pay, isProcessing, error };
}
```

### Paso 7: Actualizar PremiumSubscribe component

Reemplazar `App/src/components/premium-subscribe.tsx` con la nueva versión que usa wallet connection:

```typescript
'use client';

import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useUsdcBalance } from '@/hooks/use-usdc-balance';
import { useX402Payment } from '@/hooks/use-x402-payment';

export function PremiumSubscribe() {
  const { isConnected, address } = useAccount();
  const { balance, hasEnough, isLoading: balanceLoading } = useUsdcBalance();
  const { pay, isProcessing, error } = useX402Payment();
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    const result = await pay(1); //  USD
    
    if (result.success) {
      // TODO: Save email + subscription to backend
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-[#EB1B69]/20 to-[#FD8F50]/10 border border-[#EB1B69]/30">
        <span className="text-5xl mb-4 block">🎉</span>
        <h3 className="text-2xl font-bold mb-3 gradient-text">Welcome to Premium!</h3>
        <p className="text-[#a3a3a3]">Check your email for confirmation.</p>
      </div>
    );
  }

  return (
    <div className="relative group h-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#EB1B69] via-[#EF5B57] to-[#FD8F50] rounded-3xl opacity-50 blur-sm" />
      
      <div className="relative h-full p-8 rounded-3xl bg-[#0E0716] border border-transparent">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#EB1B69]/20 to-[#FD8F50]/20 border border-[#EB1B69]/30 flex items-center justify-center text-3xl mx-auto mb-4">
            👑
          </div>
          <h3 className="text-2xl font-bold mb-2 gradient-text">Premium</h3>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-5xl font-bold gradient-text">$1</span>
            <span className="text-[#a3a3a3]">/month</span>
          </div>
        </div>

        {/* Wallet Connection */}
        {!isConnected ? (
          <div className="flex justify-center mb-6">
            <ConnectButton />
          </div>
        ) : (
          <div className="mb-6 p-4 rounded-xl bg-[#1B1833] border border-[#2d2548]">
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#a3a3a3]">USDC Balance:</span>
              <span className="text-white font-mono">
                {balanceLoading ? '...' : `$${parseFloat(balance).toFixed(2)}`}
              </span>
            </div>
            {!hasEnough && !balanceLoading && (
              <p className="text-[#EF5B57] text-xs mt-2">
                Insufficient balance. Need at least $1 USDC.
              </p>
            )}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubscribe} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-5 py-3.5 rounded-xl bg-[#1B1833] border border-[#2d2548] text-white placeholder-[#666] text-sm focus:border-[#EB1B69] focus:outline-none"
          />
          
          {error && <p className="text-[#EF5B57] text-sm text-center">{error}</p>}
          
          <button 
            type="submit" 
            disabled={!isConnected || !hasEnough || isProcessing || !email}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#EB1B69] via-[#EF5B57] to-[#FD8F50] text-white font-semibold hover:shadow-lg hover:shadow-[#EB1B69]/25 disabled:opacity-50 transition-all"
          >
            {isProcessing ? 'Signing Payment...' : 'Subscribe with x402'}
          </button>
          
          <p className="text-xs text-[#666] text-center">
            Powered by <a href="https://x402.org" className="text-[#EB1B69]">x402</a> • Sign once, no gas fees
          </p>
        </form>
      </div>
    </div>
  );
}
```

---

## ✅ CHECKLIST FINAL

- [ ] `npm install` dependencias (rainbowkit, wagmi, viem, react-query)
- [ ] Crear `lib/wagmi-config.ts`
- [ ] Crear `providers/web3-provider.tsx`
- [ ] Modificar `app/layout.tsx` para incluir provider
- [ ] Crear `hooks/use-usdc-balance.ts`
- [ ] Crear `hooks/use-x402-payment.ts`
- [ ] Actualizar `components/premium-subscribe.tsx`
- [ ] Eliminar `lib/x402-payment.ts` (el archivo que rompe el build)
- [ ] `npm run build` debe pasar
- [ ] Probar en localhost conectando wallet

---

## 🔑 VARIABLES DE ENTORNO

Agregar a `.env.local`:
```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=tu_project_id
```

Obtener WalletConnect Project ID gratis en: https://cloud.walletconnect.com/

---

## 📖 DOCUMENTACIÓN ADICIONAL

- RainbowKit: https://rainbowkit.com/docs
- Wagmi: https://wagmi.sh
- Viem: https://viem.sh
- EIP-712: https://eips.ethereum.org/EIPS/eip-712

---

Cualquier duda, pregunta a Winston o a Julio.

— Winston 🎩
