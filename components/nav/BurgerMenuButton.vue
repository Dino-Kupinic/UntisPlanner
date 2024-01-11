<script setup lang="ts">
import type {ButtonSize} from "#ui/types";

export interface Props{
  icon: string,
  label?: string,
  size?: ButtonSize,
  path?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: "sm"
})
</script>

<template>
  <UButton
      padded
      :icon="props.icon"
      :size="props.size"
      color="gray"
      variant="soft"
      :label="props.label"
      :trailing="false"
      :to="props.path"
      target="_self"
  />
</template>
