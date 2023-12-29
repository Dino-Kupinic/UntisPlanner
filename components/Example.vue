<script setup lang="ts">
const store = useExampleStore()

</script>

<template>
  <p>Example</p>
  <p>count: {{ store.count }}</p>
  <button @click="store.increment()">increment</button>
</template>

<style scoped>

</style>