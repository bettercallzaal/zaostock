# zaostock

The dashboard + public site for **ZAOstock 2026**, a one-day artist-built music festival in downtown Ellsworth, Maine on Saturday, October 3, 2026.

Run by [The ZAO](https://zaoos.com).

## Stack

- Next.js 16 (App Router) + Turbopack
- React 19
- Tailwind v4
- Supabase (Postgres + RLS)
- iron-session (4-letter team codes)
- Tiptap (WYSIWYG bio editor)
- Vercel (hosting)

## Run locally

```bash
npm install
cp .env.example .env.local        # fill in Supabase + SESSION_SECRET
npm run dev                        # http://localhost:3000
```

## Origin

Spun out of [ZAOOS](https://github.com/bettercallzaal/ZAOOS) on 2026-04-29.
ZAOOS is the lab; once a thing earns its own users + brand + lifecycle, it graduates.
ZAOstock is the first feature graduate.

## Public surface

- `/` - festival landing page
- `/team` - team dashboard (login with 4-letter code)
- `/team/m/<slug>` - public member profile
- `/team/help` - dashboard help docs
- `/onepagers/overview` - public festival brief
- `/apply` - volunteer signup
- `/sponsor` - sponsor inquiry
- `/circles` - the 8 working circles
- `/program` - day-of schedule
- `/cypher` - cypher signup

## License

MIT.
