<script setup lang="ts">

const federalStates = ref([
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

const weekdays = ref([
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
])

const teachers = ref([
  "SAMC",
  "SCHH",
  "WOLF",
  "RATG",
])

const selectedWeekday = ref([])
const selectedFederalState = ref()
const selectedTeacher = ref()

const query = ref('SAM')

</script>

<template>
  <div
      class="flex flex-wrap place-content-center justify-center w-100 dark:bg-gray-900 border-b border-neutral-300 dark:border-gray-800 h-24">
    <div class="ml-2 mr-2">
      <p>Federal State</p>
      <USelectMenu class="w-[20rem] mt-1" v-model="selectedFederalState" :options="federalStates"
                   placeholder="Select federal state"/>
    </div>
    <div class="ml-2 mr-2">
      <p>Period</p>
      <UInput class="mt-1" placeholder="1"></UInput>
    </div>
    <div class="ml-2 mr-2">
      <p>Lession-Days</p>
      <USelectMenu class="w-[20rem] mt-1" v-model="selectedWeekday" :options="weekdays" multiple
                   placeholder="Select Days">
        <template #label>
          <span v-if="selectedWeekday.length" class="truncate">{{ selectedWeekday.join(', ') }}</span>
        </template>
      </USelectMenu>
    </div>
    <div class="ml-2 mr-2">
      <p>Teacher</p>
      <USelectMenu class="w-40 mt-1" v-model="selectedTeacher" v-model:query="query" :options="teachers"
                   placeholder="Select teacher" searchable></USelectMenu>
    </div>
  </div>
</template>