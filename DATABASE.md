# AI Hub Network - Database Schema Documentation

## Overview
The AI Hub Network uses Supabase PostgreSQL with Row Level Security (RLS) for secure data management. The database is designed with 13 core tables supporting video discovery, learning platforms, community posts, AI news, and creator ecosystems.

## Database Tables

### Core Tables

#### 1. **profiles** (User Profiles)
Extends Supabase auth.users with platform-specific data.
```sql
id (UUID) - Foreign key to auth.users
username (TEXT) - Unique username
display_name (TEXT) - Display name
bio (TEXT) - User bio
avatar_url (TEXT) - Avatar image URL
cover_image_url (TEXT) - Cover image URL
followers_count (INT) - Follower count
following_count (INT) - Following count
is_creator (BOOLEAN) - Creator status
is_verified (BOOLEAN) - Verification status
is_admin (BOOLEAN) - Admin status
created_at (TIMESTAMP) - Creation timestamp
updated_at (TIMESTAMP) - Last update
```

#### 2. **videos** (Video Content)
YouTube-style video hosting and discovery.
```sql
id (UUID) - Primary key
user_id (UUID) - Creator reference
title (TEXT) - Video title
description (TEXT) - Video description
thumbnail_url (TEXT) - Thumbnail image URL
video_url (TEXT) - Video file URL
duration (INT) - Duration in seconds
views_count (INT) - View count
likes_count (INT) - Like count
comments_count (INT) - Comment count
category (TEXT) - Category
tags (TEXT[]) - Array of tags
is_public (BOOLEAN) - Public visibility
created_at (TIMESTAMP) - Creation timestamp
updated_at (TIMESTAMP) - Last update
```

#### 3. **courses** (Learning Courses)
Skillshare-style course content.
```sql
id (UUID) - Primary key
user_id (UUID) - Creator reference
title (TEXT) - Course title
description (TEXT) - Course description
thumbnail_url (TEXT) - Course thumbnail
category (TEXT) - Course category
level (TEXT) - Difficulty level (beginner/intermediate/advanced)
duration_hours (INT) - Total hours
price (DECIMAL) - Course price
is_public (BOOLEAN) - Public visibility
students_count (INT) - Student count
rating (DECIMAL) - Average rating
created_at (TIMESTAMP) - Creation timestamp
updated_at (TIMESTAMP) - Last update
```

#### 4. **lessons** (Course Lessons)
Individual lessons within courses.
```sql
id (UUID) - Primary key
course_id (UUID) - Course reference
title (TEXT) - Lesson title
description (TEXT) - Lesson description
video_url (TEXT) - Lesson video URL
duration (INT) - Duration in seconds
order_index (INT) - Lesson order
is_free (BOOLEAN) - Free preview status
created_at (TIMESTAMP) - Creation timestamp
updated_at (TIMESTAMP) - Last update
```

#### 5. **posts** (Community Posts)
User-generated content and community discussions.
```sql
id (UUID) - Primary key
user_id (UUID) - Author reference
content (TEXT) - Post content
image_url (TEXT) - Attached image URL
likes_count (INT) - Like count
comments_count (INT) - Comment count
shares_count (INT) - Share count
is_public (BOOLEAN) - Public visibility
created_at (TIMESTAMP) - Creation timestamp
updated_at (TIMESTAMP) - Last update
```

#### 6. **news** (AI News Feed)
AI news and updates aggregation.
```sql
id (UUID) - Primary key
title (TEXT) - News title
description (TEXT) - Short description
content (TEXT) - Full content
image_url (TEXT) - Feature image URL
source (TEXT) - News source
source_url (TEXT) - Original source URL
category (TEXT) - News category
views_count (INT) - View count
is_featured (BOOLEAN) - Featured status
created_at (TIMESTAMP) - Creation timestamp
updated_at (TIMESTAMP) - Last update
```

#### 7. **comments** (Discussion Comments)
Comments on videos, posts, and courses.
```sql
id (UUID) - Primary key
user_id (UUID) - Author reference
content_type (TEXT) - Type (video/post/course)
content_id (UUID) - Referenced content ID
text (TEXT) - Comment text
likes_count (INT) - Like count
created_at (TIMESTAMP) - Creation timestamp
updated_at (TIMESTAMP) - Last update
```

