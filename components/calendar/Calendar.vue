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

const attributes = ref<AttributeConfig[]>([])
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
    const allHolidays = getNormalHolidays(i, "en")
    for (const holiday of allHolidays) {
      attributes.value.push(holiday)
    }
  }
}

function addSemesterHolidays() {
  const semesterHolidays = getSemesterHolidays(federalState.value)
  attributes.value.push(semesterHolidays)
}

function addHolidaysByYear(holidayFunction: (year: number) => AttributeConfig) {
  for (let year = MINIMUM_YEAR; year < MAXIMUM_YEAR; year++) {
    attributes.value.push(holidayFunction(year))
  }
}

function addSummerHolidays() {
  addHolidaysByYear((year) => getSummerHolidays(federalState.value, year))
}

function addChristmasHolidays() {
  addHolidaysByYear(getChristmasHolidays)
}

function addEasterHolidays() {
  addHolidaysByYear(getEasterHolidays)
}

function addAutumnHolidays() {
  addHolidaysByYear(getAutumnHolidays)
}

function findDaysToCheck(startDate: Date, endDate: Date, daysToCheck: Date[]) {
  while (startDate <= endDate) {
    if (selectedWeekday.value.includes(startDate.toLocaleDateString("en", {weekday: "long"}))) {
      daysToCheck.push(new Date(startDate))
    }
    startDate.setDate(startDate.getDate() + 1)
  }
}

function markTeachingPeriods(year: number = MINIMUM_YEAR) {
  const LAST_YEAR = year - 1
  const summerHolidaysBegin: AttributeConfig = getSummerHolidays(federalState.value, LAST_YEAR)
  const summerHolidaysEnd: AttributeConfig = getSummerHolidays(federalState.value, year)
  // @ts-ignore
  const startDate = summerHolidaysBegin.dates[0].end
  // @ts-ignore
  const endDate = summerHolidaysEnd.dates[0].start

  const daysToCheck: Date[] = []
  findDaysToCheck(startDate, endDate, daysToCheck)

  daysToCheck.forEach((date) => {
    const isOverlap = attributes.value.find((attribute) => {
      const existingDate = attribute.dates[0].start || attribute.dates[0].end
      // console.log(existingDate + " == " + date, areDatesOverlapping(existingDate, date))
      return areDatesOverlapping(existingDate, date)
    })

    if (isOverlap) {
      return
    }
    attributes.value.push({
      key: "teachingPeriod",
      highlight: "gray",
      dates: [{
        start: date,
        end: date,
      }],
      popover: {
        label: "teachingPeriod",
        visibility: "hover",
      },
    })
  })
}

function areDatesOverlapping(date1: Date, date2: Date): boolean {
  return (
    date1 == date2
  )
}


function exportAllAttributes() {
  addSemesterHolidays()
  addSummerHolidays()
  addEasterHolidays()
  addChristmasHolidays()
  addAutumnHolidays()
  addNormalHolidays()
  addCustomHolidays()
  markTeachingPeriods(2025)
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

