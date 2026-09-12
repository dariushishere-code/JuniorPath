# Supabase Setup Guide

JuniorPath now uses **Supabase Auth + PostgreSQL** instead of the old
localStorage + PBKDF2 layer. This guide walks through wiring it up.

---

## 1. Create a Supabase project

1. Go to <https://supabase.com> and sign in (or create an account).
2. Click **New project**, pick an organisation, a name, and a database
   password, then create it.
3. From the project dashboard note down:
   - **Project URL** → `https://<project-ref>.supabase.co`
   - **API keys** → the anon / publishable key (`sb_publishable_...` or the
     classic `eyJ...` anon key).

## 2. Run the schema

1. Open **SQL Editor** in the Supabase dashboard.
2. Paste the contents of [`supabase/schema.sql`](./supabase/schema.sql).
3. Click **Run**. The script creates:

   | Table                     | Purpose                                        |
   | ------------------------- | ---------------------------------------------- |
   | `profiles`                | name, email, points, selected stack            |
   | `user_projects`           | completed projects + GitHub links              |
   | `user_flashcards`         | read flashcards                                |
   | `user_interview_questions`| reviewed interview questions                   |

   It also enables **Row Level Security** so every user can only read/write
   their own rows, and adds a trigger that auto-creates a profile (+50 bonus
   points) when someone signs up.

## 3. Environment variables

### Local development

```bash
copy .env.example .env
```

Fill in:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-or-publishable-key
```

> `.env` is git-ignored — never commit real keys. Only the **anon /
> publishable** key belongs in the client. The **service role (secret) key**
> must never be exposed in browser code.

### Netlify

1. Go to **Site configuration → Environment variables**.
2. Add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Redeploy the site (or trigger a new build). The same two variables are used
   at build time by Vite.

## 4. Auth settings (recommended for development)

Supabase enables **Confirm email** by default. While developing you can
disable it so signups log in immediately:

- **Authentication → Providers → Email → Confirm email** → off.

The UI fully supports the confirmed-email flow too: after signup it shows a
"check your inbox" notice, and users sign in once their email is confirmed.

## 5. How the app talks to Supabase

- `src/lib/supabase.ts` — single client instance.
- `src/store/useStore.ts` — auth + progress logic:
  - `initialize()` restores the session on page load (`getSession` +
    `onAuthStateChange`).
  - `login()` / `signup()` / `logout()` map to Supabase Auth.
  - Progress (points, projects, flashcards, interview questions) is read from
    and written to the tables above, then mirrored into the Zustand store.

## Checking it works

1. `npm run dev`
2. Create an account → you land on stack selection with 50 points.
3. Complete a project → dashboard shows +100 points.
4. Refresh the page → session is restored and progress persists.
5. Open the project in an incognito window → the data is still there after
   logging in with the same account.