export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],

  build: {
    transpile: ['vuetify']
  },

  vite: {
    ssr: {
      noExternal: ['vuetify']
    }
  },

  compatibilityDate: '2026-04-29'
})