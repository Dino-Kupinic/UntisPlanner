<script setup lang="ts">
import HeartIcon from "~/components/icon/HeartIcon.vue"
import {useAppVersion} from "~/composables/useAppVersion"

const appVersion = useAppVersion()
</script>

<template>
  <footer>
    <div
      class="flex w-full static items-center max-sm:space-y-3 max-sm:flex-col max-sm:flex-wrap max-sm:content-center max-sm:items-center border-t border-neutral-300 dark:bg-gray-900 dark:border-gray-800 pt-3 pb-5">
      <div class="flex basis-1/3 items-center justify-center">
        <div class="w-[30px] h-[30px]">
          <NuxtLink to="https://github.com/Dino-Kupinic/UntisPlanner" target="_blank">
            <GithubIcon class="m-auto" width="30" height="30"/>
          </NuxtLink>
        </div>
      </div>
      <div class="basis-1/3 text-center">
        <p>Made with
          <HeartIcon class="inline-block pb-0.5"/>
        </p>
        <p>UntisPlanner v{{ appVersion }}</p>
      </div>
      <div class="basis-1/3 text-sm text-center">
        Released under the
        <p>
          <NuxtLink to="https://github.com/Dino-Kupinic/UntisPlanner/blob/master/LICENSE">GNU General Public License
            v3.0
          </NuxtLink>
        </p>
      </div>
    </div>
  </footer>
</template>

