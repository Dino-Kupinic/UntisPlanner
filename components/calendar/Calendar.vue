<script setup lang="ts">
import {useScreens} from "vue-screen-utils"
import {useHolidayExportStore} from "~/stores/holidayExportStore"

import type {AttributeConfig} from "v-calendar/src/utils/attribute"
import type {DateRangeSource} from "v-calendar/src/utils/date/range"

type DateList = {
  name: string,
  dates?: {
    start: Date,
    end: Date
  }[],
  startDate?: Date,
  endDate?: Date,
  repeat?: boolean
}

const {mapCurrent} = useScreens({xs: "0px", sm: "640px", md: "768px", lg: "1024px"})
const columns = mapCurrent({lg: 4, md: 3, sm: 2, xs: 1}, 1)
const rows = mapCurrent({xs: 1}, 2)
const date = ref(new Date())
const colorMode = useColorMode()

const attrs = ref<AttributeConfig[]>([])
// const attrs = ref([{}])
const holidayColor = "red"
const customHolidayStore = useHolidayExportStore()

const staticHolidays = ref([
  {name: "Semester Holidays", start: new Date(0, 2, 12), end: new Date(0, 2, 18)},
  {name: "Summer Holidays", start: new Date(0, 6, 29), end: new Date(0, 9, 2)},
  {name: "Autumn Holidays", start: new Date(0, 10, 27), end: new Date(0, 10, 31)},
  {name: "Christmas Holidays", start: new Date(0, 12, 24), end: new Date(0, 1, 6)},
])

const federalStateHolidays = ref(
  [
    "Burgenland",
    "Oberösterreich",
    "Niederösterreich",
    "Salzburg",
    "Tirol",
    "Vorarlberg",
    "Wien",
    "Steiermark",
    "Kärnten",
  ])

const durationInWeeks = 5
const weekday = 2

onMounted(() => {
  addHolidaysToList()
  setWeekendMarked()
  addFederalStateHolidays()
  addEasterRelatedHolidays()
  addCustomHolidays()

  markTeachingLessons(weekday, durationInWeeks)
})

function addCustomHolidays():void {
  if (customHolidayStore.holidays.length != 0){
    customHolidayStore.holidays.forEach((item) =>{
      const temp : DateList = {
        name: item.name,
        dates: [{
          start: new Date(item.start),
          end: new Date(item.end)
        }],
      }
      pushAttributes(temp)
    })
  }
}

function pushAttributes(dateList: DateList) {
  /**
   * If startDate and endDate is the same, the enddate has to be +1 day because otherwise it doesn't work
   */

  dateList.startDate?.getDate() == dateList.endDate?.getDate() ?
    dateList.endDate = new Date(0, <number>dateList.startDate?.getMonth(), <number>dateList.startDate?.getDate() + 1) :
    dateList.endDate = dateList.startDate

  if (dateList.repeat) {
    attrs.value.push({
      key: dateList.name,
      highlight: {
        fillMode: "light",
        style: {
          background: holidayColor,
        },
      },
      popover: {
        label: dateList.name,
        visibility: "hover",
      },
      dates: [
        {
          start: dateList.startDate,
          end: dateList.endDate,
          repeat: {
            every: [12, "months"],
            days: dateList.startDate?.getDate(),
          },
        },
      ],
    })
  } else {
    attrs.value.push({
      key: dateList.name,
      highlight: {
        fillMode: "light",
        style: {
          background: holidayColor,
        },
      },
      popover: {
        label: dateList.name,
        visibility: "hover",
      },
      dates: dateList.dates,
    })
  }
}


function addFederalStateHolidays() {
  federalStateHolidays.value.forEach((nationalHoliday) => {
    pushAttributes({
      name: nationalHoliday, startDate: new Date(0, 10, 26),
      endDate: new Date(0, 10, 26),
      repeat: true,
    })
  })
}


function setWeekendMarked() {
  const weekendAttributes: AttributeConfig = {
    key: "Weekend",
    highlight: {
      fillMode: "light",
      style: {
        background: "transparent",
        border: "2px solid darkgreen",
      },
    },
    popover: {
      label: "Weekend",
      visibility: "hover",
    },
    dates: [
      {
        repeat: {
          every: "week",
          on: {weekdays: [7, 1]}, // Saturday & Sunday
        },
      },
    ],
  }

  attrs.value.push(weekendAttributes)
}

