# GitHub Project Setup for Hackathons

## 1. Zero-Friction Structure
```text
/public       (Images, Icons, Fonts)
/src/app      (Layouts, Pages)
/src/components (Reusable UI)
/src/lib      (AI, DB, Auth Helpers)
/src/types    (Type Definitions)
/scripts      (Seed scripts, Migration)
.env.example  (List of ALL required keys)
README.md     (Professional Documentation)
```

## 2. Professional Commits
- `feat: add core ai engine`
- `fix: resolve auth redirect loop`
- `style: premium mobile hero section`
- `docs: update setup guide in readme`

## 3. Deployment Flow (Vercel/Netlify)
- Link your GitHub repo to Vercel for auto-deployment on push.
- Set up **Preview Deployments** for every pull request to test live changes.
- Ensure all environment variables are added to the Vercel Dashboard.

---
*Tip: Always keep a clean `main` branch. Work on a `dev` branch if you're feeling adventurous.*
