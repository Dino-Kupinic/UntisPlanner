<script setup lang="ts">
const props = defineProps<{
  icon: string
  text: string
  path: string
}>()
</script>

<template>
  <UIcon :name="props.icon" />
  <span>{{props.text}}</span>
</template>
