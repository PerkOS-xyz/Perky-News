# Perky News - Briefing Completo para Neo

## 📋 Resumen del Proyecto

**Perky News** es una plataforma de noticias Web3 con suscripción premium via x402.

| Item | Valor |
|------|-------|
| **Repo** | https://github.com/PerkOS-xyz/perky-news |
| **Live URL** | https://perky-news.netlify.app |
| **Stack** | Next.js 16 + Tailwind + shadcn/ui |
| **Network** | Base (Chain ID: 8453) |
| **Payment** | x402 Protocol - $1 USDC/month |

---

## 🏗️ Estructura del Proyecto

```
perky-news/
├── App/                    # Next.js application
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # React components
│   │   └── lib/           # Utilities
│   ├── public/            # Static assets
│   └── package.json
├── Contracts/             # Smart contracts (futuro)
└── Documentation/
    ├── SPEC.md            # Especificación completa
    ├── TASKS.md           # Lista de tareas
    └── x402-payment-guide.md
```

---

## 🎨 Brand Colors (PerkOS)

```css
/* Usar estos colores SIEMPRE */
--pink-primary: #EB1B69;
--coral: #EF5B57;
--orange: #FD8F50;
--peach: #FAB46C;
--dark-bg: #0E0716;
--dark-card: #1B1833;
```

---

## 💳 x402 Payment - IMPORTANTE

El pago NO es un simple POST con email. Es firma criptográfica:

### Flujo Correcto:
```
1. Usuario conecta wallet (wagmi/Privy)
2. Usuario ve balance USDC
3. Usuario firma voucher EIP-712
4. Facilitator ejecuta el pago
5. Usuario obtiene acceso premium
```

### Referencia de Implementación:
- **Repo:** https://github.com/PerkOS-xyz/PerkOS-Aura
- **Stack:** https://stack.perkos.xyz
- **Facilitator:** El servidor que ejecuta los pagos

### Wallet del Proyecto:
```
0xc2564e41B7F5Cb66d2d99466450CfebcE9e8228f
```

---

## 🚀 Deploy en Netlify

### ⚠️ NO HAY AUTO-DEPLOY

El deploy es **MANUAL**. No está conectado a GitHub.

### Proceso de Deploy:

```bash
# 1. Entrar al directorio de la app
cd /root/neo/perky-news/App

# 2. Build (DEBE pasar sin errores)
npm run build

# 3. Si el build falla, NO intentes deploy. Arregla primero.

# 4. Deploy a producción
npx netlify deploy --prod
```

### Credenciales (ya en tu .bashrc):
```bash
# Site ID
NETLIFY_SITE_ID=557a30eb-22a4-4385-9458-6c7a744caceb

# Token de auth
NETLIFY_AUTH_TOKEN=nfp_gxJMVtmRBedPTStPELRZBqHi44BEmbthf167
```

### Verificar Deploy:
Después de cada deploy, verificar en: https://perky-news.netlify.app

---

## 🔧 Dependencias Críticas

Asegúrate de tener instaladas:
```bash
npm install viem wagmi @tanstack/react-query
```

Sin estas, el build FALLARÁ.

---

## ❌ Errores Comunes

1. **Build falla por `viem` no instalado**
   ```bash
   npm install viem
   ```

2. **Deploy pide autorización browser**
   - El token ya está en .bashrc
   - Si sigue pidiendo, ejecuta: `source ~/.bashrc`

3. **Archivos duplicados rompen build**
   - No crear archivos con nombres similares
   - Si hay error de módulo duplicado, buscar y eliminar

---

## 📝 Tu Tarea Actual

Lee el archivo `/root/neo/perky-news/FEEDBACK-FROM-WINSTON.md` que contiene:
- Evaluación del código actual
- Problemas identificados
- Instrucciones paso a paso para corregir

---

## 🆘 Si Necesitas Ayuda

1. Lee SPEC.md para entender el producto
2. Lee x402-payment-guide.md para entender pagos
3. Mira PerkOS-Aura como referencia de implementación
4. Pregunta a Winston (yo) si algo no está claro

---

*Última actualización: 2026-01-31*

---

## 🔗 GitHub - IMPORTANTE

**SÍ HAY un repositorio de GitHub:**
- **Repo:** https://github.com/PerkOS-xyz/perky-news
- **Clonado en:** /root/neo/perky-news

### Workflow correcto:

```bash
# 1. Antes de trabajar, pull cambios
cd /root/neo/perky-news
git pull origin main

# 2. Haz tus cambios...

# 3. Commit y push
git add .
git commit -m "descripcion del cambio"
git push origin main

# 4. Deploy manual a Netlify (separado de git)
cd App
npm run build
npx netlify deploy --prod
```

### Aclaración:
- El repo de GitHub **SÍ existe** y debes usarlo
- Lo que NO está conectado es el auto-deploy de Netlify
- Siempre: git push → luego → netlify deploy manual
