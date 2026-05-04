# GitHub Project Setup for Hackathons

## 1. Zero-Friction Structure
```text
my-project/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   └── deploy.yml
│   └── PULL_REQUEST_TEMPLATE.md
│
├── docs/
│   ├── architecture.md
│   ├── api.md
│   └── setup.md
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── fonts/
│   │   └── icons/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Button.test.js
│   │   │   │   └── Button.module.css
│   │   │   └── Input/
│   │   │       ├── Input.jsx
│   │   │       ├── Input.test.js
│   │   │       └── Input.module.css
│   │   └── layout/
│   │       ├── Header/
│   │       ├── Footer/
│   │       └── Sidebar/
│   │
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── index.jsx
│   │   │   └── Home.module.css
│   │   ├── About/
│   │   └── Dashboard/
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useFetch.js
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── auth.service.js
│   │   └── user.service.js
│   │
│   ├── store/
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   └── userSlice.js
│   │   └── index.js
│   │
│   ├── utils/
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   └── validators.js
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── mixins.css
│   │
│   ├── types/
│   │   └── index.d.ts
│   │
│   ├── config/
│   │   └── index.js
│   │
│   └── App.jsx
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── scripts/
│   ├── build.sh
│   └── deploy.sh
│
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── robots.txt
│
├── .env
├── .env.example
├── .gitignore
├── .eslintrc.js
├── .prettierrc
├── jest.config.js
├── package.json
├── README.md
└── tsconfig.json
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
