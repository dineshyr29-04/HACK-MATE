# Vite + React (TypeScript) Starter Guide

## 1. Fast Creation
```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev
```

## 2. Essential Configuration
Add these to your `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A",
        accent: "#3B82F6",
      },
    },
  },
  plugins: [],
}
```

## 3. Recommended Project Layout
```text
/src
  /components  (UI Library)
  /hooks       (State Management)
  /services    (API Calls)
  /App.tsx     (Main Component)
```

---
*Tip: Use Vite for ultra-fast builds. Your HMR (Hot Module Replacement) will save minutes every hour.*
