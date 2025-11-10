// src/stores/auth.ts
import { defineStore } from 'pinia'

export const useAuth = defineStore('auth', {
  state: () => ({
    token: '' as string,
    role: 'ANONYMOUS' as 'ANONYMOUS' | 'USER' | 'ADMIN',
  }),
  actions: {
    setAuth(token: string, role: 'USER' | 'ADMIN') {
      this.token = token
      this.role = role
    },
    logout() {
      this.token = ''
      this.role = 'ANONYMOUS'
    },
  },
})
