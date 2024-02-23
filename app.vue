<script setup lang="ts">
import "~/assets/styles/overrides.css"

const {locale} = useI18n()
const localeCookie = useCookie("locale")

const setLocale = () => {
  if (!localeCookie.value) {
    localeCookie.value = "English"
  }
  locale.value = localeCookie.value
}

const appConfig = useAppConfig()
const setColorTheme = () => {
  if (localStorage.getItem("nuxt-ui-primary"))
    appConfig.ui.primary = localStorage.getItem("nuxt-ui-primary") as string
  if (localStorage.getItem("nuxt-ui-gray"))
    appConfig.ui.gray = localStorage.getItem("nuxt-ui-gray") as string
}

onMounted(() => {
  setLocale()
  setColorTheme()
})
</script>

<template>
<!--  <NuxtPwaManifest/>-->
  <NuxtLoadingIndicator/>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>
