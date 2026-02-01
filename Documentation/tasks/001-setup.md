# Task 001: Project Setup

**Status:** ✅ Done  
**Phase:** 1 - MVP  
**Date:** 2026-01-30

## Objective

Initialize the Perky News project with Next.js, Tailwind CSS, and shadcn/ui.

## Requirements

- [x] Create GitHub repository (PerkOS-xyz/perky-news)
- [x] Initialize Next.js 16 with App Router
- [x] Configure Tailwind CSS v4
- [x] Setup shadcn/ui components
- [x] Configure TypeScript
- [x] Setup ESLint

## Implementation

### Commands Run

```bash
# Create Next.js app
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-git

# Install shadcn dependencies
npm install clsx tailwind-merge class-variance-authority lucide-react @radix-ui/react-slot @radix-ui/react-label @hookform/resolvers react-hook-form zod

# Create shadcn config
# components.json created manually
```

### Files Created

- `package.json` - Dependencies
- `tsconfig.json` - TypeScript config
- `tailwind.config.ts` - Tailwind config
- `next.config.ts` - Next.js config
- `src/lib/utils.ts` - Utility functions
- `src/components/ui/` - shadcn components

## Verification

```bash
npm run build  # ✅ Builds successfully
npm run dev    # ✅ Dev server starts
```

## Notes

- Used Tailwind CSS v4 with new `@theme` syntax
- Dark mode enabled by default
- Purple primary color for PerkOS branding
