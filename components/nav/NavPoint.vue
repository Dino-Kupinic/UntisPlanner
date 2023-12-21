<script setup lang="ts">
import type {ButtonSize} from "#ui/types";

export interface Props{
  icon: string,
  label?: string,
  size?: ButtonSize,
  path?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: "xl"
})
</script>

<template>
  <UButton
      :icon="props.icon"
      :size="props.size"
      color="primary"
      variant="ghost"
      :label="props.label"
      :trailing="false"
      :to="props.path"
      target="_blank"
  />
</template>