function addHolidaysToList() {
  staticHolidays.value.forEach((holiday) => {
    attrs.value.push({
      key: holiday.name,
      highlight: {
        fillMode: "light",
        style: {
          background: holidayColor,
          color: "black",
        },
      },
      popover: {
        label: holiday.name,
        visibility: "hover",
      },
      dates: [
        {
          start: new Date(new Date().getFullYear(), holiday.start.getMonth() - 1, holiday.start.getDate()),
          end: new Date(new Date().getFullYear(), holiday.end.getMonth() - 1, holiday.end.getDate() + 1),
          repeat: {
            every: [12, "months"],
            days: holiday.start.getDate(),
          },
        },
      ],
    } as AttributeConfig)
  })
}

function markTeachingLessons(weekday: number, durationInWeeks: number) {
  /*
  * Here is the start- and end-date for the function defined,
  * in this case static for the school year 2023.
  * This can easily be changed to dynamic (start- and end-date as parameters to function)
  */
  const start = new Date(2024, 1 - 1, 18)
  const end = new Date(2024, 7 - 1, 31)

  let teachingUnitValid: boolean

  /*
  * Here is the declaration of the day that gets checked.
  * The algorithm will be further explained by more comments but can be roughly explained with:
  * A loop runs through each day of the calendar from start- to end-date.
  * Since it only needs to check dates with the specified weekday this is the first thing it checks.
  * If the dayToCheck is not the correct weekday it skips all the following calculations.
  *
  * If the dayToCheck has the correct weekday it runs through the given calendar and checks all dates.
  * Since the given calendar only contains dates where there can not be a teaching unit it does not have to
  * check for a specific type of date, just if a date is registered in the calendar.
  *
  * If the calendar has an entry on the same date where there should be a teaching unit it does not put the
  * teaching unit into the calendar and skips a week in the count to match the "lost" week.
  *
  * When the function is finished all teaching units should be put into the calendar with the right weekly rhythm.
  * */
  let dayToCheck = new Date(start)

  /* Here starts the loop that checks each day from start- to end-date */
  while (dayToCheck <= end) {
    /* Check if dayToCheck is the correct weekday */
    if (dayToCheck.getDay() === weekday) {
      /* Calendar gets run through for each entry */
      attrs.value.forEach((elem: AttributeConfig) => {
        const dateArrayFromDates = elem.dates

        /* The start- and end-date for each holiday get extracted from .dates array */
        dateArrayFromDates.forEach((dateRangeFromDates: DateRangeSource) => {
          teachingUnitValid = true

          let holidayStart = dateRangeFromDates.start
          let holidayEnd = dateRangeFromDates.end

          /* If the dayToCheck is in the range of this holiday it goes further into the checks */
          if (holidayStart <= dayToCheck <= holidayEnd) {

            /* Since the holidays get put into the calendar in a start-end form it runs through this range */
            while (holidayStart <= holidayEnd) {
              /* Checks if calendar already has entry for date from dayToCheck */
              if (holidayStart.getDay() === weekday) {
                teachingUnitValid = false
                }

              /* Go on one day in the holiday check */
              let oneDayAfter = holidayStart.setDate(holidayStart.getDate() + 1)
              holidayStart = new Date(oneDayAfter)
            }
          }
        })
        // if (teachingUnitValid) {
          attrs.value.push({
            key: "Unterrichtseinheit",
            highlight: {
              fillMode: "light",
              style: {
                background: "red",
                color: "black",
              },
            },
            popover: {
              label: "SEW - Mit Samegmüller",
              visibility: "hover",
            },
            dates: [
              dayToCheck,
            ]
          } as AttributeConfig)
        // }
      })
    }
    /* Go on one day in the dayToCheck */
    let oneDayAfter = dayToCheck.setDate(dayToCheck.getDate() + 1)
    dayToCheck = new Date(oneDayAfter)
  }
}

function calculateEasterSundayByYears(years: number) {
  const easterSundays: Date[] = []
  let currentYear = new Date().getFullYear() - 1

  for (let year = currentYear; year < currentYear + years; year++) {
    easterSundays.push(calculateEasterSunday(year))
  }

  return easterSundays
}

function calculatePentecostSundays(easterSundays: Date[]) {
  const pentecostSundays: Date[] = []

  easterSundays.forEach((date) => {
    pentecostSundays.push(calculatePentecost(date.getFullYear(), date.getMonth(), date.getDate()))
  })

  return pentecostSundays
}

