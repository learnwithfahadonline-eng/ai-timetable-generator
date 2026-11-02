# AI Timetable Studio

Next.js App Router MVP: generate weekly timetable sessions with OpenAI and export to Google Calendar or Google Sheets.

## Local setup
1. Install Node.js 20+ and run `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Configure `OPENAI_API_KEY` and optionally `OPENAI_MODEL`.
4. In Google Cloud Console, enable Google Calendar and Sheets APIs; configure OAuth consent and a web OAuth client.
5. Register `http://localhost:3000/api/google/callback` as redirect URI; set client ID and secret.
6. Set `COOKIE_SECRET` to 32+ random characters, e.g. `openssl rand -hex 32`.
7. Run `npm run dev` and visit http://localhost:3000.

## Vercel
Set `OPENAI_API_KEY`, `OPENAI_MODEL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI`, `APP_URL`, and `COOKIE_SECRET` in Vercel project environment variables. Use your live domain in GOOGLE_REDIRECT_URI and register it in Google Cloud.

## Limitations
Single-user MVP; encrypted Google credentials in cookies are not production-ready multi-user storage. No calendar availability checks or export deduplication. Add user authentication, database-backed encrypted token storage, rate limiting and quotas before public launch. Repeated exports create duplicate events. Review schedules before export.