<script setup lang="ts">
//TODO: add animation, maybe with https://www.impressivewebs.com/animate-display-block-none/
</script>

<template>
  <UContainer class="flex underline-offset-1 h-30">
    <UContainer class="flex-1">
      <NavItem size="3xl" icon="i-heroicons-calendar-days" label="Untis Planner" path="/"></NavItem>
    </UContainer>
    <UContainer class="flex space-x-5 max-[775px]:hidden">
      <NavBarThemeToggle class="self-center"/>
      <NavItem icon="i-heroicons-cog-6-tooth" label="Settings" path="/settings"></NavItem>
      <CalendarInfoButton />
    </UContainer>
    <UContainer class="space-x-5 min-[775px]:hidden">
      <NavBurgerMenu></NavBurgerMenu>
    </UContainer>
  </UContainer>
</template>