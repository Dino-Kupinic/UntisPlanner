<script setup lang="ts">
import "~/styles/overrides.css"

const {locale} = useI18n()
const localeCookie = useCookie("locale")

onMounted(() => {
  if (!localeCookie.value) {
    localeCookie.value = "English"
  }
  locale.value = localeCookie.value
})
</script>

<template>
<!--  <NuxtPwaManifest/>-->
  <NuxtLoadingIndicator/>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>
