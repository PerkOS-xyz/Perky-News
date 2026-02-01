# Content Review Process - Perky News

## 🚨 MANDATORY: No article goes live without passing validation

### Pre-Publication Checklist

Every article MUST pass these checks before publishing:

1. **Automated Validation** (`validate-article.mjs`)
   - No placeholder patterns (e.g., "over .", "the to get")
   - No empty bullet points
   - No [TODO], [TBD], [insert] markers
   - Minimum content length (500 chars)
   - At least one heading

2. **Source Verification**
   - All statistics must have a source
   - All claims must be verifiable
   - Links must work (not 404)

3. **Content Completeness**
   - No sentences ending with "." after numbers
   - No "Check out the to..." (missing link text)
   - No empty list items
   - All sections have content

---

## Scripts

### 1. Validate Content (ALWAYS run first)
```bash
node scripts/validate-article.mjs article.md
# OR
node scripts/validate-article.mjs '{"content": "..."}'
```

### 2. Create Article (with validation)
```bash
# Safe creation - validates BEFORE publishing
node scripts/create-article-safe.mjs article.json

# Force publish with warnings (NOT errors)
node scripts/create-article-safe.mjs article.json --force
```

### 3. Update Existing Article
```bash
node scripts/update-article.mjs <slug> '{"content": "new content"}'
```

---

## Common LLM Placeholder Patterns to Check

| Pattern | Example | Fix |
|---------|---------|-----|
| Empty stat | "processed over ." | Add the number: "processed over 100M." |
| Missing link | "Check out the to get started" | Add link text: "Check out the [docs](url) to get started" |
| Empty bullets | "- \n- \n- " | Add content or remove |
| Placeholders | "[TODO]", "[TBD]", "[insert X]" | Replace with actual content |
| Double period | "end of sentence. ." | Remove extra period |

---

## Workflow

```
┌─────────────────┐
│  Generate/Write │
│    Article      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Validate      │◄──── FAIL? Fix and retry
│  (mandatory)    │
└────────┬────────┘
         │ PASS
         ▼
┌─────────────────┐
│  Human Review   │◄──── Optional but recommended
│  (recommended)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Publish      │
│  (create-safe)  │
└─────────────────┘
```

---

## For AI-Generated Content

When using LLMs to generate articles:

1. **Provide specific data** - Don't let LLM guess statistics
2. **Include sources** - Give URLs for facts to cite
3. **Review output** - Always run through validator
4. **Check links** - Verify all URLs work

### Bad Prompt:
> "Write about x402 V2"

### Good Prompt:
> "Write about x402 V2. Key facts:
> - Launched May 2025
> - Processed 100M+ payments (source: x402.org)
> - Supports Base, Solana, Polygon
> - New features: wallet identity, API discovery
> - x402 Foundation announced with Coinbase & Cloudflare
> Include these sources: [list URLs]"

---

## Emergency: Published Bad Content?

```bash
# 1. Unpublish immediately
node scripts/update-article.mjs <slug> '{"status": "draft"}'

# 2. Fix content
# Edit the content...

# 3. Validate
node scripts/validate-article.mjs fixed-content.md

# 4. Republish
node scripts/update-article.mjs <slug> '{"content": "...", "status": "published"}'
```

---

*Last updated: 2026-02-01*
