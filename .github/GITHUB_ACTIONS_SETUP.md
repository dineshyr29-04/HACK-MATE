# GitHub Actions Setup Documentation

This document explains the complete GitHub Actions workflow setup for production-ready open-source contribution management.

## 📋 Overview

This repository uses automated GitHub Actions workflows to enforce contribution quality, security, and automation. **Everything works automatically without owner intervention.**

### Workflows Included

1. **PR Validation** (`pr-validation.yml`)
2. **Automated Labeling** (`auto-labeler.yml`)
3. **Security Scanning** (`security-scan.yml`)
4. **Auto-Assignment** (`auto-assign.yml`)
5. **Welcome & Community** (`welcome.yml`)
6. **PR Status Checks** (`pr-status-checks.yml`)

---

## 🔐 PR Validation Workflow

**File:** `.github/workflows/pr-validation.yml`

### What It Does

Validates all pull requests to ensure they meet contribution standards:

✅ **Image Check**: PR must include at least one markdown image
✅ **Issue Linking**: PR must reference an issue (Closes #123)
✅ **Description Quality**: PR description must be meaningful (20+ characters)
✅ **Commit Message Format**: Checks for conventional commit format
✅ **File Change Analysis**: Warns if too many files are changed

### Triggers

- When a PR is opened
- When a PR is edited
- When new commits are pushed to a PR

### Example Result

```markdown
## PR Validation Results

✅ **All checks passed!** Your PR meets all requirements.
```

Or if requirements aren't met:

```markdown
## PR Validation Results

### 🔴 Required Changes
❌ **Missing Image**: PR must include at least one image in markdown format: `![alt text](image-url)`
❌ **Missing Issue Link**: PR must reference an issue using: `Closes #123`, `Fixes #456`, or `Relates to #789`

### 🟡 Suggestions
⚠️ **Short Title**: Consider using a more descriptive title (at least 10 characters)
```

### Configuration

Edit the validation rules in the `validate-pr-content` job:

```yaml
# Minimum description length
const descriptionLength = body.trim().length;
if (descriptionLength < 20) {  # Change 20 to desired length
  errors.push("Description too short");
}

# Maximum files threshold
const fileThreshold = 50; # Change 50 to desired threshold
```

---

## 🏷️ Automated Labeling Workflow

**File:** `.github/workflows/auto-labeler.yml`

### What It Does

Automatically assigns labels to PRs based on:

| Label | Trigger |
|-------|---------|
| `enhancement` | Title: "feat", "feature", "add" |
| `bug` | Title: "fix", "bug", "issue" |
| `documentation` | Title: "doc", "readme", "guide" |
| `refactor` | Title: "refactor", "cleanup", "style" |
| `performance` | Title: "perf", "performance", "optimize" |
| `testing` | Title: "test", "spec" |
| `security` | Title: "security", "auth", "vulnerability" |
| `breaking-change` | Description: "breaking change" |
| `WIP` | Description: "wip", "work in progress" |
| `frontend` | Files: `src/components/`, `src/pages/`, etc |
| `backend` | Files: `api/`, `server/`, `functions/`, etc |
| `ci/cd` | Files: `.github/` |
| `size/XS` | <100 lines changed |
| `size/S` | 100-300 lines |
| `size/M` | 300-1000 lines |
| `size/L` | 1000-3000 lines |
| `size/XL` | >3000 lines |

### Customize Labels

Edit the labeling logic in `auto-labeler.yml`:

```yaml
# Add custom label
if (title.includes("your-keyword")) {
  labels.add("your-label");
}
```

---

## 🔒 Security Scanning Workflow

**File:** `.github/workflows/security-scan.yml`

### What It Does

Runs comprehensive security checks on every PR:

✅ **CodeQL Analysis**: Detects code vulnerabilities and patterns
✅ **Dependency Scanning**: Checks npm/yarn dependencies for vulnerabilities
✅ **Secret Detection**: Uses TruffleHog to find exposed secrets
✅ **Trivy Scanning**: Filesystem vulnerability scanning
✅ **Bandit**: Python security checker
✅ **Snyk**: Integrated dependency scanning (optional)
✅ **Semgrep**: Static analysis for security issues

### Setup

**For Snyk (Optional):**
1. Sign up at https://snyk.io
2. Add `SNYK_TOKEN` secret to GitHub repository
3. Uncomment the Snyk job in the workflow

**GitHub Secrets:**
Go to Repository → Settings → Secrets and variables → Actions

```
SNYK_TOKEN=<your-snyk-token>  # Optional
```

### Results

Security findings appear in:
- GitHub Security tab (SARIF uploads)
- Pull Request comments
- GitHub Issues (for blocking vulnerabilities)

---

## 👥 Auto-Assignment Workflow

**File:** `.github/workflows/auto-assign.yml`

### What It Does

✅ Automatically assigns reviewers based on changed files
✅ Labels first-time contributors as "good-first-issue"
✅ Posts helpful guidance comments
✅ Prevents self-assignment

### Customize Reviewers

Edit the `ownershipMap` in the workflow:

```yaml
const ownershipMap = {
  'frontend': ['@github-handle-1', '@github-handle-2'],
  'backend': ['@github-handle-3', '@github-handle-4'],
  'docs': ['@github-handle-1'],
  'security': ['@github-handle-5'],
  'infrastructure': ['@github-handle-4', '@github-handle-5']
};
```

Replace `@github-handle-X` with actual GitHub usernames.

### Alternative: Use CODEOWNERS

File: `.github/CODEOWNERS`

```
# Frontend
src/components/** @frontend-owner @owner1
src/pages/** @frontend-owner

# Backend
api/** @backend-owner
server/** @backend-owner

# Documentation
*.md @doc-owner
README.md @owner1 @owner2
```

---

## 👋 Welcome Workflow

**File:** `.github/workflows/welcome.yml`

### What It Does

✅ Welcomes first-time PR contributors
✅ Welcomes first-time issue reporters
✅ Provides onboarding guidance
✅ Auto-labels good-first-issues
✅ Manages stale issues/PRs

### First-Time Contributor Welcome

```markdown
🎉 Welcome @username!

Thank you for your first pull request! Here's a quick checklist...
```

### First-Time Issue Reporter Welcome

```markdown
👋 Hi @username!

Thanks for reporting this issue! We appreciate your feedback.

To help us investigate faster:
- Provide a clear description...
```

### Stale Management

- Issues inactive for 30 days → marked "stale"
- PRs inactive for 14 days → marked "stale"
- Marked items closed after 7 more days (unless exempted)

**Exempt Labels:**
- `pinned`
- `blocked`
- `help-wanted`
- `in-progress`

---

## 📊 PR Status Checks Workflow

**File:** `.github/workflows/pr-status-checks.yml`

### What It Does

✅ Monitors all status checks
✅ Validates review requirements
✅ Posts merge guidelines comment
✅ Tracks approval status

### Requirements Before Merge

- All status checks must pass
- At least one approval from code owner
- All conversations resolved
- No conflicts with base branch
- Clean commit history

---

## 📝 Pull Request Template

**File:** `.github/pull_request_template.md`

Provides guided PR template with:
- Description section
- Issue linking (required)
- Type of change checkboxes
- Screenshot requirements (for UI)
- Testing checklist
- Security considerations
- Deployment notes

---

## 🛠️ Configuration Files

### Commit Linting

**File:** `commitlint.config.js`

Enforces Conventional Commits format:

```
feat: add new feature
fix: fix bug
docs: update documentation
```

**Setup:**
```bash
npm install --save-dev husky @commitlint/cli @commitlint/config-conventional
npx husky install
npx husky add .husky/commit-msg 'npx --no commitlint --edit "$1"'
```

### CODEOWNERS

**File:** `.github/CODEOWNERS`

Defines automatic reviewer assignments by file patterns:

```
# Auto-assign these owners to PRs affecting these files
src/components/** @frontend-owner
api/** @backend-owner
*.md @doc-owner
```

---

## 🚀 Getting Started

### 1. Review Current Workflows

All workflows are in `.github/workflows/`:

```
.github/workflows/
├── pr-validation.yml        # PR content validation
├── auto-labeler.yml         # Automatic labeling
├── security-scan.yml        # Security scanning
├── auto-assign.yml          # Reviewer assignment
├── welcome.yml              # Community engagement
└── pr-status-checks.yml     # Status monitoring
```

### 2. Customize for Your Project

1. **Update PR Template** (`.github/pull_request_template.md`)
   - Modify requirements as needed
   - Add project-specific guidelines

2. **Update CODEOWNERS** (`.github/CODEOWNERS`)
   - Replace placeholder GitHub handles
   - Add your team structure

3. **Configure Auto-Assignment** (`auto-assign.yml`)
   - Update `ownershipMap` with real team members
   - Or use CODEOWNERS instead

4. **Adjust Security Scans** (`security-scan.yml`)
   - Add/remove security tools as needed
   - Configure sensitivity levels

### 3. Set Up Branch Protection Rules

GitHub Settings → Branches → Branch Protection Rules

For `main` branch:
- ✅ Require pull request reviews before merging
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date
- ✅ Include administrators

---

## 🔑 Required Secrets & Permissions

### GitHub Permissions

Workflows need these permissions (configured in YAML):

```yaml
permissions:
  contents: read
  pull-requests: write
  issues: write
  security-events: write
  checks: read
```

### Optional Secrets

```
SNYK_TOKEN          # For Snyk security scanning
GITHUB_TOKEN        # Auto-provided by GitHub Actions
```

---

## 📈 Monitoring & Analytics

### View Workflow Runs

1. Repository → Actions tab
2. Select workflow to see:
   - Run history
   - Job logs
   - Status for each PR

### PR Analytics

1. Repository → Insights → Pulse
2. View:
   - PRs opened/closed
   - Issues created/resolved
   - Contributors

### Security Findings

1. Repository → Security → Code scanning
2. View:
   - Vulnerabilities detected
   - Secret alerts
   - CodeQL findings

---

## 🔧 Troubleshooting

### Workflow Not Running

**Check:**
1. Workflow file syntax (use `.github/workflows/` folder)
2. Trigger conditions (on: pull_request, etc.)
3. File permissions (readable by GitHub Actions)

### PR Validation Failing

**Fix:**
1. Add required image: `![alt](url)`
2. Link issue: `Closes #123`
3. Extend description (20+ characters)
4. Use conventional commit format

### Auto-Assignment Not Working

**Fix:**
1. Verify GitHub handles in CODEOWNERS or workflow
2. Check user permissions
3. Ensure paths match changed files

### Security Scan Errors

**Fix:**
1. Check CodeQL language support
2. Verify npm dependencies are installed
3. Ensure build succeeds locally first

---

## 📚 Best Practices

✅ **Do:**
- Keep workflows focused on one task
- Use clear trigger conditions
- Test workflow locally with act
- Monitor workflow runs regularly
- Document custom rules
- Review security findings promptly

❌ **Don't:**
- Store secrets in YAML files
- Use overly strict auto-close rules
- Ignore security warnings
- Let stale issues accumulate
- Remove required status checks

---

## 🤝 Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

## 📞 Support

- 📖 [GitHub Actions Documentation](https://docs.github.com/en/actions)
- 💬 [GitHub Discussions](../../discussions)
- 🐛 [Report Issues](../../issues)

---

**Last Updated:** 2024
**Maintainers:** @your-team-handles
