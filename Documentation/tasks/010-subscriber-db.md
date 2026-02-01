# Task 010: Subscriber Persistence

**Status:** 🔲 Todo  
**Phase:** 2 - Database & Email  
**Date:** TBD  
**Depends on:** Task 009

## Objective

Persist free newsletter subscribers to Supabase.

## Requirements

- [ ] Create subscriber on form submit
- [ ] Check for duplicate emails
- [ ] Handle errors gracefully
- [ ] Show success/error states

## Implementation

### API Route

```typescript
// src/app/api/subscribe/route.ts
export async function POST(request: Request) {
  const { email, name } = await request.json();
  
  const { data, error } = await supabase
    .from('subscribers')
    .insert({ email, name })
    .select()
    .single();
    
  if (error) {
    if (error.code === '23505') {
      return Response.json({ error: 'Already subscribed' }, { status: 409 });
    }
    return Response.json({ error: error.message }, { status: 500 });
  }
  
  return Response.json({ subscriber: data });
}
```

### Update Newsletter Form

```typescript
const handleSubmit = async (e) => {
  const response = await fetch('/api/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email, name }),
  });
  // Handle response
};
```

## Verification

- [ ] New subscribers saved to DB
- [ ] Duplicate emails rejected
- [ ] Error messages displayed
- [ ] Success confirmation shown
