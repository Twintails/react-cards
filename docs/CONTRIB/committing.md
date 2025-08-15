# **Commitizen Workflow Cheat Sheet**

## **Quick Start**

Instead of using `git commit`, use:
```bash
npm run commit
```

This will launch the interactive Commitizen prompt for standardized commits.

## **Commit Types**

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat: add user authentication system` |
| `fix` | Bug fix | `fix: resolve login validation issue` |
| `docs` | Documentation changes | `docs: update API documentation` |
| `style` | Code style changes (formatting, etc.) | `style: format code with prettier` |
| `refactor` | Code refactoring | `refactor: simplify authentication logic` |
| `test` | Adding or updating tests | `test: add unit tests for user service` |
| `chore` | Build process or auxiliary tool changes | `chore: update dependencies` |
| `perf` | Performance improvements | `perf: optimize database queries` |
| `ci` | CI/CD changes | `ci: add GitHub Actions workflow` |
| `build` | Build system changes | `build: update webpack configuration` |
| `revert` | Revert previous commit | `revert: undo last feature addition` |

## **Commit Structure**

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### **Examples**

**Simple commit:**
```
feat: add user registration form
```

**With scope:**
```
feat(auth): add OAuth2 authentication
```

**With body:**
```
feat: add dark mode support

- Add theme toggle component
- Implement CSS variables for theming
- Update all components to use theme variables

Closes #123
```

**Breaking change:**
```
feat!: change authentication API

BREAKING CHANGE: The login endpoint now requires a different payload structure.
```

## **Git Aliases**

Use these aliases for efficient workflow:

```bash
# Create new task branch
git cob <branch-name>
# Example: git cob add-typescript-support

# Switch to task branch
git sw <branch-name>
# Example: git sw add-typescript-support
```

## **Workflow Steps**

1. **Create feature branch:**
   ```bash
   git cob feature-name
   ```

2. **Make changes and stage files:**
   ```bash
   git add .
   ```

3. **Commit with Commitizen:**
   ```bash
   npm run commit
   ```

4. **Push changes:**
   ```bash
   git push origin task-feature-name
   ```

## **Best Practices**

- **Use descriptive commit messages** that explain what and why, not how
- **Keep commits atomic** - one logical change per commit
- **Use appropriate type** for the change being made
- **Include scope** when the change affects a specific part of the codebase
- **Reference issues** in commit body when applicable
- **Use breaking change syntax** when introducing breaking changes

## **Common Workflows**

### **Feature Development**
```bash
git cob new-feature
# Make changes
git add .
npm run commit  # Choose 'feat' type
git push origin task-new-feature
```

### **Bug Fix**
```bash
git cob fix-bug-description
# Fix the bug
git add .
npm run commit  # Choose 'fix' type
git push origin task-fix-bug-description
```

### **Documentation Update**
```bash
git cob update-docs
# Update documentation
git add .
npm run commit  # Choose 'docs' type
git push origin task-update-docs
```

## **Troubleshooting**

**If Commitizen fails to install:**
- Ensure Node.js version is compatible (>=18 recommended)
- Try installing globally: `npm install -g commitizen`

**If commit fails:**
- Check that all required fields are filled
- Ensure commit message follows conventional format

**If git aliases don't work:**
- Check local git config: `git config --list --local`
- Verify aliases are properly configured
