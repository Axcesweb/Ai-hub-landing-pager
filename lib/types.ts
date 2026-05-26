// User & Auth Types
export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  role: 'user' | 'creator' | 'admin';
  isVerified: boolean;
  followerCount: number;
  followingCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  id: string;
  username: string;
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  cover_image_url?: string;
  followers_count: number;
  following_count: number;
  is_creator: boolean;
  is_verified: boolean;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface Creator extends User {
  category: string;
  socialLinks?: Record<string, string>;
  monthlyRevenue?: number;
  subscriberCount: number;
  totalViews: number;
  isFeatured: boolean;
}

// Video Types
export interface Video {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  category: string;
  tags: string[];
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isPublished: boolean;
  visibility: 'public' | 'private' | 'unlisted';
  creator?: User;
  createdAt: string;
  updatedAt: string;
}

// Course Types
export interface Course {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  durationMinutes: number;
  studentCount: number;
  rating: number;
  lessonCount: number;
  isPublished: boolean;
  creator?: User;
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  videoUrl: string;
  materialsUrl?: string;
  position: number;
  durationMinutes: number;
  createdAt: string;
}

// Post Types
export interface Post {
  id: string;
  creatorId: string;
  content: string;
  mediaUrls: string[];
  category: string;
  likeCount: number;
  commentCount: number;
  isPublished: boolean;
  creator?: User;
  createdAt: string;
  updatedAt: string;
}

// News Types
export interface News {
  id: string;
  title: string;
  content: string;
  sourceUrl: string;
  sourceName: string;
  imageUrl: string;
  category: string;
  createdAt: string;
}

// Comment Types
export interface Comment {
  id: string;
  userId: string;
  contentId: string;
  contentType: 'video' | 'post' | 'news';
  text: string;
  parentId?: string;
  likeCount: number;
  user?: User;
  createdAt: string;
  updatedAt: string;
  replies?: Comment[];
}

// Engagement Types
export interface Like {
  id: string;
  userId: string;
  contentId: string;
  contentType: 'video' | 'post' | 'news' | 'comment' | 'course';
  createdAt: string;
}

export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: string;
}

// Enrollment Types
export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  progressPercentage: number;
  completedAt?: string;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'follow' | 'like' | 'comment' | 'new_upload' | 'course_update';
  fromUserId: string;
  contentId?: string;
  isRead: boolean;
  createdAt: string;
  fromUser?: User;
}

// Moderation Types
export interface ModerationReport {
  id: string;
  reporterId: string;
  contentId: string;
  contentType: 'video' | 'post' | 'news' | 'comment';
  reason: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

// Feed Types
export interface FeedItem {
  type: 'video' | 'course' | 'post' | 'news';
  id: string;
  data: Video | Course | Post | News;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
}

export interface CreateVideoFormData {
  title: string;
  description: string;
  category: string;
  tags: string[];
  visibility: 'public' | 'private' | 'unlisted';
}

export interface CreateCourseFormData {
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
}

export interface CreatePostFormData {
  content: string;
  category: string;
  mediaUrls: string[];
}
