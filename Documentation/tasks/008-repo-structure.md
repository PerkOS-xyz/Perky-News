# Task 008: Repository Structure

**Status:** ✅ Done  
**Phase:** 1 - MVP  
**Date:** 2026-01-30

## Objective

Reorganize repository for multi-package structure (App + Contracts).

## Requirements

- [x] Move Next.js app to App/
- [x] Create Contracts/ placeholder
- [x] Create Documentation/ directory
- [x] Update README files
- [x] Configure gitignore files

## Implementation

### New Structure

```
perky-news/
├── App/                    # Next.js application
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── .env.example
│   ├── .gitignore
│   └── README.md
├── Contracts/              # Smart contracts (future)
│   ├── .gitignore
│   └── README.md
├── Documentation/          # Specs & tasks
│   ├── SPEC.md
│   ├── TASKS.md
│   └── tasks/
├── README.md               # Project overview
└── .gitignore              # Root gitignore
```

### Git Commands

```bash
# Move files
mv src public package.json ... App/

# Create directories
mkdir -p Contracts Documentation/tasks

# Update remotes and push
git add -A
git commit -m "refactor: reorganize repo structure"
git push origin main
```

## Verification

- [x] App builds from new location
- [x] All files tracked correctly
- [x] GitHub shows correct structure
- [x] README links work

## Notes

- Contracts/ is placeholder for Phase 4
- Documentation/ contains all specs and tasks
- Each directory has its own .gitignore
