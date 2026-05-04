# Security Policy

## Credentials Management

*   **Environment Variables**: All sensitive keys (API Keys, Secrets, Connection Strings) must be stored in `.env` files and never committed to version control.
*   **Git Ignore**: The `.gitignore` file must always include `.env`, `.env.local`, and related files.
*   **Client-Side Exposure**: Avoid exposing secret keys in the client-side code whenever possible. For services like Firebase or Supabase that require public-facing keys, ensure proper domain restriction and security rules in their respective dashboards.

## Overview

HackMate takes security seriously. This document outlines how to report vulnerabilities, best practices for using the platform, and guidelines for maintaining a secure deployment.

## Reporting a Vulnerability

If you discover a security vulnerability, please do not open a public issue.

Instead:
📧 Email:anandgowda82961@gmail.com


📝 Include:
Description of the vulnerability
Steps to reproduce
Potential impact
Screenshots or proof-of-concept (if applicable)

You can expect:
✅ Acknowledgment within 48 hours
🔍 Investigation and resolution updates
🙏 Credit (optional) if responsibly disclosed

🔑 Environment Variables & Secrets
Never commit sensitive credentials to the repository.
Required Security Practices:


Store all secrets in .env files
Use .env.example for reference (no real values)
Add .env to .gitignore
Sensitive Keys Used:
Firebase API keys

Supabase anon/public keys
AI provider API keys (Mistral, Gemini)

⚠️ Even “public” keys (like Firebase/Supabase anon keys) should be handled carefully and restricted via rules.

🔐 Authentication & Access Control

Firebase Authentication is used for user identity

Ensure:
Proper auth rules are configured
Unauthorized users cannot access protected data

Recommendations:
Use role-based access control (RBAC) if extended
Validate all user actions server-side (via Supabase policies)

🗄️ Database Security (Supabase)
When using Supabase:
Enable Row Level Security (RLS)
Write strict policies for:
Read access
Write access
Team-based data isolation

Example Concern:
Avoid allowing unrestricted access like:
true
Instead, enforce:
auth.uid() = user_id

## API & Network Security
Use HTTPS in production (Vercel handles this by default)
Never expose private APIs in frontend code
Validate and sanitize all inputs

## AI Integration Safety
When using AI providers:

Do not send:
Sensitive user data
Credentials or tokens

Implement:
Input validation
Output sanitization

## Client-Side Storage Risks
HackMate uses local storage as fallback:
Risks:
Data can be modified by users
Not secure for sensitive information

Recommendation:
Treat local storage as non-trusted
Always validate data when syncing to backend

🚀 Deployment Security Checklist
Before deploying:
 All environment variables configured securely
 .env not committed
 Supabase RLS enabled
 Firebase rules properly set
 API keys restricted (domain/IP if possible)
 No sensitive logs in production
 HTTPS enabled
 
## Dependency Security
Use:
npm audit
Fix vulnerabilities:
npm audit fix

## Known Limitations
Local storage fallback is not secure for sensitive data
AI responses may require validation before use
Misconfigured Supabase policies can expose data

## Responsible Disclosure
We appreciate responsible disclosure of security issues.
Please allow time for fixes before making vulnerabilities public.
