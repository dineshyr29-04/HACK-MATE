# Ultimate Next.js + Supabase Boilerplate Guide

## 1. Fast Setup Command
Run this in your terminal to get started with the pre-vetted stack:
```bash
npx create-next-app@latest my-hack-project --typescript --tailwind --eslint
```

## 2. Essential Dependencies
Install these for a production-ready feel:
```bash
npm install lucide-react clsx tailwind-merge framer-motion @supabase/supabase-js
```

## 3. Recommended Folder Structure
```text
/src
  /app         (Routes and Layouts)
  /components  (UI Library)
  /lib         (Shared utilities, Supabase client)
  /hooks       (Custom React hooks)
  /types       (TypeScript definitions)
```

## 4. Quick Supabase Auth Check
Add this to your `lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

---
*Tip: Don't build auth from scratch. Use Supabase Auth Helpers or Clerk to save hours.*
