<script setup lang="ts">
import {useScreens} from "vue-screen-utils"
import type {AttributeConfig} from "v-calendar/dist/types/src/utils/attribute.d.ts"
import type {DateRangeSource} from "v-calendar/dist/types/src/utils/date/range.d.ts"
import {useConfigStore} from "~/stores/configStore"


const colorMode = useColorMode()
const appConfig = useAppConfig()

const {mapCurrent} = useScreens({xs: "0px", sm: "640px", md: "768px", lg: "1024px"})
const columns = mapCurrent({lg: 4, md: 3, sm: 2, xs: 1}, 1)
const rows = mapCurrent({xs: 1}, 2)
const isDark = computed(() => {
  return colorMode.value !== "light"
})

const attributes = ref<AttributeConfig[]>([{}])

const holidayColor = "red"
const {holidays} = storeToRefs(useHolidayExportStore())
const configStore = useConfigStore()
const {federalState} = storeToRefs(useConfigStore())

const disabledDates: DateRangeSource[] = [{
  repeat: {
    weekdays: [7, 1],
  },
}]


onMounted(() => {
  exportAllAttributes()
})

watch(federalState, () => {
  attributes.value = []
  exportAllAttributes()
})

function addSemesterHoliday(): AttributeConfig {
  const holidayStart = null
  const holidayEnd = null

  switch (federalState.value) {
    case "Vienna":
    case "Lower Austria":

  }

  const temp: AttributeConfig = {
    key: "Semester holiday",
    highlight: holidayColor,

  }

  return {}
}

function padout(number: number) {
  return (number < 10) ? parseInt("0" + number) : parseInt("" + number)
}


function exportAllAttributes() {
  if (holidays.value.length > 0) {
    const customHolidays = getCustomHolidays(holidays.value)
    for (const holiday of customHolidays) {
      attributes.value.push(holiday)
    }
  }
  attributes.value.push(getFederalStateHoliday())

  const allHolidays = getAllHolidays(2024, "en")
  for (const holiday of allHolidays) {
    attributes.value.push(holiday)
  }
}
</script>

<template>
  <div class="flex flex-wrap justify-center mt-6">
    <!-- @vue-ignore -->
    <VCalendar
      show-weeknumbers
      :is-dark="isDark"
      :disabled-dates="disabledDates"
      :color="appConfig.ui.primary"
      :attributes
      :columns
      :rows
    />
  </div>
</template>

<style scoped>
.vc-bg-blue {
  background-color: rgba(42, 42, 42, 0.15);
}

.vc-bg-blue-600 {
  background-color: rgba(42, 42, 42, 0.9);
}
</style>