<script setup lang="ts">
import colors from "#tailwind-config/theme/colors"
import SchoolHolidayPicker from "~/components/calendar/SchoolHolidayPicker.vue"

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
  <UButton>
    <ULink to="/">Home</ULink>
  </UButton>


  <div class="flex flex-col justify-center items-center">
    <h2>Choose your Theme</h2>
    <div>
      <ColorPickerPill v-for="color in primaryColors" :key="color.value" :color="color" :selected="primary"
                       @select="primary = color"/>
    </div>

    <hr class="border-gray-200 dark:border-gray-800 my-2">

    <div>
      <ColorPickerPill v-for="color in grayColors" :key="color.value" :color="color" :selected="gray"
                       @select="gray = color"/>
    </div>
  </div>

  <hr class="border-gray-200 dark:border-gray-800 my-2">

  <div class="flex flex-col justify-center items-center">
    <div>
      <SchoolHolidayPicker></SchoolHolidayPicker>
    </div>
  </div>
</template>
