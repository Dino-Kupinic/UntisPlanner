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

const skeletonRows = computed(() => {
  // TODO: Replace with actual number of rows
  return 4
})
</script>

<template>
  <main class="h-100 sm:h-screen pb-24">
    <GeneratorSettings/>
    <Calendar/>
    <div class="flex justify-center m-5 w-100">
      <UButton :loading="isLoading" @click="generate()" icon="i-material-symbols-magic-button" label="Generate" class="w-100"/>
    </div>
    <div v-if="isLoading" class="flex flex-col justify-center mt-8">
      <ExportTableSkeleton :rows="skeletonRows" />
    </div>
    <div v-if="showTable">
      <ExportTable/>
      <ExportTableButton/>
    </div>
  </main>
</template>
