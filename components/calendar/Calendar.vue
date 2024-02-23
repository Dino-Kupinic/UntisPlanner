<script setup lang="ts">
import type {AttributeConfig} from "v-calendar/dist/types/src/utils/attribute.d.ts"
import type {DateRangeSource} from "v-calendar/dist/types/src/utils/date/range.d.ts"
import type {PageAddress} from "v-calendar/dist/types/src/utils/page.d.ts"
import {useScreens} from "vue-screen-utils"
import {useConfigStore} from "~/stores/configStore"
import {MAXIMUM_YEAR, MINIMUM_YEAR, VCALENDAR_MONDAY, VCALENDAR_SATURDAY, VCALENDAR_SUNDAY} from "~/model/constants"
import {getWeek} from "date-fns"

const colorMode = useColorMode()
const appConfig = useAppConfig()

// Responsive
const {mapCurrent} = useScreens({xs: "0px", sm: "640px", md: "768px", lg: "1024px"})
const columns = mapCurrent({lg: 4, md: 3, sm: 2, xs: 1}, 1)
const rows = mapCurrent({xs: 2}, 3)

const isDark = computed(() => {
  return colorMode.value !== "light"
})

const attributes = ref<AttributeConfig[]>([])
const {holidays} = storeToRefs(useHolidayExportStore())
const {teachers} = storeToRefs(useTeacherStore())
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

function addHolidaysByYear(holidayFunction: (year: number) => AttributeConfig) {
  for (let year = MINIMUM_YEAR; year < MAXIMUM_YEAR; year++) {
    attributes.value.push(holidayFunction(year))
  }
}

function addSemesterHolidays() {
  addHolidaysByYear((year) => getSemesterHolidays(federalState.value, year))
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

function areDatesInRange(date: Date, start: Date, end: Date): boolean {
  date.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  return date >= start && date <= end;
}

function markTeachingPeriods(year: number = MINIMUM_YEAR) {
  if (teachers.value.length === 0 || selectedWeekday.value.length === 0)
    return

  const LAST_YEAR = year - 1
  const summerHolidaysBegin: AttributeConfig = getSummerHolidays(federalState.value, LAST_YEAR)
  const summerHolidaysEnd: AttributeConfig = getSummerHolidays(federalState.value, year)
  // @ts-ignore
  const startDate = summerHolidaysBegin.dates[0].end
  // @ts-ignore
  const endDate = summerHolidaysEnd.dates[0].start

  const daysToCheck: Date[] = []

  let week: number = getWeek(startDate)
  let ongoingPeriod: number = 0
  let currentTeacher: string = teachers.value[0]

  findDaysToCheck(startDate, endDate, daysToCheck)

  daysToCheck.forEach((date) => {
    // console.log("Fortlaufende Woche: " + week + " | Woche des Tages: " + getWeekNumber(date) + " | " + date)
    console.log("New Week | " + week + " | " + date)
    if (getWeek(date) === 1 && week === 52)
      week = 1
    if (getWeek(date) > week) {
      week = getWeek(date)
    }

    const holidayOnTeachingDay = attributes.value.find((attribute) => {
      // @ts-ignore
      const start = attribute.dates[0].start
      // @ts-ignore
      const end = attribute.dates[0].end
      return areDatesInRange(date, start, end);
    })

    if (holidayOnTeachingDay) {
      return
    }

    if (getWeek(date) > week - 1) {
      if (ongoingPeriod < 2) {
        ongoingPeriod++;
      } else {
        ongoingPeriod = 1
        currentTeacher = teachers.value[(teachers.value.indexOf(currentTeacher) + 1) % teachers.value.length]
      }
    }

    console.log(currentTeacher + " " + date);
    attributes.value.push({
      key: currentTeacher,
      highlight: "gray",
      dates: [{
        start: date,
        end: date,
      }],
      popover: {
        label: currentTeacher,
        visibility: "hover",
      },
    })
  })
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
