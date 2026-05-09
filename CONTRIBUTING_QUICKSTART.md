# SoIT Website — Contribution Quickstart

> **SoIT Student Council · Rajiv Gandhi Proudyogiki Vishwavidyalaya, Bhopal**  
> Public Repo: `github.com/School-of-IT-RGPV-Bhopal/soit-website-public`

---

## 1 · Go to the Repo

Open **[github.com/School-of-IT-RGPV-Bhopal/soit-website-public](https://github.com/School-of-IT-RGPV-Bhopal/soit-website-public)**  
Read `README.md` and `CONTRIBUTING.md` before you begin.

---

## 2 · Fork & Clone

```bash
# After clicking Fork on GitHub:
git clone https://github.com/<your-username>/soit-website-public.git
cd soit-website-public
git remote add upstream https://github.com/School-of-IT-RGPV-Bhopal/soit-website-public.git
```

---

## 3 · Create a Branch

Always branch off the latest `main`. Never commit directly to `main`.

```bash
git checkout main
git pull upstream main
git checkout -b <prefix>/<short-description>
```

| Prefix | Use for |
|---|---|
| `feature/` | New functionality |
| `fix/` | Bug fix |
| `hotfix/` | Critical production fix |
| `docs/` | Documentation only |
| `style/` | Visual / CSS only |
| `chore/` | Config, dependency updates |
| `refactor/` | Code restructure, no behaviour change |

**Example:** `fix/nav-mobile-overflow` · `feature/add-events-page`

---

## 4 · Make Changes & Commit

```bash
git add .
git commit -m "feat: describe what you did"
git push origin <branch-name>
```

**Commit prefix convention:** `feat:` `fix:` `docs:` `style:` `chore:` `refactor:`

**Before committing, confirm:**
- [ ] Site runs locally without errors (`npm run dev`)
- [ ] No console errors introduced
- [ ] Responsive on mobile + desktop
- [ ] No `.env` files or secrets committed
- [ ] `npm run lint` passes

---

## 5 · Open a Pull Request

1. Go to your fork on GitHub → click **Compare & pull request**
2. Set base: `School-of-IT-RGPV-Bhopal/soit-website-public` → `main`
3. Fill in the PR template — include screenshots for visual changes
4. Link related issue: add `Closes #<number>` in the description
5. Apply a label (see below) · **do not self-assign reviewers**
6. Click **Create Pull Request**

---

## 6 · Report a Bug or Feature Request

Go to **Issues → New Issue** and select a template.

| Label | Use for |
|---|---|
| `bug` | Something is broken |
| `enhancement` | New feature idea |
| `good first issue` | Easy entry-level task |
| `help wanted` | Needs extra expertise |
| `documentation` | Docs / README changes |
| `design` | UI / UX related |
| `accessibility` | A11y / WCAG issues |
| `needs info` | More detail required |

**Bug reports must include:** steps to reproduce · expected vs actual behaviour · screenshots · browser & OS.

---

## Recognition

| Contribution | Reward |
|---|---|
| Major feature / critical fix | Credits page + college-issued certificate |
| Moderate bug fix / improvement | Credits page mention |
| Minor fix / typo | PR merged acknowledgment in README |

---

> Questions? Open an Issue with `needs info` or contact the Council via the email in the README.  
> All contributors must follow the **Code of Conduct** — see `CODE_OF_CONDUCT.md`.
