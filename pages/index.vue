<script setup lang="ts">
const isLoading = ref<boolean>(false)
const showTable = ref<boolean>(false)

function generate() {
  isLoading.value = true
  showTable.value = false
  setTimeout(() => {
    isLoading.value = false
    showTable.value = true
  }, 1000)
}
</script>

<template>
  <main class="h-screen">
    <GeneratorSettings></GeneratorSettings>
    <Calendar/>
    <div class="flex justify-center m-3">
      <UButton :loading="isLoading" @click="generate()" icon="i-material-symbols-magic-button" label="Generate"/>
    </div>
    <div v-if="showTable">
      <ExportTable/>
      <ExportTableButton/>
    </div>
  </main>
</template>
