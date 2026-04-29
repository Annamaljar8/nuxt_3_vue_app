
import { defineStore } from 'pinia';
import type { AuthState } from '@/types/auth.types';

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isLoggedIn: false,
    userId: null,
  }),
  actions: {
    login(userId: string) {
      this.isLoggedIn = true
      this.userId = userId
      localStorage.setItem('auth', JSON.stringify({ isLoggedIn: true, userId }))
    },
    logout() {
      this.isLoggedIn = false
      this.userId = null
      localStorage.removeItem('auth')
    },
    hydrate() {
      if (process.client) {
        const data = localStorage.getItem('auth')
        if (data) {
          const parsed = JSON.parse(data)
          this.isLoggedIn = parsed.isLoggedIn
          this.userId = parsed.userId
        }
      }
    },
  },
})
