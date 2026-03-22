export default defineNuxtConfig({
  compatibilityDate: '2026-03-22',
  modules: ['@nuxt/content', '@nuxtjs/color-mode'],
  app: {
    baseURL: '/blog/'
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: ''
  }
})
