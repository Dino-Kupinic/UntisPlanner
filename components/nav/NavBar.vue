<script setup lang="ts">
</script>

<template>
  <UContainer
    class="flex underline-offset-1 w-full h-30 border-b border-neutral-300 dark:bg-gray-900 dark:border-gray-800">
    <UContainer class="flex flex-1 items-center">
      <Logo />
    </UContainer>
    <UContainer class="flex space-x-5 max-[775px]:hidden">
      <NavBarThemeToggle class="self-center"/>
      <NavItem icon="i-heroicons-cog-6-tooth" label="Settings" path="/settings"></NavItem>
      <CalendarInfoButton/>
    </UContainer>
    <UContainer id="BurgerMenuContainer" class="space-x-5 min-[775px]:hidden">
      <NavBurgerMenu></NavBurgerMenu>
    </UContainer>
  </UContainer>
</template>