# GitHub Actions Workflows Summary

## 📋 Complete File Structure

```
.github/
├── workflows/
│   ├── pr-validation.yml        # ✅ PR content & commit validation
│   ├── auto-labeler.yml         # 🏷️  Automatic PR labeling
│   ├── security-scan.yml        # 🔒 Security & vulnerability scanning
│   ├── auto-assign.yml          # 👥 Auto-assign reviewers
│   ├── welcome.yml              # 👋 Welcome & community engagement
│   └── pr-status-checks.yml     # 📊 PR status monitoring
├── CODEOWNERS                   # 👥 Define code ownership
├── pull_request_template.md     # 📝 PR template
└── GITHUB_ACTIONS_SETUP.md      # 📖 This documentation

Root:
├── commitlint.config.js         # 📋 Conventional commits config
└── .husky/
    └── commit-msg               # 🪝 Husky pre-commit hook
```

---

## 🎯 Workflow Comparison Table

| Workflow | Trigger | When | Auto-Close PR? | Sends Comment? |
|----------|---------|------|----------------|----------------|
| **pr-validation.yml** | PR opened/edited | Content validation | ✅ Yes (if fails) | ✅ Yes |
| **auto-labeler.yml** | PR opened/synced | Label assignment | ❌ No | ❌ No |
| **security-scan.yml** | PR opened/push | Security checks | ❌ No (warns) | ✅ Yes |
| **auto-assign.yml** | PR opened/synced | Reviewer assignment | ❌ No | ✅ Yes |
| **welcome.yml** | PR/Issue opened | Welcome message | ❌ No | ✅ Yes |
| **pr-status-checks.yml** | PR opened/synced | Status monitoring | ❌ No | ✅ Yes |

---

## 📊 Validation Rules

### Image Requirement
```javascript
// PR must include markdown image format
const imageRegex = /!\[.*?\]\(.*?\)/;
if (!imageRegex.test(body)) {
  // FAIL: Missing Image
}
```

**Fix:** Add image to PR description
```markdown
![Screenshot of the feature](https://link-to-image.com/screenshot.png)
```

### Issue Linking Requirement
```javascript
// PR must reference an issue
const issueRegex = /(close[sd]?|fix(e[sd])?|resolve[sd]?|relates to|ref)\s+#\d+/i;
if (!issueRegex.test(body)) {
  // FAIL: Missing Issue Link
}
```

**Fix:** Link issue in PR description
```markdown
Closes #123
Fixes #456
Relates to #789
```

### Description Quality
```javascript
// PR description must be meaningful (minimum 20 characters)
const descriptionLength = body.trim().length;
if (descriptionLength < 20) {
  // FAIL: Too short
}
```

**Fix:** Write a clear description
```markdown
## Description
This PR implements the user authentication system using OAuth2 integration.
It allows users to sign up, log in, and reset passwords securely.
```

### Conventional Commits
```javascript
// Commit messages must follow conventional format
const conventionalRegex = /^(feat|fix|docs|style|refactor|perf|test|chore|ci|revert)(\(.+\))?!?:\s.+/;
```

**Valid Examples:**
- `feat: add user authentication`
- `fix(auth): resolve login timeout bug`
- `docs: update API documentation`
- `refactor(ui): simplify button component`

---

## 🏷️ Automatic Labels

### Label Categories

**By Type:**
- 🟢 `enhancement` - New features
- 🔴 `bug` - Bug fixes
- 📚 `documentation` - Docs
- 🎨 `refactor` - Code refactoring
- ⚡ `performance` - Performance improvements
- 🧪 `testing` - Test additions
- 🔒 `security` - Security updates

**By Scope:**
- 🎨 `frontend` - UI/UX changes
- ⚙️ `backend` - API/server changes
- 🔧 `ci/cd` - CI/CD configuration
- ⚙️ `configuration` - Config files

**By Size:**
- 🟦 `size/XS` - <100 lines
- 🟩 `size/S` - 100-300 lines
- 🟨 `size/M` - 300-1000 lines
- 🟥 `size/L` - 1000-3000 lines
- 🔴 `size/XL` - >3000 lines

**Special:**
- 🟡 `WIP` - Work in Progress
- 💥 `breaking-change` - Breaking API change
- 🌟 `good-first-issue` - First-time contributor
- 🆘 `help-wanted` - Community help needed

---

## 🔒 Security Scans

### Tools Used

| Tool | Purpose | Action |
|------|---------|--------|
| **CodeQL** | Code vulnerability detection | Reports in Security tab |
| **TruffleHog** | Secret detection | Fails if secrets found |
| **Trivy** | Filesystem vulnerabilities | Reports findings |
| **npm audit** | Dependency vulnerabilities | Warns/fails on critical |
| **Snyk** | Dependency scanning (optional) | Blocks on high severity |
| **Bandit** | Python security | Warns if enabled |
| **Semgrep** | Static analysis | Reports in Security tab |

### Security Check Levels

```yaml
# Trivy severity levels
severity: 'CRITICAL,HIGH'

# npm audit levels
npm audit --audit-level=moderate
  # Options: low, moderate, high, critical

# Snyk severity
--severity-threshold=high
```

---

## 👥 Code Ownership & Reviewers

### File: `.github/CODEOWNERS`

