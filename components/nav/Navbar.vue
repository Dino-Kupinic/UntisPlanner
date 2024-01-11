<script setup lang="ts">
import NavBurgerMenu from "~/components/nav/NavBurgerMenu.vue";

//TODO: add animation, maybe with https://www.impressivewebs.com/animate-display-block-none/
</script>

<template>
  <UContainer class="flex underline-offset-1 h-30">
    <UContainer class="flex-1">
      <NavPoint size="3xl" icon="i-heroicons-calendar-days" label="Untis Planner" path="/"></NavPoint>
    </UContainer>
    <UContainer class="space-x-5 max-[775px]:hidden">
      <NavBarThemeToggle class="self-center"/>
      <NavPoint icon="i-heroicons-cog-6-tooth" label="Settings" path="/settings"></NavPoint>
      <CalendarInfoButton />
    </UContainer>
    <UContainer class="space-x-5 min-[775px]:hidden animate-pulse">
      <NavBurgerMenu></NavBurgerMenu>
    </UContainer>
  </UContainer>
</template>