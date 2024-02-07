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
    class="m-auto flex flex-wrap place-content-center justify-center w-3/4 sm:w-5/12 sm:h-auto sm:min-h-28 dark:bg-gray-900 border h-1/3 mt-5 p-3 rounded-lg border-neutral-300 dark:border-gray-700"
  >
    <div class="ml-2 mr-2 ">
      <p>Federal State</p>
      <USelectMenu class="w-[15rem] mt-1" v-model="selectedFederalState" :options="federalStates"
                   placeholder="Select federal state"/>
    </div>
    <div class="ml-2 mr-2 mt-2 sm:mt-0">
      <p>Period</p>
      <UInput class="mt-1 w-[15rem]" placeholder="1"></UInput>
    </div>
    <div class="ml-2 mr-2 mt-2  sm:mt-0">
      <p>Lession-Days</p>
      <USelectMenu class="w-[15rem] mt-1" v-model="selectedWeekday" :options="weekdays" multiple
                   placeholder="Select Days">
        <template #label>
          <span v-if="selectedWeekday.length" class="truncate">{{ selectedWeekday.join(", ") }}</span>
        </template>
      </USelectMenu>
    </div>
    <div class="ml-2 mr-2 mt-2 sm:mt-0">
      <p>Teacher</p>
      <USelectMenu class="w-[15rem] mt-1"
                   v-model="selectedTeacher"
                   v-model:query="query"
                   :options="teachers"
                   placeholder="Select teacher"
                   searchable
      />
    </div>
  </div>
</template>