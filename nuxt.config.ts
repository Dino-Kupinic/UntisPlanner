// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  ssr: false,
  modules: [
    "@vueuse/nuxt",
    "@vite-pwa/nuxt",
    "@nuxt/ui",
    "nuxt-vitest",
    "@samk-dev/nuxt-vcalendar",
    "@pinia/nuxt",
  ],
  pwa: {
    /* PWA options */
  },
})