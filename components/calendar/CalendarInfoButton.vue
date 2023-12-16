<script setup lang="ts">
const runtime = useRuntimeConfig()

const buildTime = new Date(runtime.public.buildTime as number)
const timeSinceBuild = useTimeAgo(buildTime)

const gitSha = runtime.public.gitHeadSha.slice(0, 10) as string
const vueVersion = runtime.public.vueVersion as string
const nuxtVersion = runtime.public.nuxtVersion as string
</script>

<template>
  <VDropdown :distance="2">
    <UButton icon="i-heroicons-information-circle-20-solid" label="Info"/>
    <template #popper>
      <div class="p-4">
        <UIcon name="i-heroicons-cube-20-solid"></UIcon>
        <time :datetime="buildTime.toISOString()" :title="buildTime.toLocaleString()">
          built {{ timeSinceBuild }} (<code>{{ gitSha }}</code>)
        </time>
      </div>
      <VueIcon/>
      <p>Vue {{ vueVersion }}</p>
      <NuxtIcon/>
      <p>Nuxt {{ nuxtVersion }}</p>
    </template>
  </VDropdown>
</template>

