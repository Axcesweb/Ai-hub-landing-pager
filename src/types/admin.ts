export type Role = 'admin' | 'moderator' | 'editor' | 'viewer';

export type AdminUser = { id: string; name: string; email: string; role: Role; status: 'active' | 'suspended' };
export type ModerationItem = { id: string; type: 'video' | 'comment' | 'post'; title: string; reason: string; status: 'pending' | 'approved' | 'rejected' };
export type CourseApproval = { id: string; courseTitle: string; instructor: string; submittedAt: string; status: 'pending' | 'approved' | 'changes_requested' };
export type ReportItem = { id: string; targetType: 'video' | 'comment' | 'user'; targetRef: string; reportReason: string; reportedAt: string; priority: 'low' | 'medium' | 'high' };
export type Analytics = { dau: number; newUsers7d: number; pendingModeration: number; completionRate: number };
