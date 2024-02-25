<script setup lang="ts">
import type {AttributeConfig} from "v-calendar/dist/types/src/utils/attribute.d.ts"
import type {Teacher} from "~/model/teacher"
import {differenceInCalendarDays} from "date-fns"

const isLoading = ref<boolean>(false)
const showTable = ref<boolean>(false)

const attributes = ref<AttributeConfig[]>([])
const {teachers} = storeToRefs(useTeacherStore())
const {selectedTeacher} = storeToRefs(useConfigStore())
const result = ref<Teacher[]>([])

async function calculate(): Promise<Teacher[]> {
  return new Promise((resolve) => {
    const output: Teacher[] = []

    for (const [idx, teacher] of selectedTeacher.value.entries()) {
      /*
       * This approach goes through each teachers lesson days
       * Perhaps it might work if we go through all lesson days regardless
       */
      const lessonDays = attributes.value.filter((attr) => {
        return attr.customData && attr.customData.teacher === teacher
      })

      const interruptionsFROM: string[] = []
      const interruptionsTO: string[] = []

      if (lessonDays.length > 0) {
        for (let i = 0; i < lessonDays.length; i++) {
          // @ts-ignore
          const date: Date = lessonDays[i].dates[0].start || lessonDays[i + 1].dates[0].end
          // @ts-ignore
          const nextDate: Date | undefined = lessonDays[i + 1]?.dates[0]?.start

          if (!nextDate)
            continue

          if (differenceInCalendarDays(date, nextDate) !== -7) {
            /*
            This code is for when the day is not monday (no guarantee it works)
             */
            // const dayOfWeek = date.getDay()
            // if (dayOfWeek !== 1) {
            //   const daysToMonday = (dayOfWeek - 1 + 7) % 7
            //   const mondayDate = new Date(date)
            //   mondayDate.setDate(date.getDate() - daysToMonday)
            //   interruptionsFROM.push(formatDateString(daysToMonday))
            // }
            const newDate = new Date(date);
            newDate.setDate(date.getDate() + 7);
            interruptionsFROM.push(formatDateString(newDate))

            const previousSunday = new Date(nextDate);
            const daysToPreviousSunday = nextDate.getDay() === 0 ? 7 : nextDate.getDay();
            previousSunday.setDate(nextDate.getDate() - daysToPreviousSunday);
            interruptionsTO.push(formatDateString(previousSunday))
          }
        }
      }
      output.push({
        id: idx + 1,
        user: teacher,
        from: "," + interruptionsFROM.toString() + ",",
        to: "," + interruptionsTO.toString() + ",",
      } as Teacher)
    }
    resolve(output)
  })
}

function formatDateString(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}${month}${day}`
}

async function generate() {
  isLoading.value = true
  showTable.value = false
  try {
    result.value = await calculate()
    console.log(result.value)
    isLoading.value = false
    showTable.value = true
  } catch (error) {
    console.error("Error in calculate:", error)
  }
}

const skeletonRows = computed(() => {
  return result.value.length
})
</script>

<template>
  <main class="h-full pb-24">
    <!-- TODO: remove on v1.0.0 -->
    <UAlert
      class="m-auto w-[260px] sm:w-[520px] md:w-[775px] lg:w-[1034px] h-auto mt-5 p-3"
      icon="i-heroicons-exclamation-triangle-16-solid"
      color="red"
      variant="solid"
      description="UntisPlanner is still in Development. Until v1.0.0 you will find bugs and broken/unfinished features."
      title="Heads up!"
    />
    <GeneratorSettings/>
    <Calendar @change="(attr) => attributes = attr"/>
    <div class="flex justify-center p-5">
      <UButton :loading="isLoading" @click="generate()" icon="i-material-symbols-magic-button"
               :label="$t('GenerateButton')"/>
    </div>
    <div v-if="isLoading" class="flex flex-col justify-center mt-8">
      <ExportTableSkeleton :rows="skeletonRows"/>
    </div>
    <div v-if="showTable">
      <ExportTable :teacher="result"/>
      <ExportTableButton/>
    </div>
    <div v-else>
      <div class="h-36"/>
    </div>
  </main>
</template>
