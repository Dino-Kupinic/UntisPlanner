<script setup lang="ts">
import type {DropdownItem} from "#ui/types"

const items: DropdownItem[][] = [
  [{
    label: "Settings",
    slot: "settings",
  }],
  [{
    label: "Info",
    slot: "info",
  }],
  [{
    label: "Color Mode",
    slot: "colorMode",
  }],
]
</script>

<template>
  <UDropdown :items="items" mode="click">
    <template #settings>
      <NavItem icon="i-heroicons-cog-6-tooth" size="xs" label="Settings"/>
    </template>

    <template #info>
      <CalendarInfoButton button-size="xs"/>
    </template>

    <template #colorMode>
      <NavBarThemeToggle class="self-center"></NavBarThemeToggle>
    </template>

    <NavItem icon="i-heroicons-bars-3-solid"></NavItem>
  </UDropdown>
</template>
