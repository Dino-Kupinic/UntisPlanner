<script setup lang="ts">
import HeartIcon from "~/components/icon/HeartIcon.vue"
import {useAppVersion} from "~/composables/useAppVersion"
const appVersion = useAppVersion();
</script>

<template>
  <footer>
    <br>
    <div class="flex items-center max-sm:space-y-3 max-sm:flex-col max-sm:flex-wrap max-sm:content-center max-sm:items-center">
      <div class="basis-1/3">

        <GithubIcon class="m-auto" width="30" height="30"/>

      </div>

      <div class="basis-1/3 text-center">
        <p>Made with
          <HeartIcon class="inline-block pb-0.5"/>
        </p>
      </div>

      <div class="basis-1/3 text-sm text-center">
        <p>GNU General Public License v3.0</p>
        <p>v{{appVersion}}</p>
      </div>
    </div>
  </footer>
</template>

