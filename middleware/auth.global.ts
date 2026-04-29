import { useAuthStore } from '~/stores/auth'
import { defineNuxtRouteMiddleware, navigateTo } from '#app'

export default defineNuxtRouteMiddleware((to) => {
  if (to.path.startsWith('/account')) {
    const auth = useAuthStore()
    auth.hydrate()
    if (!auth.isLoggedIn) {
      return navigateTo('/login')
    }
  }
})