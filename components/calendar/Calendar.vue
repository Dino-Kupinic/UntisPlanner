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
const {federalState, selectedWeekday, selectedTeacher, selectedYear, period} = storeToRefs(useConfigStore())

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

watch([federalState, selectedWeekday, selectedTeacher, selectedYear, period], () => {
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
  date.setHours(0, 0, 0, 0)
  start.setHours(0, 0, 0, 0)
  end.setHours(0, 0, 0, 0)

  return date >= start && date <= end
}

function getStartAndEndDates(year: number) {
  const LAST_YEAR = year - 1
  const summerHolidaysBegin: AttributeConfig = getSummerHolidays(federalState.value, LAST_YEAR)
  const summerHolidaysEnd: AttributeConfig = getSummerHolidays(federalState.value, year)
  // @ts-ignore
  const startDate = summerHolidaysBegin.dates[0].end
  // @ts-ignore
  const endDate = summerHolidaysEnd.dates[0].start
  return {startDate, endDate}
}

type periodTeacher = {
  period: number,
  teacher: string
}

function checkPeriod(dayPeriod: number, teacher: string): periodTeacher {
  if (dayPeriod < period.value) {
    dayPeriod++
  } else {
    dayPeriod = 1
    teacher = selectedTeacher.value[(selectedTeacher.value.indexOf(teacher) + 1) % selectedTeacher.value.length]
  }
  return {period: dayPeriod, teacher: teacher}
}

function pushTeachingUnit(date: Date, teacher: string) {
  attributes.value.push({
    key: teacher,
    highlight: "gray",
    dates: [{
      start: date,
      end: date,
    }],
    customData: {
      teacher: teacher
    },
    popover: {
      label: teacher,
      visibility: "hover",
    },
  })
}

function markTeachingPeriods(year: number = MINIMUM_YEAR) {
  if (teachers.value.length === 0 || selectedTeacher.value.length < 2 || selectedWeekday.value.length === 0)
    return

  const {startDate, endDate} = getStartAndEndDates(year)
  const daysToCheck: Date[] = []

  let week: number = getWeek(startDate)
  let mondayPeriod: number, tuesdayPeriod: number, wednesdayPeriod: number, thursdayPeriod: number, fridayPeriod: number = 0
  let mondayTeacher: string, tuesdayTeacher: string, wednesdayTeacher: string, thursdayTeacher: string, fridayTeacher: string
      = selectedTeacher.value[0]

  findDaysToCheck(startDate, endDate, daysToCheck)

  const FIRST_YEAR_WEEK = 1
  const LAST_YEAR_WEEK = 52

  daysToCheck.forEach((date) => {
    // check for new year
    if (getWeek(date) === FIRST_YEAR_WEEK && week === LAST_YEAR_WEEK) week = 1

    if (getWeek(date) > week) {
      week = getWeek(date)
    }

    const holidayOnTeachingDay = attributes.value.find((attribute) => {
      // @ts-ignore
      const start = attribute.dates[0].start
      // @ts-ignore
      const end = attribute.dates[0].end
      return areDatesInRange(date, start, end)
    })

    if (holidayOnTeachingDay) {
      return
    }

    if (getWeek(date) > week - 1) {
      switch (date.getDay()) {
        case 1:
          const mondayObject = checkPeriod(mondayPeriod, mondayTeacher)
            mondayPeriod = mondayObject.period
            mondayTeacher = mondayObject.teacher
          pushTeachingUnit(date, mondayTeacher)
          break
        case 2:
          const tuesdayObject = checkPeriod(tuesdayPeriod, tuesdayTeacher)
            tuesdayPeriod = tuesdayObject.period
            tuesdayTeacher = tuesdayObject.teacher
          pushTeachingUnit(date, tuesdayTeacher)
          break
        case 3:
          const wednesdayObject = checkPeriod(wednesdayPeriod, wednesdayTeacher)
            wednesdayPeriod = wednesdayObject.period
            wednesdayTeacher = wednesdayObject.teacher
          pushTeachingUnit(date, wednesdayTeacher)
          break
        case 4:
          const thursdayObject = checkPeriod(thursdayPeriod, thursdayTeacher)
            thursdayPeriod = thursdayObject.period
            thursdayTeacher = thursdayObject.teacher
          pushTeachingUnit(date, thursdayTeacher)
          break
        case 5:
          const fridayObject = checkPeriod(fridayPeriod, fridayTeacher)
            fridayPeriod = fridayObject.period
            fridayTeacher = fridayObject.teacher
          pushTeachingUnit(date, fridayTeacher)
          break
      }
    }
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
  markTeachingPeriods(selectedYear.value)
}

const emit = defineEmits<{
  change: [attributes: AttributeConfig[]]
}>()

watch(attributes, () => {
  emit("change", attributes.value)
})
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
