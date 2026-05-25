# AI Hub Network

A modular Next.js platform combining:
- YouTube-style feed and video discovery
- Skillshare-style course learning pages
- AI news/content feed
- Community and creator ecosystem

## Tech stack
- Frontend: Next.js (App Router) + React + TypeScript
- Backend: Next.js API routes (Node runtime)
- Auth: JWT-based authentication endpoints
- Database: Supabase client scaffold in `src/lib/supabase.ts`
- Media storage: Deferred (placeholder architecture included)

## Folder structure

```text
src/
  app/
    api/
      auth/login/route.ts
      auth/register/route.ts
      feed/route.ts
      courses/route.ts
      news/route.ts
      posts/route.ts
      creators/[id]/follow/route.ts
    feed/page.tsx
    courses/page.tsx
    news/page.tsx
    community/page.tsx
    creator/[id]/page.tsx
    admin/page.tsx
    layout.tsx
    page.tsx
    globals.css
  components/
    layout/AppShell.tsx
    feed/VideoCard.tsx
    courses/CourseCard.tsx
    news/NewsList.tsx
    community/PostCard.tsx
    creator/CreatorProfile.tsx
    admin/ModerationQueue.tsx
    assistant/AIAssistantPlaceholder.tsx
  lib/
    auth.ts
    mock-data.ts
    supabase.ts
  types/index.ts
```

## Core pages
- `/feed`: mixed feed architecture (videos + community posts + AI news + assistant panel)
- `/courses`: learning catalog grid
- `/news`: AI news stream
- `/community`: creator/user post feed
- `/creator/[id]`: creator profile + follow action
- `/admin`: moderation dashboard shell

## API structure
- `POST /api/auth/register` → register user/creator and return JWT
- `POST /api/auth/login` → return JWT
- `GET /api/feed` → aggregate feed payload
- `GET /api/courses` → course catalog
- `GET /api/news` → news feed
- `GET|POST /api/posts` → list/create posts
- `POST /api/creators/:id/follow` → follow creator

## Environment variables
Create `.env.local`:

```bash
JWT_SECRET=replace-with-strong-secret
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
```

## Run
```bash
npm install
npm run dev
```

## Build/install note (environment restriction)
- This repository currently has an **external infrastructure constraint** in some environments: `npm install` may fail with `403 Forbidden` when fetching from `https://registry.npmjs.org` (including `next`).
- When that occurs, it is a **package registry/network access issue**, not an application-code issue in this repo.
- `npm run build` requires dependencies to be installed first, so build validation must be performed in an environment with npm registry access (or an internal mirror/proxy that permits these packages).
