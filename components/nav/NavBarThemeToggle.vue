<script setup lang="ts">
const selected = ref<boolean>(false)
const colorMode = useColorMode()

onMounted(() => {
  if (!colorMode.preference)
    colorMode.preference = "system"

  const currentMode = colorMode.value
  selected.value = currentMode === "dark"
})

watch(selected, () => {
  colorMode.preference = selected.value ? "dark" : "light"
})
</script>

<template>
  <UToggle
    size="lg"
    off-icon="i-heroicons-sun-20-solid"
    on-icon="i-heroicons-moon-20-solid"
    v-model="selected"
  />
</template>


