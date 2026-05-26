export const CATEGORIES = [
  'Web Development',
  'AI & Machine Learning',
  'Mobile Development',
  'Data Science',
  'Cloud & DevOps',
  'Design',
  'Business',
  'Marketing',
  'Personal Development',
  'Technology News',
]

export const VIDEO_CATEGORIES = [
  'Tutorials',
  'Reviews',
  'News',
  'Interviews',
  'Live Streams',
  'Shorts',
]

export const COURSE_LEVELS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
]

export const VISIBILITY_OPTIONS = [
  { value: 'public', label: 'Public' },
  { value: 'private', label: 'Private' },
  { value: 'unlisted', label: 'Unlisted' },
]

export const CONTENT_TYPES = ['video', 'post', 'news', 'comment', 'course'] as const

export const NOTIFICATION_TYPES = [
  'follow',
  'like',
  'comment',
  'new_upload',
  'course_update',
] as const

export const MODERATION_REASONS = [
  'Inappropriate Content',
  'Spam',
  'Harassment',
  'Misinformation',
  'Copyright Infringement',
  'Hate Speech',
  'Violence',
  'Other',
]

export const ROLES = ['user', 'creator', 'admin'] as const

export const PAGINATION_LIMIT = 20
export const FEED_LIMIT = 15
export const SEARCH_LIMIT = 50

export const API_ENDPOINTS = {
  // Videos
  videos: '/api/videos',
  videoDetail: (id: string) => `/api/videos/${id}`,
  
  // Courses
  courses: '/api/courses',
  courseDetail: (id: string) => `/api/courses/${id}`,
  lessons: (courseId: string) => `/api/courses/${courseId}/lessons`,
  enrollment: (courseId: string) => `/api/courses/${courseId}/enroll`,
  
  // Posts
  posts: '/api/posts',
  postDetail: (id: string) => `/api/posts/${id}`,
  
  // News
  news: '/api/news',
  newsDetail: (id: string) => `/api/news/${id}`,
  
  // Users
  users: '/api/users',
  userProfile: (username: string) => `/api/users/${username}`,
  follow: (userId: string) => `/api/users/${userId}/follow`,
  followers: (userId: string) => `/api/users/${userId}/followers`,
  following: (userId: string) => `/api/users/${userId}/following`,
  
  // Engagement
  likes: '/api/likes',
  comments: '/api/comments',
  
  // Feed
  feed: '/api/feed',
  search: '/api/search',
  
  // Admin
  adminModeration: '/api/admin/moderation',
  adminAnalytics: '/api/admin/analytics',
  adminUsers: '/api/admin/users',
  
  // Uploads
  upload: '/api/upload',
}

export const THEME_CONFIG = {
  defaultTheme: 'light',
  themes: ['light', 'dark'],
}

export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
}

export const BREAKPOINTS = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}
