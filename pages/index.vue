<script setup lang="ts">
import type {AttributeConfig} from "v-calendar/dist/types/src/utils/attribute.d.ts"
import type {Teacher} from "~/model/teacher"
import {getWeek, nextMonday, previousSunday} from "date-fns"

const isLoading = ref<boolean>(false)
const showTable = ref<boolean>(false)

const attributes = ref<AttributeConfig[]>([])
const {selectedTeacher} = storeToRefs(useConfigStore())
const result = ref<Teacher[]>([])

async function calculate(): Promise<Teacher[]> {
  return new Promise((resolve) => {
    const output: Teacher[] = []

    for (const [idx, teacher] of selectedTeacher.value.entries()) {
      const teacherInterrupts = []

      teacherInterrupts.push({name: teacher, interFrom: "", interTo: ""})

      const interruptionsFROM: string[] = []

      const lessonDays = attributes.value.filter((attr: AttributeConfig) => {
        return attr.customData && attr.customData.teacher
      })

      for (let i = 0; i < lessonDays.length; i++) {
        const currentAttribute = lessonDays[i]
        const nextAttribute = lessonDays[i + 1]

        if (!nextAttribute)
          continue

        // @ts-ignore
        const date: Date = currentAttribute.dates[0].start
        // @ts-ignore
        const nextDate: Date = nextAttribute.dates[0].start

        if (currentAttribute.customData.teacher !== nextAttribute.customData.teacher) {
          const monday = nextMonday(date)

          interruptionsFROM.push(formatDateString(monday))
          teacherInterrupts.forEach((teacher) => {
            if (teacher.name === currentAttribute.customData.teacher) {
              teacher.interFrom += "," + formatDateString(monday)
            }
          })
        }

        if (currentAttribute.customData.teacher != nextAttribute.customData.teacher) {
          let previousSundayDate = previousSunday(nextDate)
          teacherInterrupts.forEach((teacher) => {
            if (teacher.name === nextAttribute.customData.teacher) {
              teacher.interTo += "," + formatDateString(previousSundayDate)
            }
          })
        }
      }

      teacherInterrupts.forEach((teacher) => {
        output.push({
          id: idx + 1,
          user: teacher.name,
          from: teacher.interFrom + ",",
          to: teacher.interTo + ",",
        } as Teacher)
      })

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
    setTimeout(async () => {
      result.value = await calculate()
      isLoading.value = false
      showTable.value = true
    }, 750)
  } catch (error) {
    console.error("Error in calculate:", error)
  }
}

const skeletonRows = computed(() => {
  // TODO: fix
  return result.value.length || 4
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