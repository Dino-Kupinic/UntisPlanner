import pkg from "./package.json"
import {execaSync} from "execa"

const sw = process.env.SW === 'true'

export default defineNuxtConfig({
  app: {
    head: {
      title: "UntisPlanner",
    },
  },
  css: [
    "~/assets/styles/main.css",
  ],
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
    propsDestructure: true,
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  runtimeConfig: {
    public: {
      buildTime: Date.now(),
      gitHeadSha: execaSync("git", ["rev-parse", "HEAD"]).stdout.trim(),
      clientVersion: pkg.version,
    },
  },
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
  i18n: {
    vueI18n: './i18n.config.ts' 
  },
  modules: [
    "@vueuse/nuxt",
    "@vite-pwa/nuxt",
    "@nuxt/ui",
    "@samk-dev/nuxt-vcalendar",
    "@nuxt/test-utils/module",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/i18n",
    "floating-vue/nuxt",
    "nuxt-viewport",
    "nuxt-icon",
  ],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  pwa: {
    strategies: sw ? 'injectManifest' : 'generateSW',
    srcDir: sw ? 'service-worker' : undefined,
    filename: sw ? 'sw.ts' : undefined,
    registerType: 'autoUpdate',
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
        {
          src: "untisplanner-icon-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: 'any maskable'
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  },
  typescript: {
    typeCheck: true,
    strict: true,
  },
})