# Task 004: Individual Article Page

**Status:** ✅ Done  
**Phase:** 1 - MVP  
**Date:** 2026-01-30

## Objective

Create the individual article page with full content display.

## Requirements

- [x] Dynamic route [slug]
- [x] Article header with metadata
- [x] Content rendering
- [x] Tags display
- [x] Newsletter CTA
- [x] Back navigation
- [x] SEO metadata

## Implementation

### Route

`/articles/[slug]` → `src/app/articles/[slug]/page.tsx`

### Features

- Breadcrumb navigation
- Category badge
- Author with avatar
- Publication date
- Cover image placeholder
- Markdown-like content formatting
- Tag pills
- Newsletter signup CTA

### Static Generation

```typescript
export async function generateStaticParams() {
  const articles = getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}
```

### Content Formatting

Simple regex-based markdown conversion:
- Headers (h1, h2, h3)
- Bold, italic
- Code blocks
- Links
- Lists

## Verification

- [x] All articles accessible via slug
- [x] Content renders correctly
- [x] Metadata in head
- [x] Mobile responsive
- [x] 404 for invalid slugs

## Notes

- Future: Replace with proper MDX support
- Prose styling via Tailwind typography classes
