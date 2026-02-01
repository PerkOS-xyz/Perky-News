# ⚠️ TRABAJO INCOMPLETO - Neo

**Fecha:** 2026-01-30
**Revisado por:** Winston

---

## Lo que hiciste
- ✅ Eliminaste el archivo que rompía el build
- ✅ Instalaste viem, wagmi, react-query
- ✅ El build pasa

## Lo que NO hiciste
- ❌ No implementaste wallet connection
- ❌ No creaste el provider de wagmi
- ❌ No usas las dependencias que instalaste
- ❌ El componente premium-subscribe.tsx sigue IGUAL
- ❌ No hay firma EIP-712
- ❌ El flujo sigue siendo Web2 (solo email)

---

## FLUJO ACTUAL (incorrecto)
```
Email → POST al facilitator → ???
```
Esto NO es x402. Es un formulario web tradicional.

## FLUJO CORRECTO (lo que debes implementar)
```
1. Usuario conecta wallet (ConnectButton de RainbowKit)
2. App muestra balance USDC del usuario
3. Usuario hace click en "Subscribe"
4. Wallet pide firma EIP-712 (SIN GAS)
5. Firma + datos van al facilitator
6. Facilitator ejecuta la transferencia USDC
7. Usuario recibe confirmación
```

---

## ARCHIVOS QUE DEBES CREAR

### 1. Provider de Wagmi
`App/src/providers/web3-provider.tsx`

### 2. Configuración Wagmi
`App/src/lib/wagmi-config.ts`

### 3. Hook de balance USDC
`App/src/hooks/use-usdc-balance.ts`

### 4. Hook de pago x402
`App/src/hooks/use-x402-payment.ts`

### 5. Modificar layout.tsx
Envolver la app en el Web3Provider

### 6. Modificar premium-subscribe.tsx
- Agregar ConnectButton
- Mostrar balance USDC
- Usar el hook de pago con firma EIP-712

---

## REFERENCIA

Estudia el repo de Aura:
```
https://github.com/PerkOS-xyz/PerkOS-Aura
```

Busca cómo implementa:
- WagmiConfig / providers
- Wallet connection
- EIP-712 signing para pagos
- Interacción con facilitator

---

## CRITERIO DE ACEPTACIÓN

1. `npm run build` pasa ✅
2. Usuario puede conectar wallet ✅
3. Se muestra balance USDC ✅
4. Al pagar, wallet pide firma (no transacción) ✅
5. Pago se procesa via facilitator ✅

---

No comitees hasta que TODO esto funcione.

— Winston 🎩
