# AI Hub Network

A production-ready platform combining YouTube-style video discovery, Skillshare-style courses, AI news feeds, and a creator community ecosystem.

## Features

- **Video Discovery**: YouTube-inspired feed with recommendations
- **Learning Courses**: Structured courses with lessons and progress tracking  
- **Community Posts**: User-generated content with engagement
- **AI News Feed**: Curated AI and tech news
- **Creator Profiles**: Verified creators with followers and analytics
- **Admin Dashboard**: Content moderation and platform management
- **Dark/Light Mode**: Theme toggle for accessibility
- **Responsive Design**: Mobile-first UI for all devices

## Tech Stack

- **Frontend**: Next.js 16 + React 19 + TypeScript
- **Backend**: Next.js API Routes
- **Database**: Vercel Postgres (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Vercel Blob
- **Styling**: Tailwind CSS + custom components
- **State Management**: React Context + Zustand
- **Data Fetching**: React Query (SWR)

## Project Structure

```
ai-hub-network/
├── app/
│   ├── (auth)/              # Authentication pages (login, signup)
│   ├── (dashboard)/         # Main app pages (feed, courses, videos, etc.)
│   ├── (admin)/             # Admin dashboard
│   ├── api/                 # API routes
│   │   ├── auth/            # Authentication endpoints
│   │   ├── videos/          # Video management
│   │   ├── courses/         # Course management
│   │   ├── posts/           # Community posts
│   │   ├── news/            # News feed
│   │   ├── users/           # User profiles
│   │   ├── feed/            # Personalized feed
│   │   ├── search/          # Search functionality
│   │   ├── upload/          # File uploads
│   │   └── admin/           # Admin endpoints
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # Base UI components
│   ├── video/               # Video-related components
│   ├── course/              # Course components
│   ├── post/                # Post components
│   ├── news/                # News components
│   ├── common/              # Navbar, Sidebar
│   ├── creator/             # Creator profile components
│   ├── admin/               # Admin panel components
│   └── ai/                  # AI assistant components
├── lib/
│   ├── types.ts             # TypeScript types
│   ├── utils.ts             # Helper functions
│   ├── constants.ts         # App constants
│   ├── hooks/               # Custom React hooks
│   │   ├── use-auth.ts
│   │   ├── use-theme.ts
│   │   ├── use-fetch.ts
│   │   └── use-upload.ts
│   └── supabase.ts          # Database integration (setup required)
├── public/                  # Static assets
├── styles/                  # CSS modules
└── Configuration files...
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-hub-network.git
cd ai-hub-network
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (copy `.env.example` to `.env.local`):
```bash
cp .env.example .env.local
```

4. Configure the following integrations:
   - **Supabase**: Set up PostgreSQL database and Auth
   - **Vercel Blob**: Configure file storage
   - Environment variables in `.env.local`

### Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Features to Test

- **Landing Page** (`/`) - Hero section with feature overview
- **Feed** (`/feed`) - Discover videos, courses, posts, and news
- **Authentication** (`/login`, `/signup`) - User auth flows
- **Videos** (`/videos`) - Video discovery page
- **Courses** (`/courses`) - Course browser
- **Profile** (`/profile/[username]`) - Creator profiles
- **Admin Dashboard** (`/admin`) - Platform management
- **Notifications** (`/notifications`) - Activity feed

## Database Schema

The application uses PostgreSQL with the following core tables:

- `users` - User accounts with roles (user, creator, admin)
- `creators` - Extended creator profiles
- `videos` - Video content
- `courses` - Structured learning courses
- `lessons` - Course lessons
- `posts` - Community user-generated content
- `news` - AI and tech news feed
- `comments` - Threaded comments
- `likes` - Content engagement
- `follows` - Creator following system
- `enrollments` - Course enrollments
- `notifications` - User notifications
- `moderation_reports` - Content moderation queue

## API Routes

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Current user

### Content
- `GET /api/videos` - List videos
- `POST /api/videos` - Create video (creators)
- `GET /api/courses` - List courses
- `POST /api/courses` - Create course (creators)
- `GET /api/posts` - Community posts
- `GET /api/news` - News feed

### User Management
- `GET /api/users` - List users
- `GET /api/users/[username]` - Profile
- `POST /api/users/[id]/follow` - Follow user

### Discovery
- `GET /api/feed` - Personalized feed
- `GET /api/search` - Search content

### Admin
- `GET /api/admin/moderation` - Moderation queue
- `GET /api/admin/analytics` - Platform stats

## Styling & Theming

### Color System
The app uses CSS variables for theming:
- Primary: Blue (`#3b82f6`)
- Secondary: Dark slate (`#1e293b`)
- Accent: Cyan blue (`#06b6d4`)
- Destructive: Red (`#ef4444`)
- Neutrals: Grayscale palette

### Dark Mode
Dark mode is auto-detected from system preferences and can be toggled:
- Themes are persisted in localStorage
- Applied via `dark` class on `<html>` element
- CSS variables update on theme change

### Typography
- Font family: System sans-serif (scalable)
- Heading: 2-3.5xl bold
- Body: 0.875rem-1rem regular
- Monospace: Code blocks use `JetBrains Mono`

## Security Considerations

- [ ] Implement Supabase Row-Level Security (RLS) policies
- [ ] Add CSRF protection to form submissions
- [ ] Validate all inputs server-side
- [ ] Use parameterized queries (prevent SQL injection)
- [ ] Hash passwords with bcrypt
- [ ] Secure session management with httpOnly cookies
- [ ] Rate limiting on API endpoints
- [ ] Content Security Policy headers

## Performance Optimization

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- ISR (Incremental Static Regeneration) for static content
- Database query indexing
- Redis caching (Upstash) - Phase 2
- CDN for video/media delivery

## Deployment

### Vercel (Recommended)

1. Push to GitHub repository
2. Connect to Vercel project
3. Set environment variables in Vercel dashboard:
   - Database connection strings
   - Supabase keys
   - Blob storage token
4. Deploy

```bash
npm run build
```

## Development Roadmap

### Phase 1 (MVP) ✓
- [x] Database schema
- [x] Core UI components
- [x] Authentication pages
- [x] Video feed
- [x] Creator profiles
- [x] Follow system

### Phase 2 (Expansion)
- [ ] Courses system with lessons
- [ ] Course enrollment & progress
- [ ] Community posts
- [ ] Comments system
- [ ] Search functionality

### Phase 3 (Advanced)
- [ ] News aggregation
- [ ] AI recommendations
- [ ] Notifications system
- [ ] Creator analytics
- [ ] Monetization

### Phase 4 (Polish)
- [ ] Full moderation system
- [ ] Advanced search/filters
- [ ] Video encoding queue
- [ ] Mobile app (React Native)

## Contributing

1. Create feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and feature requests, visit the [Issues](https://github.com/yourusername/ai-hub-network/issues) page.

## Acknowledgments

- YouTube for video discovery patterns
- Skillshare for course structure
- shadcn/ui for component patterns
- Next.js team for amazing framework
