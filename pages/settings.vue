<script setup lang="ts">
import colors from "#tailwind-config/theme/colors"

const appConfig = useAppConfig()
const colorMode = useColorMode()

interface Colors {
  [key: string]: {
    [shade: number]: string;
  };
}

const primaryColors = computed(() => appConfig.ui.colors.filter(color => color !== "primary").map(color => ({
  value: color,
  text: color,
  hex: (colors as Colors)[color][colorMode.value === "dark" ? 400 : 500],
})))

const primary = computed({
  get() {
    const selected = primaryColors.value.find(option => option.value === appConfig.ui.primary)
    return selected || {value: ""}
  },
  set(option) {
    appConfig.ui.primary = option.value

    window.localStorage.setItem("nuxt-ui-primary", appConfig.ui.primary)
  },
})

const grayColors = computed(() => ["slate", "cool", "zinc", "neutral", "stone"].map(color => ({
  value: color,
  text: color,
  hex: (colors as Colors)[color][colorMode.value === "dark" ? 400 : 500],
})))

const gray = computed({
  get() {
    const selected = grayColors.value.find(option => option.value === appConfig.ui.gray)
    return selected || {value: ""}
  },
  set(option) {
    appConfig.ui.gray = option.value

    window.localStorage.setItem("nuxt-ui-gray", appConfig.ui.gray)
  },
})
</script>

<template>
  <main class="h-screen pl-8 pr-8">
    <div class="flex flex-col justify-center items-center pl-8 pr-8 sm:w-[600px] sm:m-auto">
      <p class="text-xl m-3 sm:justify-start sm:w-full">Theme</p>
      <div class="w-2/3 sm:w-full">
        <ColorPickerPill v-for="color in primaryColors" :key="color.value" :color="color" :selected="primary"
                         @select="primary = color"/>
      </div>
      <hr class="border-gray-200 dark:border-gray-800 my-2">
      <div class="w-2/3 sm:w-full">
        <ColorPickerPill v-for="color in grayColors" :key="color.value" :color="color" :selected="gray"
                         @select="gray = color"/>
      </div>
    </div>
    <hr class="border-gray-200 dark:border-gray-800 my-4 sm:w-[600px] m-auto">
    <div class="flex flex-col justify-center items-center">
      <div class="w-full sm:w-[600px] pl-8 pr-8">
        <SchoolHolidayPicker/>
      </div>
    </div>
  </main>
</template>
