<script setup lang="ts">
import {useScreens} from "vue-screen-utils"
import type {AttributeConfig} from "v-calendar/src/utils/attribute"
import type {DateRangeSource} from "v-calendar/src/utils/date/range";

const {mapCurrent} = useScreens({xs: "0px", sm: "640px", md: "768px", lg: "1024px"})
const columns = mapCurrent({lg: 4}, 1)
const date = ref(new Date())
const colorMode = useColorMode()

const attrs = ref<AttributeConfig[]>([])

const holidays = ref([
  {name: "Semester Holidays", start: new Date(0, 2, 12), end: new Date(0, 2, 18)},
  {name: "Easter Holidays", start: new Date(0, 3, 23), end: new Date(0, 4, 1)},
  {name: "Pentecost", start: new Date(0, 5, 18), end: new Date(0, 5, 20)},
  {name: "Summer Holidays", start: new Date(0, 6, 29), end: new Date(0, 9, 2)},
  {name: "Autumn", start: new Date(0, 10, 28), end: new Date(0, 10, 31)},
  {name: "Christmas Holidays", start: new Date(0, 12, 24), end: new Date(0, 1, 6)},
])

onMounted(() => {
  addHolidaysToList()
  setWeekendMarked()

  const durationInWeeks = 5
  const weekday = 2

  markTeachingLessons(weekday, durationInWeeks)
})

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
  holidays.value.forEach((holiday) => {
    attrs.value.push({
      key: holiday.name,
      highlight: {
        fillMode: "light",
        style: {
          background: "seagreen",
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
  const start = new Date(2023, 9 - 1, 11)
  const end = new Date(2024, 7 - 1, 15)

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
    let running = true

    /* Check if dayToCheck is the correct weekday */
    if (dayToCheck.getDay() === weekday) {

      /* Calendar gets run through for each entry */
      attrs.value.forEach((elem: AttributeConfig) => {
        let teachingUnitValid = true
        const dateArrayFromDates = elem.dates

        /* The start- and end-date for each holiday get extracted from .dates array */
        dateArrayFromDates.forEach((dateRangeFromDates: DateRangeSource) => {
          let holidayStart = dateRangeFromDates.start
          let holidayEnd = dateRangeFromDates.end

          /* If the dayToCheck is in the range of this holiday it goes further into the checks */
          if (holidayStart <= dayToCheck <= holidayEnd) {

            /* Since the holidays get put into the calendar in a start-end form it runs through this range */
            while (holidayStart <= holidayEnd && running) {

              /* Checks if calendar already has entry for date from dayToCheck */
              if (holidayStart.getDay() === weekday) {
                teachingUnitValid = false
                /* Stops the loop early if a teaching unit has been put in to increase efficiency */
                running = false
              }

              /* Go on one day in the holiday check */
              let oneDayAfter = holidayStart.setDate(holidayStart.getDate() + 1)
              holidayStart = new Date(oneDayAfter)
            }
            if (teachingUnitValid) {
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
                ],
              } as AttributeConfig)
            }
          }
        })
      })
    }

    /* Go on one day in the dayToCheck */
    let oneDayAfter = dayToCheck.setDate(dayToCheck.getDate() + 1)
    dayToCheck = new Date(oneDayAfter)
  }
}


const isDark = computed(() => {
  return colorMode.value !== "light"
})
</script>

<template>
  <div class="flex flex-wrap justify-center mt-6">
    <ClientOnly fallback-tag="span" fallback="Loading Calendar...">
      <!--@vue-ignore-->
      <VCalendar
        show-weeknumbers
        v-model="date"
        :attributes="attrs"
        :is-dark="isDark"
        :columns="columns"
        :rows="2"
        id="calendar"
      ></VCalendar>
    </ClientOnly>
  </div>
</template>