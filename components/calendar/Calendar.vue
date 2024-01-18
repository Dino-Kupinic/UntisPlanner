<script setup lang="ts">
import {useScreens} from "vue-screen-utils"

const {mapCurrent} = useScreens({xs: "0px", sm: "640px", md: "768px", lg: "1024px"})
const columns = mapCurrent({lg: 6}, 1)
const date = ref(new Date())
const colorMode = useColorMode()
const attrs = ref([{}])

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

})

function setWeekendMarked() {
  const weekendAttributes = {
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
    })
  })
}



const isDark = computed(() => {
  return colorMode.value !== "light"
})
</script>

<template>
  <div class="flex flex-wrap justify-center mt-2">
    <ClientOnly fallback-tag="span" fallback="Loading Calendar...">
      <!-- @vue-ignore TODO: Fix type issues with attributes -->
      <VCalendar
        show-weeknumbers
        v-model="date"
        :attributes="attrs"
        :is-dark="isDark"
        :columns="columns"
        :rows="3"
        id="calendar"
      ></VCalendar>
    </ClientOnly>
  </div>
</template>