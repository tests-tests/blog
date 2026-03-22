export default defineNuxtConfig({
  compatibilityDate: '2026-03-22',
  modules: ['@nuxt/content', '@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  app: {
    baseURL: '/blog/'
  }
})
