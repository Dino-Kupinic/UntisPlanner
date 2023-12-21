<script setup lang="ts">
let lightMode = false;
const iconSun = "i-heroicons-sun-16-solid";
const iconMoon = "i-heroicons-moon-16-solid";
let iconToggle = iconMoon;

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
    label: 'Toggle Color Mode',
    icon: 'iconToggle',
    click: () => {
      if (lightMode) {
        iconToggle = iconMoon;
        lightMode = false;
      } else {
        iconToggle = iconSun;
        lightMode = true;
      }
    }
  }]
]
</script>

<template>
  <UDropdown :items="items" mode="hover">
    <NavPoint icon="i-heroicons-bars-3-solid"></NavPoint>
  </UDropdown>
</template>
