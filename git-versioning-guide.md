# SoIT RGPV Website: Versioning & Branching Guide

This document outlines the standard procedure for transitioning between major versions (e.g., v1 to v2) of the SoIT Official Website. We use the **Orphan-Base Strategy** to ensure that new major versions have a clean, performant history while preserving the full development legacy of previous versions.

---

## 1. Preserving Legacy History
Before starting a new version, the current state of the project must be "frozen" into a dedicated version branch.

```bash
# Ensure you are on the current development branch (e.g., preview)
git checkout preview

# Create a permanent legacy branch for the current version
# Replace 'v1' with the version you are concluding
git branch v1
```


## 2. Starting a New Major Version (The Clean Slate)
To prevent the repository from becoming bloated, we start the new version as an Orphan Branch. This creates a new "Root" commit.

### A. Create the Orphan Base
```bash
# Create an orphaned branch from the end of the previous version
git checkout --orphan v[X]-base v[X-1]

# Stage files and create the milestone commit
git add .
git commit -m "v[X-1] completed and v[X] started"
```

### B. Re-applying Active Development
If you already started working on the new version and need to bring those feature commits onto the clean base:

```bash
# Use cherry-pick to bring specific feature commits onto the new base
git cherry-pick <commit-hash-1>
git cherry-pick <commit-hash-2>
```

## 3. Synchronizing the Preview Branch
The preview branch should always reflect the current active development version.

```bash
# Point 'preview' to the new clean history
git checkout preview
git reset --hard v[X]-base
```

# Cleanup temporary base branch
git branch -D v[X]-base

## 4. Pushing to GitHub (Origin)
Since the history of the preview branch has been rewritten, a standard push will be rejected. You must force-update the remote.

```bash
# 1. Push the newly created legacy branch
git push origin v[X-1]

# 2. Force-push the new preview history
git push origin preview --force
```

## 5. Team Synchronization
When a major version reset occurs, other contributors (Raghav, Tech-VP, etc.) must reset their local preview branches to match the new root:

```bash
git fetch --all
git checkout preview
git reset --hard origin/preview
```

# Note: Always ensure the main branch is synced using git pull --rebase before pushing to avoid "non-fast-forward" errors.

## Maintained by the SoIT Student Council Technical Team.