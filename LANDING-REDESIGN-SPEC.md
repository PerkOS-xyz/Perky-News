# Perky News Landing Page Redesign

## 🎯 OBJETIVO
Transformar la landing page de Perky News para que se vea como un **sitio de noticias profesional** (estilo GeekWire), NO como una landing page de producto.

## ❌ LO QUE NO QUEREMOS
- Hero section grande con texto marketing
- Secciones "Features" o "How it works"
- Call-to-actions prominentes tipo SaaS
- Diseño de landing page de startup

## ✅ LO QUE SÍ QUEREMOS
Un sitio de NOTICIAS donde el contenido es lo primero.

---

## 📐 ESTRUCTURA DEL LAYOUT

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER                                                     │
│  [🤖 Perky Logo]     News | Premium | About        [Login]  │
├─────────────────────────────────────────────────────────────┤
│  CATEGORY BAR                                               │
│  AI Agents | Web3 | DeFi | NFTs | Tech | Startups | More    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────┐  ┌──────────────────┐ │
│  │                                 │  │                  │ │
│  │      FEATURED ARTICLE           │  │   SIDEBAR        │ │
│  │      [Large Image]              │  │                  │ │
│  │                                 │  │   Most Popular   │ │
│  │      Title of Main Story        │  │   ─────────────  │ │
│  │      Short excerpt...           │  │   • Article 1    │ │
│  │                                 │  │   • Article 2    │ │
│  └─────────────────────────────────┘  │   • Article 3    │ │
│                                       │   • Article 4    │ │
│  LATEST NEWS                          │   • Article 5    │ │
│  ─────────────────────────────────    │                  │ │
│  ┌─────┐ Title of Article             │   ────────────── │ │
│  │ IMG │ Short excerpt text...        │                  │ │
│  └─────┘ Category • 2h ago            │   Newsletter     │ │
│                                       │   [Email input]  │ │
│  ┌─────┐ Title of Article             │   [Subscribe]    │ │
│  │ IMG │ Short excerpt text...        │                  │ │
│  └─────┘ Category • 5h ago            │   ────────────── │ │
│                                       │                  │ │
│  ┌─────┐ Title of Article             │   Perky mascot   │ │
│  │ IMG │ Short excerpt text...        │   small image    │ │
│  └─────┘ Category • 1d ago            │                  │ │
│                                       └──────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧩 COMPONENTES NECESARIOS

### 1. Header (Compacto)
- Logo de Perky (pequeño, esquina izquierda)
- Navegación: News | Premium | About
- Botón Login (esquina derecha)
- **NO** hero, **NO** tagline grande

### 2. Category Bar
- Barra horizontal con categorías
- Categorías: AI Agents, Web3, DeFi, NFTs, Tech, Startups
- Clickeable para filtrar

### 3. Featured Article (Principal)
- Imagen grande (16:9 o similar)
- Título grande debajo
- Excerpt de 2-3 líneas
- Categoría + fecha

### 4. Latest News (Lista de artículos)
- Thumbnail pequeño a la izquierda (100x80px aprox)
- Título a la derecha
- Excerpt corto
- Categoría + tiempo relativo ("2h ago")

### 5. Sidebar
- **Most Popular:** Lista de 5-8 artículos (solo títulos)
- **Newsletter:** Input de email + botón Subscribe
- **Perky mascot:** Imagen pequeña del avatar (branding sutil)

---

## 🎨 ESTILO VISUAL

### Colores (mantener PerkOS)
- Primary: #EB1B69 (Pink)
- Background: #0E0716 (Dark) o blanco para news
- Cards: #1B1833 o blanco
- Text: Alto contraste

### Tipografía
- Títulos: Bold, grande
- Body: Legible, buen line-height
- Links: Color primary al hover

### Espaciado
- Grid de 12 columnas
- Main content: 8 columnas
- Sidebar: 4 columnas
- Gaps consistentes

---

## 📁 ARCHIVOS A MODIFICAR

```
App/src/app/page.tsx          ← Landing principal (REHACER)
App/src/components/
  ├── Header.tsx              ← Header compacto
  ├── CategoryBar.tsx         ← Barra de categorías (NUEVO)
  ├── FeaturedArticle.tsx     ← Artículo destacado (NUEVO)
  ├── ArticleCard.tsx         ← Card para lista (NUEVO)
  ├── Sidebar.tsx             ← Sidebar con popular + newsletter (NUEVO)
  └── NewsletterWidget.tsx    ← Widget de suscripción (NUEVO)
```

---

## 📝 DATOS DE EJEMPLO

Usa estos artículos de ejemplo mientras no haya backend:

```typescript
const mockArticles = [
  {
    id: 1,
    title: "ERC-8004: The New Standard for AI Agent Identity",
    excerpt: "A deep dive into how ERC-8004 is revolutionizing on-chain agent verification...",
    image: "/placeholder-1.jpg",
    category: "AI Agents",
    date: "2h ago",
    featured: true
  },
  {
    id: 2,
    title: "x402 Protocol Enables Micropayments for AI Services",
    excerpt: "Coinbase's new payment protocol is changing how agents transact...",
    image: "/placeholder-2.jpg",
    category: "Web3",
    date: "5h ago"
  },
  // ... más artículos
];
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

1. [ ] Eliminar hero section actual
2. [ ] Crear Header compacto con navegación
3. [ ] Agregar CategoryBar debajo del header
4. [ ] Crear componente FeaturedArticle
5. [ ] Crear componente ArticleCard para lista
6. [ ] Implementar layout de 2 columnas (main + sidebar)
7. [ ] Crear Sidebar con Most Popular
8. [ ] Agregar widget de Newsletter en sidebar
9. [ ] Incluir Perky mascot de forma sutil (sidebar o footer)
10. [ ] Verificar responsive (mobile-first)

---

## 🚫 ERRORES COMUNES A EVITAR

1. **NO** dejes el hero section - ELIMÍNALO
2. **NO** pongas "Welcome to Perky News" grande
3. **NO** uses layout de landing page de producto
4. **SÍ** prioriza el contenido (artículos)
5. **SÍ** mantén a Perky pero de forma sutil

---

## 🖼️ REFERENCIA VISUAL

Inspírate en: **GeekWire.com**
- Header limpio
- Categorías visibles
- Artículo featured grande
- Lista de noticias con thumbnails
- Sidebar con popular + newsletter

---

*Especificación creada por Winston - 2026-01-31*
