<script setup lang="ts">

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
  "Saturday",
  "Sunday",
])

const teachers = ref<string[]>([
  "SAMC",
  "STOW",
  "WITT",
])

const selectedWeekday = ref([])
const selectedFederalState = ref()
const selectedTeacher = ref()

const query = ref<string>("")

</script>

<template>
  <div
    class="m-auto flex flex-wrap justify-evenly items-center w-[260px] sm:w-[1034px] md:w-3/4 lg:w-[1034px] sm:h-auto sm:min-h-28 dark:bg-gray-900 border h-[400px] mt-5 p-3 rounded-lg border-neutral-300 dark:border-gray-700"
  >
    <div class="ml-2 mr-2 mt-2 sm:mt-0 w-full sm:w-48">
      <p>Federal State</p>
      <USelectMenu class="sm:w-auto w-full mt-1" v-model="selectedFederalState" :options="federalStates"
                   placeholder="Select federal state"/>
    </div>
    <div class="ml-2 mr-2 mt-2 sm:mt-0 w-full sm:w-24">
      <p>Period</p>
      <UInput class="mt-1 sm:w-auto w-full" placeholder="1"></UInput>
    </div>
    <div class="ml-2 mr-2 mt-2 sm:mt-0 w-full sm:w-48">
      <p>Lession-Days</p>
      <USelectMenu class="sm:w-auto w-full mt-1" v-model="selectedWeekday" :options="weekdays" multiple
                   placeholder="Select Days">
        <template #label>
          <span v-if="selectedWeekday.length" class="truncate">{{ selectedWeekday.join(", ") }}</span>
        </template>
      </USelectMenu>
    </div>
    <div class="ml-2 mr-2 mt-2 sm:mt-0 w-full sm:w-auto">
      <p>Teacher</p>
      <USelectMenu class="sm:w-auto w-full mt-1"
                   v-model="selectedTeacher"
                   v-model:query="query"
                   :options="teachers"
                   placeholder="Select teacher"
                   searchable
      />
    </div>
  </div>
</template>