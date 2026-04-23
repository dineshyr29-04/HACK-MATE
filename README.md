# HackMate

HackMate is a hackathon copilot that helps teams move from idea to demo with less context switching.
It combines project planning, stage-based execution, AI-assisted guidance, and real-time collaboration in one React app.

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-7-646cff?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Supabase-Realtime-3fcf8e?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
</p>

## Product Preview

![HackMate Hero](./public/readme/hero.png)

![HackMate Dashboard](./public/readme/dashboard.png)

## Why HackMate

Hackathons are time-constrained and high-pressure. HackMate is designed to reduce friction in the most expensive parts of the process:

- Deciding what to build
- Coordinating team execution
- Maintaining momentum through delivery stages
- Turning technical work into a judge-ready pitch

## Core Features

- Stage-driven workflow from ideation to submission
- Team collaboration with joinable Team ID sharing
- Real-time synchronization (with local fallback)
- AI insights for ideation, architecture, and pitch prep
- Resource vault with templates and boilerplates
- Checklist, assignment, comment, and project-state management

![HackMate Stage View](./public/readme/stage.png)

![HackMate Resources](./public/readme/resources.png)

## Tech Stack

- Frontend: React 19, TypeScript, Vite
- Styling: Tailwind CSS, PostCSS
- State and utilities: local browser storage plus shared sync logic
- Auth and analytics: Firebase Auth and Firebase Analytics
- Realtime and persistence: Supabase
- AI providers: Mistral and Google Gemini

## Project Structure

```text
src/
  components/        UI and stage components
  lib/               Integrations (AI, Firebase, Supabase, store)
  assets/            Static app assets
public/
  readme/            README screenshots
  resources/         Template and guide content shown in-app
```

## Quick Start

### 1. Clone and install

```bash
git clone https://github.com/anandmahadev/HACK-MATE.git
cd HACK-MATE
npm install
```

### 2. Configure environment

Create a `.env` file in the project root.

```env
# Firebase
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=

# Supabase
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# AI Providers (optional but recommended)
VITE_MISTRAL_API_KEY=
VITE_GEMINI_API_KEY=
```

Notes:
- If Supabase keys are missing, app logic falls back to local storage for core flows.
- If AI keys are missing, AI-assisted features are disabled gracefully.

### 3. Run the app

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Type-check and produce production build
- `npm run preview`: Preview the production build locally
- `npm run lint`: Run ESLint checks

## Data and Sync Behavior

- Project and stage state are cached in local storage for fast interactions.
- When Supabase is configured, data is synchronized to shared tables.
- Team collaboration uses project IDs and Team IDs for lightweight sharing.

For schema guidance, see:

- `public/resources/boilerplates/supabase-schema.md`

## Deployment

This repository includes `vercel.json` and is ready for Vercel deployment.

High-level flow:

1. Import repository into Vercel
2. Add all `VITE_*` environment variables in project settings
3. Deploy

## Security

Please review `SECURITY.md` before deploying to production or sharing credentials.

## Contributing

Contributions are welcome and appreciated.

- Read `CONTRIBUTING.md` for setup, branch naming, coding guidelines, and pull request checklist.
- Use issues for bug reports and feature proposals.
- Keep pull requests focused and easy to review.

## Support

- Open an issue for bugs or feature requests
- Include reproduction steps, expected behavior, and screenshots when relevant

## Credits

Built by Anand Mahadev and contributors.
