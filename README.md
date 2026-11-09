# HONOR X7d Drop Challenge

Spanish, mobile-first launch activation. Vite + TypeScript + Phaser 3. Placeholder phone is illustrated in CSS/canvas, not approved product artwork.

## Run

Node 20+: `npm install`, `npm run dev`. `npm test` and `npm run build`. `npm run preview` serves the production build. Open `/#admin` for admin. In demo mode the token is `demo`; this is an explicitly unprotected local simulation, not production authentication. Demo stores only anonymous scores and counters in localStorage, never name or WhatsApp. Demo entries can be manipulated and are not a real competition.

## Gameplay

30 seconds, 10 points/second, 50/energy, −30/impact, minimum zero. Touch/mouse drag or arrow keys. Two obstacles per wave leave one lane open with energy marking the safe lane. One second collision grace. Three environments at 0/10/20 seconds. Fullscreen button requires browser support. Keep tab foregrounded; production finish rejects games longer than three minutes. Water artwork is abstract; no durability rating or waterproof claim is made.

## Production backend

1. Create a Supabase project and execute `supabase/schema.sql` once.
2. Deploy `supabase functions deploy event-api --no-verify-jwt`. The function authenticates admin with a server secret; gameplay uses random session capabilities and a hashed network fingerprint. Do not use this flag for unrelated functions.
3. Set function secrets `ALLOWED_ORIGIN` (exact site origin), `ADMIN_TOKEN` (long random value), `IDENTITY_SALT` (long stable random value). Supabase supplies `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. Never put these secrets in Vite variables.
4. Set `VITE_API_URL=https://PROJECT.supabase.co/functions/v1/event-api` at build time. Redeploy frontend. Without this variable all features use local demo data.
5. Admin enters the token at `/#admin`. Token stays in memory. Reset creates a new event and isolates rankings; historical data remains private. Backend metrics and CSV operate on the active event. One lead per normalized phone per event; a random public alias hides personal information. Ranking uses server-calculated scores.

All tables have RLS enabled without public policies. Function alone handles lead data. Server checks duration, bounded integer pickup/collision counts, session ownership, one-time completion, honeypot, unique participant hash and 8 starts/minute/network. These are basic anti-cheat checks, not authoritative simulation: a determined attacker can forge bounded results. Use human prize verification or authoritative telemetry before valuable prize awards. IP rate limits can affect shared event networks; tune with expected kiosk traffic. Deploy platform-level rate limiting for public campaigns. Test the function against a staging project before launch; no Supabase credentials are included.

Promo consent is separate and unchecked, timestamped on server only when true. Buying interest is separate. Replace privacy copy with the organizer's identity, privacy URL, retention period and contact before collecting real leads; define deletion/retention operations with the organizer. No analytics or third-party lead processing in demo. Google Fonts is optional; system fonts provide fallback.

## Configuration and assets

Edit `src/config.ts` for branding, product, claims, event wording and privacy text. Session duration is deliberately fixed at 30 seconds in game and server validation; change both together. Game modules: `src/game`; interface: `src/main.ts`/`style.css`; services: `src/services`; backend and schema: `supabase`. Replace CSS home phone and canvas phone drawing in DropScene with approved assets when available. Runtime admin config supports event rotation; brand/copy/gameplay configuration is build-time.

## Deploy

Cloudflare Pages or Vercel: build command `npm run build`, output `dist`, Node 20+. Set only `VITE_API_URL` in frontend environment. Backend stays on Supabase (works with either host). Use HTTPS, restrict ALLOWED_ORIGIN to deployed origin, and test on target kiosk/mobile browsers. Routes are single-page with hash admin; no server rewrite needed. No offline service worker is installed.

## Validation and known limits

Vitest covers scoring, phase boundaries, movement bounds, safe obstacle lanes and validation. Build runs strict TypeScript. Browser smoke test exercises navigation, gameplay and results. Production secrets, real mobile hardware, Supabase integration and approved artwork/legal copy must be supplied and validated before event launch. Admin analytics are event totals, without date filters; protected top-score data is returned by API and public top 10 is accessible in the app.

## GitHub Pages

Live demo: https://contactonodo3d-byte.github.io/honor-x7d-drop-challenge/

Pages serves the committed `docs` directory on `main`. After changes, run `npm ci && npm run build`, copy the contents of `dist` into `docs`, retain `docs/.nojekyll`, and commit/push. Vite uses relative asset paths for project Pages compatibility.
