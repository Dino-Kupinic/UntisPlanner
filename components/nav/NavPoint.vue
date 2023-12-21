<script setup lang="ts">
const props = defineProps<{
  icon: string
  text: string
  path: string
}>()
</script>

<template>
  <div>
    <UIcon :name="props.icon" />
    <span class="">{{props.text}}</span>
  </div>
</template>