#### 8. **likes** (Content Engagement)
Likes on videos, posts, courses, and comments.
```sql
id (UUID) - Primary key
user_id (UUID) - User reference
content_type (TEXT) - Content type
content_id (UUID) - Content reference
created_at (TIMESTAMP) - Creation timestamp
UNIQUE (user_id, content_type, content_id)
```

#### 9. **follows** (Creator Following)
Follow relationships between users.
```sql
id (UUID) - Primary key
follower_id (UUID) - Follower user
following_id (UUID) - Followed user
created_at (TIMESTAMP) - Creation timestamp
UNIQUE (follower_id, following_id)
```

#### 10. **enrollments** (Course Enrollment)
User course enrollments and progress.
```sql
id (UUID) - Primary key
user_id (UUID) - Student reference
course_id (UUID) - Course reference
progress (INT) - Progress percentage
completed_at (TIMESTAMP) - Completion timestamp
created_at (TIMESTAMP) - Creation timestamp
UNIQUE (user_id, course_id)
```

#### 11. **reports** (Moderation Reports)
Content moderation and abuse reports.
```sql
id (UUID) - Primary key
reporter_id (UUID) - Reporter reference
content_type (TEXT) - Content type
content_id (UUID) - Reported content ID
reason (TEXT) - Report reason
status (TEXT) - Status (pending/resolved/rejected)
admin_notes (TEXT) - Admin notes
resolved_at (TIMESTAMP) - Resolution timestamp
created_at (TIMESTAMP) - Creation timestamp
```

#### 12. **notifications** (User Notifications)
User notifications for engagement and updates.
```sql
id (UUID) - Primary key
user_id (UUID) - User reference
type (TEXT) - Notification type
title (TEXT) - Notification title
message (TEXT) - Notification message
related_user_id (UUID) - Related user reference
is_read (BOOLEAN) - Read status
created_at (TIMESTAMP) - Creation timestamp
```

## Row Level Security (RLS) Policies

### Access Control Summary
- **profiles**: Public read, users edit own, others see public info
- **videos**: Public read, creators edit own, private videos visible only to owner
- **courses**: Public read, creators edit own, enrollment status determines access
- **posts**: Public read, users edit own, private posts only visible to owner
- **news**: Public read only
- **comments**: Public read, users manage own
- **likes**: Users manage own, all can view
- **follows**: Users manage own, all can view
- **enrollments**: Users see own, creators see course enrollments
- **reports**: Users see own, admins see all
- **notifications**: Users see own

## Indexes for Performance

```sql
idx_videos_user_id - Fast filtering by creator
idx_videos_created_at - Latest videos sorting
idx_courses_user_id - Creator course lookup
idx_courses_category - Category filtering
idx_posts_user_id - User posts lookup
idx_posts_created_at - Feed chronological sorting
idx_comments_content_id - Comment thread lookup
idx_follows_follower_id - Following list
idx_follows_following_id - Followers list
idx_likes_content_id - Like count queries
idx_enrollments_user_id - Student courses
idx_notifications_user_id - User notifications
idx_notifications_created_at - Recent notifications
```

## Triggers and Functions

### Auto-Profile Creation
When a new user signs up via Supabase Auth, a trigger automatically creates a profile entry with default values from the signup metadata.

## Service Layer Functions

Database access is abstracted through service functions in `/lib/services/`:
- **videos.ts** - Video CRUD and querying
- **courses.ts** - Course and lesson management
- **posts.ts** - Post operations
- **users.ts** - Profile and user data
- **engagement.ts** - Likes, follows, and comments
- **storage.ts** - File upload to Vercel Blob

## Connection Management

Supabase clients are initialized in:
- `/lib/supabase/client.ts` - Browser client
- `/lib/supabase/server.ts` - Server-side client
- `/lib/supabase/proxy.ts` - Session management middleware

All database operations use proper error handling and type safety with TypeScript interfaces defined in `/lib/types.ts`.
