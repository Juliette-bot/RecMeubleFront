// src/types/router.d.ts
import 'vue-router'

export type Role = 'ANONYMOUS' | 'USER' | 'ADMIN'
export type ProtectedRole = Exclude<Role, 'ANONYMOUS'>

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    roles?: ProtectedRole[] // ex: ['USER'] ou ['ADMIN']
  }
}
