<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <div class="ml-2 mr-2 mt-2 sm:mt-0 w-full lg:w-48 md:w-36 sm:w-24">
    <p class="text-sm md:text-base">{{ label }}</p>
    <slot/>
  </div>
</template>
