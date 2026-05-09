# Contributing to the SoIT Website

> **SoIT Student Council · Rajiv Gandhi Proudyogiki Vishwavidyalaya, Bhopal**

Thank you for your interest in contributing. This document covers everything you need to know — branch naming, commit conventions, the PR checklist, and how issues are handled. For a quick visual summary, see [CONTRIBUTING_QUICKSTART.md](./CONTRIBUTING_QUICKSTART.md).

---

## Table of Contents

1. [Before You Start](#1-before-you-start)
2. [Forking & Cloning](#2-forking--cloning)
3. [Branch Naming](#3-branch-naming)
4. [Making Changes](#4-making-changes)
5. [Commit Message Convention](#5-commit-message-convention)
6. [Pull Request Process](#6-pull-request-process)
7. [PR Checklist](#7-pr-checklist)
8. [Reporting Issues & Feature Requests](#8-reporting-issues--feature-requests)
9. [Issue Labels](#9-issue-labels)
10. [What is In-Scope](#10-what-is-in-scope)
11. [Recognition](#11-recognition)

---

## 1. Before You Start

- Read this document and [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) fully.
- Check the [Issues](../../issues) tab to see if your bug or idea has already been reported or discussed.
- For significant features, **open an Issue first** and get a response before writing code — this prevents wasted effort if the Council has a different direction in mind.
- Set up your local environment following the steps in [README.md](./README.md).

---

## 2. Forking & Cloning

```bash
# 1. Click Fork on the repo page, then:
git clone https://github.com/<your-username>/soit-website-public.git
cd soit-website-public

# 2. Add upstream so you can stay in sync
git remote add upstream https://github.com/School-of-IT-RGPV-Bhopal/soit-website-public.git
```

---

## 3. Branch Naming

Always branch off the latest commit of `main`. **Never commit directly to `main`.**

```bash
git checkout main
git pull upstream main
git checkout -b <prefix>/<short-description>
```

Use one of the following prefixes:

| Prefix | Use for |
|---|---|
| `feature/` | New functionality or page section |
| `fix/` | Bug fix — functional or visual |
| `hotfix/` | Critical fix needed on production |
| `docs/` | Documentation or README changes only |
| `style/` | Purely visual / CSS changes, no logic change |
| `chore/` | Dependency updates, config changes |
| `refactor/` | Code restructure with no behaviour change |

**Examples:** `fix/nav-mobile-overflow` · `feature/add-events-page` · `docs/update-setup-steps`

Use lowercase, hyphens only — no spaces, no underscores.

---

## 4. Making Changes

- Follow the existing code style, file structure, and naming conventions.
- Do not introduce new dependencies without prior discussion in an Issue.
- Do not refactor unrelated code in the same PR as a feature or bug fix — keep PRs focused.
- Test your changes locally before pushing (`npm run dev`).
- Run `npm run lint` and fix all errors.

---

## 5. Commit Message Convention

Use conventional commit prefixes for a clean, readable history.

```
<prefix>: short description in present tense, lowercase
```

| Prefix | Use for |
|---|---|
| `feat:` | New feature or functionality |
| `fix:` | Bug fix |
| `docs:` | Documentation changes |
| `style:` | Formatting, spacing, visual-only changes |
| `chore:` | Build process, dependency updates |
| `refactor:` | Code restructure without behaviour change |
| `perf:` | Performance improvements |
| `test:` | Adding or updating tests |

**Examples:**
```
feat: add events carousel to home page
fix: correct overflow on mobile nav menu
docs: update README with environment setup steps
chore: bump eslint to v9
```

---

## 6. Pull Request Process

1. Push your branch to your fork: `git push origin <branch-name>`
2. Go to your fork on GitHub — click **Compare & pull request**.
3. Set the base repository to `School-of-IT-RGPV-Bhopal/soit-website-public` and base branch to `main`.
4. Fill in the PR description using the checklist below.
5. Link any related issue using `Closes #<issue-number>` in the description.
6. Apply the appropriate label(s) from the [Issue Labels](#9-issue-labels) section.
7. **Do not self-assign reviewers.** The Council assigns reviewers internally.
8. Click **Create Pull Request**.

The Council will triage your PR, assign a reviewer, and respond. If your PR has received no response for an extended period, feel free to leave a comment to check in.

---

## 7. PR Checklist

Copy this into your PR description and tick every item before submitting.

```
### General
- [ ] I have read CONTRIBUTING.md and CODE_OF_CONDUCT.md
- [ ] My branch is named using the correct prefix convention
- [ ] My branch is based off the latest commit of main
- [ ] My commits follow the conventional commit format
- [ ] I have tested my changes locally — site runs without errors
- [ ] No console errors or warnings introduced
- [ ] Changes are responsive — tested on mobile, tablet, and desktop
- [ ] No .env files, API keys, or secrets committed
- [ ] Screenshots attached for any visual changes
- [ ] Related issue linked using Closes #<number> (if applicable)
- [ ] Appropriate label(s) applied
- [ ] npm run lint passes

### Bug Fix PRs (additional)
- [ ] Root cause described in PR description
- [ ] Steps to reproduce included before the fix
- [ ] Bug confirmed resolved after changes

### Feature PRs (additional)
- [ ] Feature was discussed / approved in an Issue before implementation
- [ ] No existing functionality broken
- [ ] Documentation or comments updated where relevant
```

---

## 8. Reporting Issues & Feature Requests

Go to **[Issues → New Issue](../../issues/new/choose)** and select the appropriate template.

### Bug Report — required fields
- Steps to reproduce (numbered, precise)
- Expected behaviour
- Actual behaviour
- Screenshots or screen recording (if visual)
- Browser name and version
- Operating system
- Device type (desktop / mobile / tablet)

### Feature Request — required fields
- Problem statement: what is currently missing or frustrating?
- Proposed solution: describe your idea clearly
- Alternatives considered
- Mockup or reference screenshots (optional but encouraged)

Incomplete reports may be closed without review.

---

## 9. Issue Labels

| Label | Use for |
|---|---|
| `bug` | Something is not working correctly |
| `enhancement` | New feature or improvement request |
| `good first issue` | Suitable for first-time contributors |
| `help wanted` | Extra attention or expertise needed |
| `documentation` | Improvements or additions to docs |
| `design` | UI / UX / visual design related |
| `performance` | Speed, Lighthouse score, optimisation |
| `accessibility` | A11y / WCAG compliance issues |
| `duplicate` | This issue or PR already exists |
| `invalid` | Incorrect or unclear report |
| `wontfix` | Council has decided not to address this |
| `in review` | Under active council review |
| `needs info` | More information required from the author |

---

## 10. What is In-Scope

**Accepted contributions:**
- Bug fixes — functional, visual, accessibility, or performance
- Feature additions approved via an open Issue
- Content corrections — accurate SoIT / council / events information
- Accessibility improvements (WCAG 2.1 AA)
- Performance optimisations (image compression, lazy loading, code splitting)
- Documentation improvements

**Out of scope:**
- Changes to deployment configuration or CI/CD pipelines
- Alterations to council governance content without explicit council approval
- Unsolicited full redesigns of core branding or layout
- Anything that introduces a security vulnerability

---

## 11. Recognition

| Tier | Contribution Type | Reward |
|---|---|---|
| 🥇 Major | New feature, significant UI overhaul, critical bug fix | Credits page feature + college-issued certificate |
| 🥈 Moderate | Moderate bug fix, content update, accessibility improvement | Credits page mention |
| 🥉 Minor | Typo fix, minor styling, small UX tweak | PR merged acknowledgment in README |

Certificates are issued by the SoIT Student Council and dispatched within 30 days of a major contribution being merged.

---

> Questions not answered here? Open an Issue with the `needs info` label or contact the Council via the email in README.md.
