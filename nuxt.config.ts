// https://nuxt.com/docs/api/configuration/nuxt-config
import {isDevelopment} from "std-env"

export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  vue: {
    defineModel: true,
    propsDestructure: true
  },
  ssr: false,
  modules: [
    "@vueuse/nuxt",
    "@vite-pwa/nuxt",
    "@nuxt/ui",
    "nuxt-vitest",
    "@samk-dev/nuxt-vcalendar",
    "@pinia/nuxt",
    ...(isDevelopment) ? [] : ['nuxt-security'],
  ],
  sourcemap: isDevelopment,
  pwa: {
    manifest: {
      name: "UntisPlanner",
      description: "Intuitive Untis Planner",
      theme_color: '#ffffff',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  },
})