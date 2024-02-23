<script setup lang="ts">
import {useConfigStore} from "~/stores/configStore"
import type {LegendHoliday} from "~/model/holiday"
import {DEFAULT_STATE, MAXIMUM_YEAR, MINIMUM_PERIOD, MINIMUM_YEAR} from "~/model/constants"

const federalStates = ref<string[]>([
  "Vienna",
  "Carinthia",
  "Styria",
  "Upper Austria",
  "Lower Austria",
  "Burgenland",
  "Tyrol",
  "Vorarlberg",
  "Salzburg",
])

const weekdays = ref<string[]>([
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
])

const years = ref<number[]>([])

for (let year = MINIMUM_YEAR + 1; year <= MAXIMUM_YEAR; year++) {
  years.value.push(year)
}

const legendItems = ref<LegendHoliday[]>([
  {name: "Autumn Holidays", color: {name: "Teal", value: "#14b8a6"}},
  {name: "Christmas Holidays", color: {name: "Indigo", value: "#3730a3"}},
  {name: "Easter Holidays", color: {name: "Pink", value: "#ec4899"}},
  {name: "Normal Holidays", color: {name: "Red", value: "#ef4444"}},
  {name: "Semester Holidays", color: {name: "Blue", value: "#3b82f6"}},
  {name: "Summer Holidays", color: {name: "Yellow", value: "#eab308"}},
  {name: "Custom Holidays", color: {name: "Orange", value: "#ea580c"}},
  {name: "Teaching Period", color: {name: "Gray", value: "#6b7280"}},
])

const {federalState, selectedWeekday, selectedTeacher, selectedYear, period} = storeToRefs(useConfigStore())
const {teachers} = storeToRefs(useTeacherStore())
const sliceArray: number[] = [0, 3, 6]
const MAX_ITEMS: number = 3

function resetConfig() {
  selectedWeekday.value = []
  selectedTeacher.value = []
  period.value = MINIMUM_PERIOD
  federalState.value = DEFAULT_STATE
}
</script>

<template>
  <div
    class="m-auto flex flex-col w-[260px] sm:w-[520px] md:w-[775px] lg:w-[1034px] sm:h-auto sm:min-h-28 dark:bg-gray-900 border h-auto mt-5 p-3 rounded-lg border-neutral-300 dark:border-gray-700"
  >
    <p class="text font-bold p-2 pt-0">Generation Options</p>
    <div class="flex flex-row justify-between gap-3 items-center flex-wrap">
      <GeneratorItem :label="$t('GeneratorFederalStateLabel')">
        <USelectMenu class="sm:w-auto w-full mt-1" v-model="federalState" :options="federalStates"
                     :placeholder="$t('GeneratorFederalStatePlaceholder')"/>
      </GeneratorItem>
      <GeneratorItem :label="$t('GeneratorPeriodLabel')">
        <UInput class="mt-1 sm:w-auto w-full" type="number" v-model="period" min="2"/>
      </GeneratorItem>
      <GeneratorItem :label="$t('GeneratorLessonDaysLabel')">
        <USelectMenu class="sm:w-auto w-full mt-1" v-model="selectedWeekday" :options="weekdays" multiple
                     :placeholder="$t('GeneratorLessonDaysPlaceholder')">
          <template #label>
            <span v-if="selectedWeekday.length" class="truncate">{{ selectedWeekday.join(", ") }}</span>
          </template>
        </USelectMenu>
      </GeneratorItem>
      <GeneratorItem :label="$t('GeneratorTeacherLabel')">
        <USelectMenu class="sm:w-auto w-full mt-1"
                     v-model="selectedTeacher"
                     :options="teachers"
                     :placeholder="$t('GeneratorTeacherPlaceholder')"
                     multiple
        >
          <template #empty>
            <div class="flex flex-col">
              <p class="text pl-2.5">No teachers</p>
              <NuxtLink to="/settings">
                <UButton variant="link" label="Settings" size="sm">
                  <template #trailing>
                    <UIcon class="w-4 h-4" name="i-octicon-arrow-up-right-24"/>
                  </template>
                </UButton>
              </NuxtLink>
            </div>
          </template>
        </USelectMenu>
      </GeneratorItem>
      <GeneratorItem :label="$t('GeneratorYearLabel')" :badge="$t('BadgeNEW')">
        <USelectMenu class="sm:w-auto w-full mt-1" v-model="selectedYear" :options="years"
                     :placeholder="$t('GeneratorYearPlaceholder')">
        </USelectMenu>
      </GeneratorItem>
    </div>
    <div class="p-2 sm:m-auto">
      <UButton class="w-full mt-2  justify-center sm:w-auto" color="red" variant="outline" size="sm"
               label="Reset Configuration" @click="resetConfig()"/>
    </div>
  </div>
  <div
    class="m-auto flex flex-col w-[260px] sm:w-[520px] md:w-[775px] lg:w-[1034px] sm:h-auto sm:min-h-28 dark:bg-gray-900 border h-auto mt-5 p-3 rounded-lg border-neutral-300 dark:border-gray-700">
    <!--    <p class="text font-bold p-2 pt-0">Legend</p>-->
    <div class="flex flex-row items-center p-2 pt-0">
      <p class="text font-bold mr-2">Legend</p>
      <UBadge size="xs">{{ $t("BadgeNEW") }}</UBadge>
    </div>
    <div class="flex flex-row flex-wrap pl-1 sm:gap-12 content-start">
      <div v-for="(sliceStart, index) in sliceArray" :key="index">
        <LegendItem :legendItems="legendItems.slice(sliceStart, sliceStart + MAX_ITEMS)"/>
      </div>
    </div>
  </div>
</template>