# AI Hub Network - Complete Setup Guide

## Phase 1: Foundation Complete ✓
- Next.js 16 project initialized
- TypeScript, Tailwind CSS configured
- Core UI component library built
- Project structure established

## Phase 2: Database & Integration Complete ✓
- Supabase PostgreSQL schema created (13 tables)
- Row Level Security (RLS) policies configured
- Auto-profile creation trigger enabled
- Performance indexes added
- Service layer functions implemented
- Vercel Blob storage integration ready

## Phase 3-8: Frontend & Features (In Progress)

### What's Already Built

#### Authentication System
- Supabase Auth with email/password and OAuth support
- Auth callback route for session management
- Middleware for session persistence
- User profile auto-creation on signup

#### API Routes (Connected to Database)
- `GET/POST /api/videos` - Video discovery
- `GET/POST /api/courses` - Course management
- `GET/POST /api/posts` - Community posts
- `GET /api/feed` - Personalized feed
- `GET/PATCH /api/users` - User profiles & search
- `POST /api/upload` - File upload to Vercel Blob

#### Database Service Layer
- `lib/services/videos.ts` - Video operations
- `lib/services/courses.ts` - Course management
- `lib/services/posts.ts` - Post CRUD
- `lib/services/users.ts` - User profiles
- `lib/services/engagement.ts` - Likes, follows, comments
- `lib/services/storage.ts` - Blob file uploads

#### Components
- Navigation bar with auth/theme toggles
- Sidebar navigation
- Feed page layout
- Video, course, post, and news cards
- Skeleton loaders

#### Pages
- `/` - Home/landing
- `/(dashboard)/feed` - Main feed
- `/(dashboard)/videos` - Video discovery
- `/(dashboard)/courses` - Course library
- `/(dashboard)/profile/[username]` - Creator profiles
- `/(dashboard)/notifications` - Notifications
- `/(admin)/dashboard` - Admin moderation panel
- `/(auth)/login` - Login page
- `/(auth)/signup` - Registration page

### Next Steps

#### Phase 3: Full Feature Implementation
1. Connect components to API endpoints
2. Implement real-time updates with Supabase Realtime
3. Add video/image upload functionality
4. Build course creation workflow

#### Phase 4: Creator Ecosystem
1. Creator dashboard with analytics
2. Revenue tracking and payouts
3. Creator verification system
4. Subscriber management

#### Phase 5: Community Features
1. Comments and threaded discussions
2. Like and share functionality
3. User messaging system
4. Notification system

#### Phase 6: Advanced Features
1. Search and filtering
2. Recommendations algorithm
3. AI-powered content suggestions
4. Analytics dashboard

#### Phase 7: Admin & Moderation
1. Content moderation queue
2. User management
3. Reports and appeals
4. Platform analytics

#### Phase 8: Optimization & Deployment
1. Performance optimization
2. CDN configuration
3. Testing suite
4. Deployment to Vercel

## Environment Variables

Add to your `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
```

## Running the Application

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to access the application.

## Database Operations

All database operations go through the service layer:

```typescript
import { getVideos } from '@/lib/services/videos'
import { createPost } from '@/lib/services/posts'
import { followUser } from '@/lib/services/engagement'

// Fetch videos
const videos = await getVideos(20, 0)

// Create post
const post = await createPost({
  user_id: userId,
  content: 'My thoughts...',
  is_public: true,
})

// Follow user
await followUser(currentUserId, targetUserId)
```

## File Upload

Upload files to Vercel Blob:

```typescript
import { uploadFile, uploadImage, uploadVideo } from '@/lib/services/storage'

// Upload any file
const result = await uploadFile(file, 'folder')

// Upload image
const image = await uploadImage(imageFile)

// Upload video
const video = await uploadVideo(videoFile)
```

## Authentication Flow

1. User signs up via `/auth/signup`
2. Supabase creates auth user and sends verification email
3. User clicks email link → redirects to `/auth/callback`
4. Callback exchanges auth code for session
5. Profile auto-created via database trigger
6. User redirected to `/feed`

## Deployment

### To Vercel

```bash
git push origin main
```

The app will automatically deploy to Vercel with:
- Next.js build optimization
- Vercel Blob storage integration
- Environment variables configured
- Middleware for session management

### Environment Variables (Vercel)

Set these in Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `BLOB_READ_WRITE_TOKEN`

## Testing the API

```bash
# Fetch public videos
curl http://localhost:3000/api/videos

# Fetch feed (requires auth)
curl -H "Authorization: Bearer TOKEN" http://localhost:3000/api/feed

# Search users
curl "http://localhost:3000/api/users?search=john"

# Upload file
curl -F "file=@photo.jpg" http://localhost:3000/api/upload
```

## Troubleshooting

### Auth Issues
- Verify Supabase URL and keys are correct
- Check email verification link in inbox
- Clear browser cookies and cache

### Database Errors
- Ensure RLS policies are enabled
- Check user is authenticated for protected operations
- Verify user_id matches current user

### Upload Failures
- Check Blob token is valid
- Verify file size is under limits
- Check file permissions

## Architecture Overview

```
AI Hub Network
├── Frontend (Next.js)
│   ├── Pages (Dashboard, Auth, Admin)
│   ├── Components (UI, Cards, Layouts)
│   └── Hooks (Auth, Data Fetching, Theme)
├── API Routes (Backend)
│   ├── /api/videos
│   ├── /api/courses
│   ├── /api/posts
│   ├── /api/feed
│   ├── /api/users
│   └── /api/upload
├── Service Layer (Database Operations)
│   ├── videos.ts
│   ├── courses.ts
│   ├── posts.ts
│   ├── users.ts
│   ├── engagement.ts
│   └── storage.ts
├── Supabase (PostgreSQL)
│   ├── 13 Tables with RLS
│   ├── Auto-profile trigger
│   └── Performance indexes
└── Storage (Vercel Blob)
    └── Images, videos, files
```

## Next Actions

1. Connect login/signup pages to Supabase Auth
2. Implement feed component data fetching
3. Add video upload and playback
4. Build course creation workflow
5. Setup real-time notifications
6. Create admin dashboard
7. Implement search and recommendations
8. Deploy to Vercel

See `DATABASE.md` for detailed schema documentation and `PROJECT_OVERVIEW.md` for architecture details.
