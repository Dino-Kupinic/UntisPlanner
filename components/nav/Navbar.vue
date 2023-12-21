<script setup lang="ts">

</script>

<template>
  <UContainer class="flex underline-offset-1">
    <UContainer class="flex-1">
      <NavPoint size="xl" icon="i-heroicons-calendar-days" label="Untis Planner" path="https://htl-steyr.ac.at"></NavPoint>
    </UContainer>
    <UContainer class="space-x-4">
      <NavBarThemeToggle class="self-center"/>
      <NavPoint icon="i-heroicons-cog-6-tooth" label="Settings" path="/settings"></NavPoint>
    </UContainer>
  </UContainer>
</template>