```
# Format: <path> <owner1> <owner2>
*                       @owner1 @owner2
src/components/**       @frontend-owner
api/**                  @backend-owner
*.md                    @doc-owner
.github/**              @owner1
```

### Auto-Assignment Logic

1. PR opened → workflow analyzes changed files
2. Matches file patterns to code owners
3. Sends review request to owners
4. Limits to 5 reviewers max
5. Excludes PR author

### Customization

**In `auto-assign.yml`:**
```yaml
const ownershipMap = {
  'frontend': ['@user1', '@user2'],
  'backend': ['@user3', '@user4'],
  'docs': ['@user1'],
  'security': ['@user5'],
  'infrastructure': ['@user4', '@user5']
};
```

---

## 🚀 How Contributors Use This

### Step 1: Create PR
```bash
git checkout -b feat/my-feature
# Make changes
git add .
git commit -m "feat: add new feature"
git push origin feat/my-feature
```

### Step 2: Create PR on GitHub
- Use the PR template
- Add required image
- Reference issue: "Closes #123"

### Step 3: Automation Runs
✅ PR validated
✅ Labels auto-assigned
✅ Reviewers auto-assigned
✅ Security checks run
✅ Welcome comment posted
✅ Status checks monitored

### Step 4: Resolve Feedback
- Address reviewer comments
- Make requested changes
- Push new commits

### Step 5: Merge
- All checks pass ✅
- At least 1 approval ✅
- No conflicts ✅
- Ready to merge!

---

## 🔧 Local Setup for Contributors

### Install Husky & Commitlint

```bash
# Install dependencies
npm install --save-dev husky @commitlint/cli @commitlint/config-conventional

# Initialize husky
npx husky install

# Add commit-msg hook
npx husky add .husky/commit-msg 'npx --no commitlint --edit "$1"'
```

### Test Locally

```bash
# Test commit message format
echo "feat: test commit" | npx commitlint

# Should output: ✔ passed
```

---

## 📞 Customization Checklist

- [ ] Replace `@github-handle-X` with real usernames in workflows
- [ ] Update `.github/CODEOWNERS` with team structure
- [ ] Adjust file change thresholds (default: 50 files)
- [ ] Modify image requirement (or remove if not needed)
- [ ] Configure branch protection rules
- [ ] Add optional secrets (SNYK_TOKEN)
- [ ] Customize label names if desired
- [ ] Update welcome messages with your project info
- [ ] Review security scan sensitivity levels
- [ ] Add any project-specific validation rules

---

## 📈 Monitoring

### Where to Check Status

1. **Actions Tab** → See workflow runs
2. **Security Tab** → View security findings
3. **Pull Requests** → See labels, assignments, comments
4. **Issues** → View issue tracking
5. **Projects** → Manage with GitHub Projects

### Key Metrics

- ✅ PR approval time
- 🔴 Failed security scans
- ⏱️ Average merge time
- 📊 Labels distribution
- 👥 Reviewer assignment success

---

## 💡 Tips & Tricks

### Disable Workflow Temporarily
```yaml
on:
  pull_request:
    branches: [main]
  
  # Comment out to disable
  # types: [opened, edited, synchronize]
```

### Skip Workflow on Commit
```bash
git commit -m "docs: update readme" --no-verify
# Bypasses husky pre-commit hooks
```

### Manual Workflow Run
In GitHub Actions tab → Select workflow → "Run workflow" button

### Add Custom Labels
1. Repository → Labels
2. Click "New label"
3. Add label name, color, description

### View Detailed Logs
1. Actions → Select workflow run
2. Click job name
3. Expand step to see full output

---

## 🚨 Common Issues & Fixes

### "PR doesn't meet requirements"

**Problem:** Validation fails
**Solution:** 
- Add image: `![alt](url)`
- Link issue: `Closes #123`
- Extend description

### "No reviewers assigned"

**Problem:** Auto-assign not working
**Solution:**
- Check GitHub handles in workflow
- Verify file path patterns match
- Ensure users have repo access

### "Secret detected in PR"

**Problem:** TruffleHog found credentials
**Solution:**
- Remove secret from code
- Use environment variables instead
- Rotate the exposed secret

### "CodeQL failing"

**Problem:** Code analysis error
**Solution:**
- Check repo language support
- Ensure dependencies installed
- Review CodeQL logs in Actions

---

## ✨ Benefits Summary

✅ **Quality Enforcement**
- Required images for clarity
- Issue linking for tracking
- Conventional commits for history

✅ **Security**
- Automatic vulnerability scanning
- Secret detection
- Code analysis

✅ **Collaboration**
- Auto-assignment for faster reviews
- Welcome messages for new contributors
- Stale management for clean repo

✅ **Automation**
- Labels auto-assigned
- Status checks tracked
- No manual work needed

✅ **Best Practices**
- Conventional commits
- Code ownership tracking
- Breaking change awareness

---

## 📚 Resources

- 📖 [GitHub Actions Docs](https://docs.github.com/en/actions)
- 🔗 [Conventional Commits](https://www.conventionalcommits.org/)
- 🛡️ [GitHub Security](https://github.com/security)
- 📋 [CodeQL Docs](https://codeql.github.com/)

---

**Status:** ✅ Ready for Production
**Last Updated:** 2024
**Maintainer:** [Your Team]
