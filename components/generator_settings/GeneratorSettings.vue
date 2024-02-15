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
    class="m-auto flex flex-wrap justify-evenly items-center w-[260px] sm:w-[520px] md:w-[775px] lg:w-[1034px] sm:h-auto sm:min-h-28 dark:bg-gray-900 border h-[400px] mt-5 p-3 rounded-lg border-neutral-300 dark:border-gray-700"
  >
    <GeneratorItem :label="$t('GeneratorFederalStateLabel')">
      <USelectMenu class="sm:w-auto w-full mt-1" v-model="selectedFederalState" :options="federalStates"
                   :placeholder="$t('GeneratorFederalStatePlaceholder')"/>
    </GeneratorItem>
    <GeneratorItem :label="$t('GeneratorPeriodLabel')">
      <UInput class="mt-1 sm:w-auto w-full" placeholder="1"></UInput>
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
                   v-model:query="query"
                   :options="teachers"
                   :placeholder="$t('GeneratorTeacherPlaceholder')"
                   searchable
      />
    </GeneratorItem>
  </div>
</template>