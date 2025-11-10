import type { Role, ProtectedRole } from '@/types/router'

export function isProtectedRole(role: Role): role is ProtectedRole {
  return role !== 'ANONYMOUS'
}
