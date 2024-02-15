<script setup lang="ts">
</script>

<template>
  <UContainer
    class="flex underline-offset-1 w-full h-16 border-b border-neutral-300 dark:bg-gray-900 dark:border-gray-700">
    <UContainer class="flex flex-1 items-center">
      <ULink to="/">
        <UntisPlannerLogo />
      </ULink>
    </UContainer>
    <UContainer class="flex space-x-5 max-[775px]:hidden">
      <NavBarThemeToggle class="self-center"/>
      <NavItem icon="i-heroicons-cog-6-tooth" :label="$t('NavSettingsButton')" size="sm" path="/settings" />
      <CalendarInfoButton/>
    </UContainer>
    <UContainer id="BurgerMenuContainer" class="min-[775px]:hidden align-center p-0 mr-3 mt-1">
      <NavBurgerMenu></NavBurgerMenu>
    </UContainer>
  </UContainer>
</template>