import { verifyToken } from '@/lib/auth';
import { Role } from '@/types/admin';

const rolePermissions: Record<Role, string[]> = {
  admin: ['users:manage', 'content:moderate', 'courses:approve', 'reports:review', 'analytics:view'],
  moderator: ['content:moderate', 'reports:review', 'analytics:view'],
  editor: ['courses:approve', 'analytics:view'],
  viewer: ['analytics:view']
};

export function hasPermission(role: Role, permission: string) {
  return rolePermissions[role]?.includes(permission) ?? false;
}

export function getRoleFromToken(authHeader?: string): Role {
  if (!authHeader?.startsWith('Bearer ')) return 'viewer';
  try {
    const token = authHeader.replace('Bearer ', '');
    const decoded = verifyToken(token) as { role?: Role };
    return decoded.role ?? 'viewer';
  } catch {
    return 'viewer';
  }
}
