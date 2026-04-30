# Contributing to HackMate

Thank you for investing your time in HackMate.
This guide explains how to contribute changes that are easy to review and safe to ship.

## Code of Conduct

Be respectful, constructive, and collaborative in all interactions.

## Before You Start

1. Search existing issues and pull requests to avoid duplicate work.
2. For significant changes, open an issue first to discuss approach and scope.
3. Keep each pull request focused on one concern.

## Development Setup

1. Fork the repository and clone your fork.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the repository root and configure required keys.
4. Start the development server:

```bash
npm run dev
```

## Branch Naming

Use descriptive branch names:

- `feat/<short-description>`
- `fix/<short-description>`
- `docs/<short-description>`
- `refactor/<short-description>`

Examples:

- `feat/team-presence-sync`
- `fix/mobile-stage-overflow`
- `docs/readme-env-clarification`

## Commit Messages

Use clear, imperative commit messages.

Good examples:

- `Add Supabase retry handling for project sync`
- `Fix stage assignment state merge bug`
- `Improve README environment setup section`

## Coding Guidelines

- Use TypeScript types for public data contracts.
- Prefer small, composable React components.
- Preserve existing project structure and naming conventions.
- Do not commit secrets or `.env` files.
- Keep comments concise and only where logic is non-obvious.

## Local Quality Checks

Run these before opening a pull request:

```bash
npm run lint
npm run build
```

If your change affects UI behavior, include screenshots or a short screen recording in the PR.

## Pull Request Checklist

- [ ] Branch is up to date with latest target branch
- [ ] Change is scoped and self-contained
- [ ] Lint and build pass locally
- [ ] Screenshots included for UI changes
- [ ] Documentation updated (README, comments, or guides)
- [ ] No secrets, credentials, or sensitive data committed

## How to Submit

1. Push your branch to your fork.
2. Open a pull request against the main repository.
3. Fill in:
- Problem being solved
- Approach taken
- Validation performed
- Risks or trade-offs

## Reporting Bugs

When creating a bug report, include:

- Environment details (OS, browser, node version)
- Steps to reproduce
- Actual result
- Expected result
- Console errors and screenshots

## Feature Requests

For feature requests, include:

- User problem
- Proposed solution
- Alternatives considered
- Success criteria

## Security Issues

Do not open public issues for sensitive vulnerabilities.
Follow the process in `SECURITY.md`.
