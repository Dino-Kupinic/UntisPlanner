<script setup lang="ts">
import {version as versionVue} from "vue"
import {version as versionNuxt} from "nuxt/package.json"

const runtime = useRuntimeConfig()
const appVersion = useAppVersion()

const buildTime = new Date(runtime.public.buildTime as number)
const timeSinceBuild = useTimeAgo(buildTime)

const gitSha = runtime.public.gitHeadSha as string
const gitShaFormatted = gitSha.slice(0, 10)
const vueVersion = versionVue
const nuxtVersion = versionNuxt
</script>

<template>
  <VDropdown :distance="2">
    <UButton icon="i-heroicons-information-circle-20-solid" label="Info"/>
    <template #popper>
      <div class="p-3 grid gap-y-3 gap-x-2 grid-cols-[max-content_1fr] items-center">
        <UIcon class="w-5 h-5" name="i-heroicons-cube-20-solid"></UIcon>
        <time :datetime="buildTime.toISOString()" :title="buildTime.toLocaleString()">
          built {{ timeSinceBuild }} (<code>{{ gitShaFormatted }}</code>)
        </time>

        <VueIcon/>
        <code v-if="vueVersion">Vue {{ vueVersion }}</code>
        <div v-else>Couldn't fetch version</div>
        <NuxtIcon/>
        <code v-if="nuxtVersion">Nuxt {{ nuxtVersion }}</code>
        <div v-else>Couldn't fetch version</div>
        <code>{{appVersion}}</code>
      </div>
      <div class="w-100 p-2 text-center">
        <NuxtLink class="text-primary hover:text-green-300" to="https://github.com/Dino-Kupinic/UntisPlanner/issues"
                  target="_blank"
                  title="Head to Issues">
          Report a bug
        </NuxtLink>
      </div>
    </template>
  </VDropdown>
</template>

