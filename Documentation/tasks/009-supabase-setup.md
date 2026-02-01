# Task 009: Supabase Setup

**Status:** ✅ Done  
**Phase:** 2 - Database & Email  
**Date:** TBD

## Objective

Set up Supabase project for subscriber data persistence.

## Requirements

- [x] Create Supabase project (schema ready, user creates project)
- [x] Configure environment variables (.env.example updated)
- [x] Create database schema (supabase/schema.sql)
- [x] Setup Row Level Security (included in schema)
- [x] Create API routes (subscribe, confirm, status)
- [x] Update newsletter form to use API
- [ ] Test connection from App (pending Supabase keys)

## Schema

```sql
-- Subscribers table
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  confirmed BOOLEAN DEFAULT FALSE,
  premium BOOLEAN DEFAULT FALSE,
  premium_expires_at TIMESTAMPTZ,
  preferences TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
```

## Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
```

## Dependencies

```bash
npm install @supabase/supabase-js
```

## Notes

- Use service role key only server-side
- Anon key for client-side reads
