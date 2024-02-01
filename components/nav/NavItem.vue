<script setup lang="ts">
import type {ButtonSize} from "#ui/types";

export interface Props{
  icon: string,
  label?: string,
  size?: ButtonSize,
  path?: string,
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: "xl",
  color: "primary"
})
</script>

<template>
  <UButton
      padded
      :icon="props.icon"
      :size="props.size"
      :color="props.color"
      variant="soft"
      :label="props.label"
      :trailing="false"
      :to="props.path"
      target="_self"
  />
</template>
