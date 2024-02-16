<script setup lang="ts">
import {useScreens} from "vue-screen-utils"
import type {AttributeConfig, PopoverConfig} from "v-calendar/dist/types/src/utils/attribute.d.ts"
import type {DateRangeSource} from "v-calendar/dist/types/src/utils/date/range.d.ts"
import {useConfigStore} from "~/stores/configStore"
import {storeToRefs} from "pinia"


const {mapCurrent} = useScreens({xs: "0px", sm: "640px", md: "768px", lg: "1024px"})
const columns = mapCurrent({lg: 4, md: 3, sm: 2, xs: 1}, 1)
const rows = mapCurrent({xs: 1}, 2)
const date = ref(new Date())
const colorMode = useColorMode()
const isDark = computed(() => { return colorMode.value !== "light" })
const attrs = ref<AttributeConfig[]>([{}])
const appConfig = useAppConfig()

const holidayColor = "red"
const customHolidayStore = useHolidayExportStore()
const configStore = useConfigStore()
const {federalState} = storeToRefs(useConfigStore())

const popOverVisibility = "hover"
const customHolidayColor = "blue"
const disabledDates : DateRangeSource[] = [{
  repeat:{
    weekdays: [7,1]
  }
}]

const federalStateHolidays =
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
    ]

const testData: AttributeConfig = {
  key: "SAMC",
  highlight: "red",
  dates: [{
    start: new Date(),
    span: 40,
  }],
  popover: {
    label: "SAMC",
    visibility: "hover",
  },
}

onMounted(() => {
  exportAllAttributes()
})

watch(federalState, () => {
  attrs.value = []
  exportAllAttributes()
})

function addCustomHolidays(): AttributeConfig[] | undefined {
  if (customHolidayStore.holidays.length != 0) {
    const returnArray: AttributeConfig[] = [{}]
    customHolidayStore.holidays.forEach((item) => {
      const temp: AttributeConfig = {
        key: item.name,
        highlight: customHolidayColor,
        dates: [{
          start: new Date(item.start),
          end: new Date(item.end),
        }],
        popover: getPopOver(item.name),
      }
      returnArray.push(temp)
    })
    return returnArray
  }
  return undefined
}

function addFederalStateHoliday() : AttributeConfig {
  const nationalHoliday: AttributeConfig = {
    key: 'nationalHoliday',
    highlight: holidayColor,
    dates: [{
      repeat: {
        every: [12, "months"],
        on: dayParts => dayParts.day == 26 && dayParts.month == 10
      }
    }
    ],
    popover: getPopOver("National holiday")
  }
  return nationalHoliday
}

function addSemesterHoliday() : AttributeConfig {
  const holidayStart = null
  const holidayEnd = null

  switch (federalState.value){
    case "Vienna":
    case "Lower Austria":

  }

  const temp : AttributeConfig = {
    key: "Semester holiday",
    highlight: holidayColor

  }
}

function padout(number: number) {
  return (number < 10) ? parseInt("0" + number) : parseInt("" + number)
}

//Getter
function getPopOver(label: string) {
  const temp: Partial<PopoverConfig> = {
    label: label,
    visibility: popOverVisibility,
  }
  return temp
}

function exportAllAttributes() {
  attrs.value.push(testData)
  addCustomHolidays()?.forEach((value) => attrs.value.push(value))
  attrs.value.push(addFederalStateHoliday())
}
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
          :disabled-dates="disabledDates"
          :color="appConfig.ui.primary"
          id="calendar"
      ></VCalendar>
    </ClientOnly>
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