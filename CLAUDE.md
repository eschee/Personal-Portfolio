# Portfolio — Project Rules

@AGENTS.md

## About
Personal portfolio site. Next.js 16 (App Router) with TypeScript and Tailwind CSS 4,
code under `src/`. All project content lives in `src/data/projects.ts`: adding a
project means adding one entry to the `projects` array; the pages read from it.
Run locally with `npm run dev` (http://localhost:3000). Remote:
https://github.com/eschee/Personal-Portfolio. Goal: a simple, well-designed site
showcasing my projects (including Vikings Analytics), later deployed on Vercel.

## Security rules
- Never commit secrets. Secrets live only in `.env`, Vercel env vars, or GitHub
  Actions secrets. Never put a secret in a `NEXT_PUBLIC_` variable — anything with
  that prefix is shipped to the browser.
- Always use parameterized SQL queries. Never build SQL by joining strings.
- The website uses a read-only database user limited to the result tables. Only
  the data refresh job uses the write user.
- Validate all URL parameters and inputs against allowed values; show a 404 for
  anything else.
- No user accounts, logins, or personal data without asking me first.
- Before adding any new package, confirm it is real, widely used, and maintained.
- Before I merge any PR, run a security review of the changes.

## Git workflow (you handle git)
- Never work directly on `main`. Create a branch per feature: `feature/<short-name>`.
- Make small commits with clear messages as you complete each piece.
- Push the branch and open a pull request with `gh pr create` when a feature works.
- Ask me before merging a PR into main.
- Never force-push or rewrite history.
- Stage files by name with `git add <file>`; never use `git add -A` or `git add .`
- Briefly explain each git command you run and why, since I'm learning git.

## Working with me
- I am learning. Explain what you are doing and why, not just what changed.
  When you make a judgement call, say what the alternative was.
- For anything I do myself — dashboards, secrets, pasting values, clicking
  through a UI — give me numbered, step-by-step instructions, naming the exact
  screen and the exact field. Do not assume I know where something lives.
- Before any change to the database, to secrets, or to deployment: show me a
  plan and wait for my OK. That includes schema migrations, roles and grants,
  environment variables, and anything that runs against Neon, Vercel or
  GitHub Actions. Ordinary code changes do not need this.
- Never print a secret value. Not a password, not a connection string, not a
  token — not even partially, and not in a command you ask me to run. Put it
  on the clipboard with `pbcopy`, or write it to `.env` (mode 0600), and tell
  me only the variable name and where it goes. "Gitignored" is not a storage
  control: an ignored scratch file is still created world-readable at the
  default umask, so secrets stay in the three places the Security rules name.
