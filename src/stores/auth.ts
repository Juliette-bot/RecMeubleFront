import { defineStore } from 'pinia'
import { login as apiLogin, logout as apiLogout } from '../api/auth'

export const useAuth = defineStore('auth', {
  state: () => ({
    accessToken: '' as string,
  }),
  actions: {
    async login(email: string, password: string) {
      this.accessToken = await apiLogin(email, password)
    },
    async logout() {
      await apiLogout()
      this.accessToken = ''
    },
    isAuthenticated() {
      return this.accessToken !== ''
    },
  },
})
