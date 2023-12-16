<script setup lang="ts">
import "~/styles/overrides.css"
</script>

<template>
  <NuxtPwaManifest/>
  <NuxtLoadingIndicator/>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>