function addEasterRelatedHolidays() {

  const easterSundays: Date[] = calculateEasterSundayByYears(5)

  const pentecostSundays: Date[] = calculatePentecostSundays(easterSundays)

  const pentecostHolidays = calculatePentecostHolidays(pentecostSundays)

  pushAttributes({name: "Pentecost", dates: pentecostHolidays})
}

function calculatePentecostHolidays(pentecostSundays: Date[]): { start: Date, end: Date }[] {
  const holidays: { start: Date, end: Date }[] = []

  pentecostSundays.forEach((sunday) => {
    let pentecostMonday = new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate() + 1)
    let pentecostSaturday = new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate() - 1)

    holidays.push({
      start: pentecostSaturday,
      end: pentecostMonday,
    })

    calculateCorpusChristi(pentecostMonday)
    calculateAscensionofChrist(pentecostMonday)
  })
  return holidays

}

function calculateEasterHolidays(easterMonday: Date) {

  pushAttributes({
      name: "Easter Holidays",
      dates: [{
        start: new Date(easterMonday.getFullYear(), easterMonday.getMonth(), easterMonday.getDate()),
        end: new Date(easterMonday.getFullYear(), easterMonday.getMonth(), easterMonday.getDate() + 9),
      }],
    },
  )
}

function calculateAscensionofChrist(pentecostMonday: Date) {
  pushAttributes({
    name: "Ascension of Christ",
    dates: [
      {
        start: new Date(pentecostMonday.getFullYear(), pentecostMonday.getMonth(), pentecostMonday.getDate() - 11),
        end: new Date(pentecostMonday.getFullYear(), pentecostMonday.getMonth(), pentecostMonday.getDate() - 8),
      },
    ],

  })
}

function calculateCorpusChristi(pentecostMonday: Date) {
  pushAttributes({
    name: "Corpus Christi",
    dates: [
      {
        start: new Date(pentecostMonday.getFullYear(), pentecostMonday.getMonth(), pentecostMonday.getDate() + 10),
        end: new Date(pentecostMonday.getFullYear(), pentecostMonday.getMonth(), pentecostMonday.getDate() + 13),
      },
    ],
  })


}

function calculateEasterSunday(year: number) {
  let c = Math.floor(year / 100)
  let n = year - 19 * Math.floor(year / 19)
  let k = Math.floor((c - 17) / 25)
  let i = c - Math.floor(c / 4) - Math.floor((c - k) / 3) + 19 * n + 15
  i = i - 30 * Math.floor((i / 30))
  i = i - Math.floor(i / 28) * (1 - Math.floor(i / 28) * Math.floor(29 / (i + 1)) * Math.floor((21 - n) / 11))
  let j = year + Math.floor(year / 4) + i + 2 - c + Math.floor(c / 4)
  j = j - 7 * Math.floor(j / 7)
  let l = i - j
  let month = 3 + Math.floor((l + 40) / 44)
  let day = l + 28 - 31 * Math.floor(month / 4)

  month -= 1

  calculateEasterHolidays(new Date(year, padout(month), padout(day + 1)))


  return new Date(year, padout(month), padout(day))

}

function calculatePentecost(year: number, month: number, day: number) {

  month += 1

  let pday: number
  let pmonth: number

  if (month == 3) {
    pday = day - 12
    pmonth = 5
  } else if (month == 4 && day < 13) {
    pday = day + 19
    pmonth = 5
  } else {
    pday = day - 12
    pmonth = 6
  }

  return new Date(year, pmonth - 1, pday)
}

function padout(number: number) {
  return (number < 10) ? parseInt("0" + number) : parseInt("" + number)
}


const isDark = computed(() => {
  return colorMode.value !== "light"
})
</script>

<template>
  <div class="flex flex-wrap justify-center mt-6">
    <ClientOnly fallback-tag="span" fallback="Loading Calendar...">
      <!-- @vue-ignore TODO: Fix type issues with attributes -->
      <VCalendar
        show-weeknumbers
        v-model="date"
        :attributes="attrs"
        :is-dark="isDark"
        :columns="columns"
        :rows="rows"
        id="calendar"
      ></VCalendar>
    </ClientOnly>
  </div>
</template>

<style>
.vc-bg-blue {
  background-color: rgba(42, 42, 42, 0.15);
}

.vc-bg-blue-600 {
  background-color: rgba(42, 42, 42, 0.9);
}
</style>