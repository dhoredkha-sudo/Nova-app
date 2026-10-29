# NOVA EDU — Learn • Build • Compete

Expo (React Native) edition of the NOVA EDU education platform, adapted from the
original Vite/web specification so it can be built with Expo.dev / EAS from GitHub.
The Supabase backend is the same in both editions.

> **Updated 2026-10-29:** Supabase, Expo owner, slug and EAS Project ID supplied
> by the user have been replaced in `app.json`, `.env.example` and the Supabase
> client. EXPO_TOKEN still goes only in GitHub Secrets, never in chat.

## 1. What is built

- Public home with Learn • Build • Compete hero, Renaissance 2026 preview, FAQ
- Auth: login / register / password-reset guidance, demo accounts, role guards
- Student dashboard: progress, streak, mission today, continue learning, projects, results
- Teacher dashboard: own courses, lesson publishing note, teacher applications
- Admin dashboard: approve/reject teachers, audit log, announcements, settings
- Learn: subjects, search/filter, enrolment, lesson completion tracking
- Olympiad Arena: timed practice quiz (10 questions, +4 / -1 marking), review, history
- Innovation Lab: project creation, 8-stage lifecycle, mentor feedback (demo)
- Renaissance 2026 Event Hub: all 5 divisions (Genesis, Chronicle, Expression, Athenaeum, Odyssey) + registrations
- Search, notifications, profile, achievements, settings (dark/light, English/Bangla)
- Supabase SQL migrations, RLS policies, storage buckets, set-role Edge Function
- GitHub Actions EAS Build workflow

## 2. Quick start (demo mode, no backend)

```bash
npm install
cp .env.example .env   # leave placeholders — app runs in DEMO MODE
npm start
# Press a for Android emulator, or scan the QR code with Expo Go
```

Demo logins (password `demo1234`):
- student@demo.nova — Student Dashboard
- teacher@demo.nova — Teacher Dashboard
- admin@demo.nova — Admin Dashboard

Demo data is stored on-device with AsyncStorage. It is clearly labelled DEMO and
is not presented as live platform statistics.

## 3. Replace the placeholders (when you get your links)

1. Create a Supabase project at supabase.com.
2. Copy from Project Settings → API:
   - `EXPO_PUBLIC_SUPABASE_URL=https://YOUR_SUPABASE_PROJECT_REF.supabase.co`
   - `EXPO_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY`
3. In Supabase SQL Editor, run in order:
   - `supabase/migrations/001_init.sql`
   - `supabase/migrations/002_rls.sql`
   - `supabase/migrations/003_storage.sql`
4. In Supabase Auth → URL Configuration, add redirect URLs:
   - `novaedu://` and your Expo dev URL (`exp://...`)
5. Create an Expo account at expo.dev, run `npx eas-cli init` (or `eas init`),
   then replace in `app.json`:
   - `owner: "YOUR_EXPO_USERNAME"` → your Expo username
   - `extra.eas.projectId: "YOUR_EAS_PROJECT_ID"` → your EAS project ID
   - `android.package` / `ios.bundleIdentifier` if you want a different package name
6. Put real values in `.env` (never commit `.env`) and in GitHub Secrets for CI:
   `EXPO_TOKEN`, `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`, `EXPO_PUBLIC_EAS_PROJECT_ID`
7. Restart Expo. The DEMO MODE banner should disappear.

## 4. Admin provisioning (secure, server-side only)

1. Create the first user normally via Supabase Auth (or the app's register screen).
2. In Supabase SQL Editor, as a project owner, insert directly:
   ```sql
   insert into role_assignments (user_id, role) values ('<first-user-uuid>', 'admin');
   ```
3. After that, admins use the `set-role` Edge Function to grant teacher/admin roles.
   Never grant admin from a registration form, and never put the service_role key
   in the app. Deploy it with:
   ```bash
   supabase functions deploy set-role
   ```

## 5. Build with Expo.dev / EAS (from GitHub)

```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview   # APK for testing
eas build --platform android --profile production  # AAB for Play Store
```

From GitHub: push to `main` (or run the workflow manually). The workflow in
`.github/workflows/eas-build.yml` builds Android preview using GitHub Secrets.
For Play Store submission, use `eas submit` with a Play service account — that
JSON goes in EAS/Play Console, never in chat or in the repo.

## 6. Tests

```bash
npm test   # scoring logic: +4 correct, -1 wrong, skipped = 0
```

## 7. Production deployment checklist

- [ ] Placeholders replaced, `.env` not committed
- [ ] Migrations run, RLS enabled (never disabled to “make it work”)
- [ ] Storage buckets + policies reviewed
- [ ] Auth redirect URLs set, email provider configured for production
- [ ] First admin provisioned via SQL, then set-role function deployed
- [ ] Real icons/splash replaced if you want branded assets
- [ ] EAS preview build tested on a real Android device
- [ ] Play Store listing, privacy policy and contact details added by organisers

## 8. Known limitations — read before demoing

- This is a **functional core, not the entire 25-section spec in full depth**:
  video lessons, PDF resources, manual grading UI, certificate PDFs, email/push
  delivery, payment, and full multi-teacher class management are stubs or demo
  flows. They are labelled as such in the UI/README, not claimed as complete.
- In demo mode, data is local. With Supabase connected, auth uses Supabase, but
  some screens still use local state until their Supabase queries are wired —
  the SQL schema for those tables is already provided.
- Recharts (web) is replaced by native progress bars/charts for Expo; the
  analytics shown are from local activity, not fabricated live counts.
- Event dates/rules are “to be confirmed” until organisers confirm them.
- Free Fire / gaming modules are included only as a division listing, and only
  if officially authorised and permitted.
- No competition success is guaranteed.

## 9. Features needing external credentials

Supabase project, Expo/EAS account, optionally: custom email provider (Resend/SMTP),
Google OAuth, FCM/google-services.json for push, Play Console service account,
Sentry DSN. None are required for demo mode.
