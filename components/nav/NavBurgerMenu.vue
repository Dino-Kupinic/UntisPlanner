<script setup lang="ts">
const revealMenu = ref<boolean>(false)
</script>

<template>
  <UButton icon="i-heroicons-bars-3-solid" variant="soft" size="lg" @click="revealMenu = !revealMenu"/>
  <div v-if="revealMenu" class="absolute top-16 z-50 inset-0 overflow-x-hidden">
    <div class="h-16 bg-gray-50 flex flex-row gap-5 justify-center items-center border-b border-neutral-300 dark:bg-gray-900 dark:border-gray-700">
      <NavItem @click="revealMenu = false" icon="i-heroicons-cog-6-tooth" path="/settings" size="xs" label="Settings"/>
      <div class="h-10"></div>
      <CalendarInfoButton button-size="xs"/>
      <div class="h-10"></div>
      <NavBarThemeToggle class="self-center" />
    </div>
  </div>
</template>
