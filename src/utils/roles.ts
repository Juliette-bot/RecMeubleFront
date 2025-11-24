import type { Role, ProtectedRole } from '@/types/router'
import { useAuth } from '@/stores/auth'

export function isProtectedRole(role: Role): role is ProtectedRole {
  const auth = useAuth()

  return auth.user?.role !== 'ANONYMOUS'
}
