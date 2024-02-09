<script setup lang="ts">
const viewport = useViewport()

defineProps<{
  rows: number
}>()
</script>

<template>
  <div v-if="viewport.isGreaterThan('tablet')" class="flex justify-center items-center space-x-4">
    <div class="space-y-3">
      <USkeleton class="h-8 w-[200px]"/>
      <div v-for="i in rows" :key="i" class="flex flex-row gap-2">
        <USkeleton class="h-8 w-[50px]"/>
        <USkeleton class="h-8 w-[450px]"/>
      </div>
    </div>
    <div class="space-y-3">
      <USkeleton class="h-8 w-[100px]"/>
      <div v-for="i in rows" :key="i" class="flex flex-row gap-2">
        <USkeleton class="h-8 w-[50px]"/>
        <USkeleton class="h-8 w-[450px]"/>
      </div>
    </div>
  </div>
  <div v-else class="flex justify-center items-center space-x-4">
    <div class="space-y-3">
      <USkeleton class="h-8 w-[200px]"/>
      <div v-for="i in rows" :key="i" class="flex flex-row gap-2">
        <USkeleton class="h-8 w-[50px]"/>
        <USkeleton class="h-8 w-[300px]"/>
      </div>
    </div>
  </div>
  <USkeleton class="h-8 w-[100px] m-auto mt-10"/>
</template>
