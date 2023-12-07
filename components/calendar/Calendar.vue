<script setup lang="ts">
const date = ref(new Date())
const colorMode = useColorMode()

const attrs = ref([
  {
    key: "today",
    highlight: {
      color: "green",
      fillMode: "solid",
    },
    dates: new Date(),
  },
])

const isDark = computed(() => {
  return colorMode.value !== "light"
})
</script>

<template>
  <div>
    <ClientOnly fallback-tag="span" fallback="Loading Calendar...">
      <h2>Calendar</h2>
      <!-- @vue-ignore TODO: Fix type issues with attributes -->
      <VCalendar
        v-model="date"
        :attributes="attrs"
        :is-dark="isDark"
      />
    </ClientOnly>
  </div>
</template>
