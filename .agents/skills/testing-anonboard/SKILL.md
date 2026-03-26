# Testing AnonBoard Platform

## Setup

1. Install dependencies: `npm install`
2. Reset and seed the database:
   ```bash
   npx prisma migrate reset --force
   ```
   This runs migrations and the seed script automatically.
3. Start the dev server: `npm run dev` (runs at http://localhost:3000)

## Key Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero section, search/filter controls, entity grid |
| `/add` | Post creation form with honeypot field, guidelines banner |
| `/entity/[id]` | Entity detail with voting, comments, replies |
| `/about` | About page with mission statement |
| `/guidelines` | Community guidelines |
| `/faq` | FAQ with accordion UI |
| `/admin` | Admin dashboard with stats (unauthenticated) |

## Navigation

- Header: AnonBoard logo (home), About, Guidelines, FAQ nav links, "+ New Post" button
- Footer: 3-column layout with Platform links and Trust & Safety section

## Key Testing Flows

### Post Creation
1. Click "+ New Post" in header
2. Fill in Title (required), Description, Category, Tags
3. Click "Publish Anonymously"
4. Should redirect to `/entity/[uuid]` on success

### Comment Submission
1. On entity detail page, type in comment textarea
2. Click "Post Comment"
3. Comment should appear with Anonymous label, Reply/Report buttons

### Profanity Filter
- Uses word boundary regex matching (`\b` boundaries)
- Test that standalone toxic words are blocked (e.g., "meth", "spam")
- Test that common words containing toxic substrings are allowed (e.g., "method", "something")
- Error message: "Content contains prohibited words."

### Honeypot Bot Protection
- Hidden fields with CSS class `.hp-field` on all forms
- Frontend sends honeypot value as `website` field in JSON body
- Server Zod schemas expect `website` field
- If filled, client-side silently prevents submission; server returns fake 201

## Build & Lint

- `npm run build` — production build (use this to verify, as `next lint` has a known Next.js 16 bug)
- No CI is configured for this repo beyond Devin Review

## Known Considerations

- The toxic word list in `src/lib/moderation.ts` may block some legitimate words like "hack", "exploit", "bomb" as standalone words
- Spam link detection blocks `bit.ly`, `tinyurl`, and words like "casino", "lottery"
- Admin dashboard at `/admin` is unauthenticated
- All UI text is in English (translated from Ukrainian)

## Tech Stack

- Next.js 16, TypeScript, Tailwind CSS v4, Prisma ORM, SQLite
- Database file: `prisma/dev.db`
