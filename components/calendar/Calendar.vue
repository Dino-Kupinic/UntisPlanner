<script setup lang="ts">
import type {AttributeConfig} from "v-calendar/dist/types/src/utils/attribute.d.ts"
import type {DateRangeSource} from "v-calendar/dist/types/src/utils/date/range.d.ts"
import type {PageAddress} from "v-calendar/dist/types/src/utils/page.d.ts"
import {useScreens} from "vue-screen-utils"
import {useConfigStore} from "~/stores/configStore"
import {MAXIMUM_YEAR, MINIMUM_YEAR, VCALENDAR_MONDAY, VCALENDAR_SATURDAY, VCALENDAR_SUNDAY} from "~/model/constants"

const colorMode = useColorMode()
const appConfig = useAppConfig()

// Responsive
const {mapCurrent} = useScreens({xs: "0px", sm: "640px", md: "768px", lg: "1024px"})
const columns = mapCurrent({lg: 4, md: 3, sm: 2, xs: 1}, 1)
const rows = mapCurrent({xs: 1}, 2)

const isDark = computed(() => {
  return colorMode.value !== "light"
})

const attributes = ref<AttributeConfig[]>([{}])
const {holidays} = storeToRefs(useHolidayExportStore())
const {federalState, selectedWeekday, selectedTeacher, period} = storeToRefs(useConfigStore())

const minPage: PageAddress = {
  year: MINIMUM_YEAR,
  month: 1,
}

const maxPage: PageAddress = {
  year: MAXIMUM_YEAR,
  month: 1,
}

const disabledDates: DateRangeSource[] = [{
  repeat: {
    weekdays: [VCALENDAR_SATURDAY, VCALENDAR_SUNDAY],
  },
}]

onMounted(() => {
  exportAllAttributes()
})

watch([federalState, selectedWeekday, selectedTeacher, period], () => {
  attributes.value = []
  exportAllAttributes()
})

function addCustomHolidays() {
  if (holidays.value.length > 0) {
    const customHolidays = getCustomHolidays(holidays.value)
    for (const holiday of customHolidays) {
      attributes.value.push(holiday)
    }
  }
}

function addNormalHolidays() {
  for (let i = MINIMUM_YEAR; i < MAXIMUM_YEAR; i++) {
    const allHolidays = getNormalHolidays(i, "de")
    for (const holiday of allHolidays) {
      attributes.value.push(holiday)
    }
  }
}

function addSemesterHolidays() {
  const semesterHolidays = getSemesterHolidays(federalState.value)
  attributes.value.push(semesterHolidays)
}

function addSummerHolidays() {
  for (let i = MINIMUM_YEAR; i < MAXIMUM_YEAR; i++) {
    attributes.value.push(getSummerHolidays(federalState.value, i))
  }
}

function addChristmasHolidays() {
  for (let i = MINIMUM_YEAR; i < MAXIMUM_YEAR; i++) {
    attributes.value.push(getChristmasHolidays(i))
  }
}

function exportAllAttributes() {
  addCustomHolidays()
  addSemesterHolidays()
  addSummerHolidays()
  addChristmasHolidays()
  addNormalHolidays()
}
</script>

<template>
  <div class="flex flex-wrap justify-center mt-6">
    <VCalendar
      :first-day-of-week="VCALENDAR_MONDAY"
      show-iso-weeknumbers
      :is-dark="isDark"
      :disabled-dates="disabledDates"
      :color="appConfig.ui.primary"
      :min-page="minPage"
      :max-page="maxPage"
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