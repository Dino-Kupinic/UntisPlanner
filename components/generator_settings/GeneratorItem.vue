<script setup lang="ts">
defineProps<{
  label: string
  badge?: string
}>()
</script>

<template>
  <div class="ml-2 mr-2 mt-2 sm:mt-0 w-full lg:w-48 md:w-36 sm:w-24">
    <div class="flex flex-row items-center">
      <span class="text-sm md:text-base mr-2">{{ label }}</span>
      <UBadge v-if="badge" size="xs">{{ badge }}</UBadge>
    </div>
    <slot/>
  </div>
</template>
