// https://nuxt.com/docs/api/configuration/nuxt-config
import {isDevelopment} from "std-env"

export default defineNuxtConfig({
  css: ['~/assets/main.css'],
  app: {
    head: {
      title: "UntisPlanner",
    },
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  imports: {
    autoImport: true,
  },
  ssr: false,
  spaLoadingTemplate: true,
  vue: {
    defineModel: true,
    propsDestructure: true,
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  devServer: {
    port: 3001,
  },
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
  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
  },
  modules: [
    "@vueuse/nuxt",
    "@vite-pwa/nuxt",
    "@nuxt/ui",
    "@samk-dev/nuxt-vcalendar",
    "nuxt-vitest",
    ...(isDevelopment ? [] : ["nuxt-security"]),
  ],
  sourcemap: isDevelopment,
  pwa: {
    manifest: {
      name: "UntisPlanner",
      description: "Intuitive Untis Planner",
      theme_color: "#ffffff",
      icons: [
        {
          src: "untisplanner-icon-192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "untisplanner-icon-512.png",
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
  typescript: {
    typeCheck: true,
    strict: true,
  },
})