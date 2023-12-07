// https://nuxt.com/docs/api/configuration/nuxt-config
import {isDevelopment} from "std-env"

export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  vue: {
    defineModel: true,
    propsDestructure: true,
  },
  ssr: false,
  nitro: {
    esbuild: {
      options: {
        target: "esnext",
      },
    },
    prerender: {
      routes: ["/"],
    },
  },
  imports: {
    autoImport: true,
  },
  modules: [
    "@vueuse/nuxt",
    "@vite-pwa/nuxt",
    "@nuxt/ui",
    "@samk-dev/nuxt-vcalendar",
    "@pinia/nuxt",
    "nuxt-vitest",
    ...(isDevelopment) ? [] : ["nuxt-security"],
  ],
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
  },
  sourcemap: isDevelopment,
  pwa: {
    manifest: {
      name: "UntisPlanner",
      description: "Intuitive Untis Planner",
      theme_color: "#ffffff",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    registerType: "autoUpdate",
    workbox: {
      navigateFallback: "/",
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: "module",
    },
  },
})