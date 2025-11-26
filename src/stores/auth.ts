// src/stores/auth.ts
import { defineStore } from 'pinia'
import type { Role } from '@/types/router'

interface User {
  id: number
  mail: string
  role: Role
}

function decodeToken(token: string | null): User {
  if (!token) {
    return {
      id: 0,
      mail: '',
      role: 'ANONYMOUS',
    }
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const roles: string[] = payload?.roles ?? []

    return {
      id: payload?.userId || payload?.id || 0,
      role: roles.includes('ADMIN') ? 'ADMIN' : roles.includes('USER') ? 'USER' : 'ANONYMOUS',
      mail: payload?.sub || '',
    }
  } catch (error) {
    console.error('Token invalide:', error)
    // En cas d'erreur, on retourne un utilisateur anonyme
    return {
      id: 0,
      mail: '',
      role: 'ANONYMOUS',
    }
  }
}

export const useAuth = defineStore('auth', {
  state: () => ({
    user: decodeToken(localStorage.getItem('token')) as User,
    token: localStorage.getItem('token') as string | null, // ici le token est stocké
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && state.user.role !== 'ANONYMOUS',
    isAdmin: (state) => state.user.role === 'ADMIN',
    isUser: (state) => state.user.role === 'USER',
  },

  actions: {
    setToken(token: string) {
      localStorage.setItem('token', token)
      this.token = token
      this.user = decodeToken(token)
    },

    logout() {
      this.token = null
      this.user = {
        id: 0,
        mail: '',
        role: 'ANONYMOUS',
      }
      localStorage.removeItem('token')
    },
  },
})
