// src/stores/auth.ts
import { defineStore } from 'pinia'

type Role = 'ANONYMOUS' | 'USER' | 'ADMIN'

export const useAuth = defineStore('auth', {
  state: () => ({
    token: '' as string, // access token (court)
    role: 'ANONYMOUS' as Role, // pour l’UI
  }),
  actions: {
    setToken(token: string) {
      this.token = token
      try {
        const payload = JSON.parse(atob(token.split('.')[1] || ''))
        const roles: string[] = payload?.roles ?? []
        this.role = roles.includes('ADMIN')
          ? 'ADMIN'
          : roles.includes('USER')
            ? 'USER'
            : 'ANONYMOUS'
      } catch {
        this.role = 'ANONYMOUS'
      }
    },
    // Variante plus sûre : appeler /api/me et setter role depuis la réponse serveur.
    logout() {
      this.token = ''
      this.role = 'ANONYMOUS'
    },
  },
})
