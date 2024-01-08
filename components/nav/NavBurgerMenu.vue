<script setup lang="ts">

const items = [
  [{
    label: 'Settings',
    icon: "i-heroicons-cog-6-tooth",
    shortcuts: ['S']
  }], [{
    label: 'Info',
    icon: 'i-heroicons-question-mark-circle-20-solid',
    shortcuts: ['I'],
    click: () => {
      console.log('Hier wird eine Info stehen!')
    }
  }], [{
    label: 'Color Mode',
    slot: 'colorMode',
    shortcuts: ['C']
  }]
]
</script>

<template>
  <UDropdown :items="items" mode="hover">
    <template #colorMode>
      <NavBarThemeToggle class="self-center"></NavBarThemeToggle>
    </template>
    <NavPoint icon="i-heroicons-bars-3-solid"></NavPoint>
  </UDropdown>
</template>
