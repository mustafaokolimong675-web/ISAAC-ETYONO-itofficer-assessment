# Git & GitHub Mastery Guide for IT Officers

This guide covers everything you need to know about Version Control for your technical assessment. Git is the tool (local), and GitHub is the platform (cloud).

## 1. Core Workflow (The Daily Routine)

Whenever you make progress, follow these three steps in your terminal:

| Step | Command | What it does |
| :--- | :--- | :--- |
| **Stage** | `git add .` | Prepares all your changed files for saving. |
| **Commit** | `git commit -m "Your message"` | Saves a snapshot of your work with a description. |
| **Push** | `git push origin main` | Uploads your saves to GitHub. |

---

## 2. Essential Commands

### Getting Started
- `git init`: Create a new local repository.
- `git clone [url]`: Download an existing project from GitHub.
- `git status`: See which files you have modified but not saved yet.

### Tracking Progress
- `git log`: See a history of all your past "saves" (commits).
- `git diff`: See the exact lines of code you changed.

### Branching (Intermediate)
*Think of branches as "parallel universes" for your code.*
- `git branch`: List all branches.
- `git checkout -b feature-name`: Create and switch to a new branch.
- `git merge feature-name`: Combine changes from a feature branch back to main.

---

## 3. Best Practices (To Impress Interviewers)

1.  **Commit Often**: Don't wait until the end of the day. Commit every time a small feature works.
2.  **Meaningful Messages**: 
    - ❌ `git commit -m "fixed stuff"`
    - ✅ `git commit -m "fix: resolve port conflict in postman collection"`
3.  **Use a .gitignore**: Never upload `node_modules`, `.env` files, or build folders. It shows you care about security and repository size.
4.  **Pull before Push**: Always run `git pull` before pushing to ensure you have the latest code from your team.

---

## 4. Troubleshooting

- **"I messed up my last commit message!"**
  - Run: `git commit --amend -m "Correct message"`
- **"I want to undo my changes to a file before I committed them"**
  - Run: `git checkout -- filename`
- **"Help! I have merge conflicts!"**
  - Open the file, look for `<<<<<<< HEAD`, choose which code to keep, remove the markers, then `add` and `commit`.

---

## 5. GitHub Specifics
- **Pull Request (PR)**: A way to propose changes. You "push" your branch and then click "New Pull Request" on the website.
- **Issues**: A way to track bugs or tasks.
- **Fork**: Creating your own copy of someone else's project to experiment with.
