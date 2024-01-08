<script setup lang="ts">

import NavBurgerMenu from "~/components/nav/NavBurgerMenu.vue";
</script>

<template>
  <UContainer class="flex underline-offset-1 h-30">
    <UContainer class="flex-1">
      <NavPoint size="3xl" icon="i-heroicons-calendar-days" label="Untis Planner" path="/"></NavPoint>
    </UContainer>
    <UContainer class="max-md space-x-5 md:hidden">
      <NavBarThemeToggle class="self-center"/>
      <NavPoint icon="i-heroicons-cog-6-tooth" label="Settings" path="/settings"></NavPoint>
      <NavPoint icon="i-heroicons-question-mark-circle-20-solid" label="Info"></NavPoint>
      <NavBurgerMenu></NavBurgerMenu>
    </UContainer>
  </UContainer>
</template>