<script setup lang="ts">
const props = defineProps<{
  icon: string,
  label?: string,
  path?: string
}>()
</script>

<template>
  <UButton
      :icon="props.icon"
      size="sm"
      color="primary"
      variant="ghost"
      :label="props.label"
      :trailing="false"
      :to="props.path"
  />
</template>
