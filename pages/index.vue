<script setup lang="ts">
import type {AttributeConfig} from "v-calendar/dist/types/src/utils/attribute.d.ts"
import type {Teacher} from "~/model/teacher"

const isLoading = ref<boolean>(false)
const showTable = ref<boolean>(false)

const attributes = ref<AttributeConfig[]>([])
const {teachers} = storeToRefs(useTeacherStore())
const {selectedTeacher} = storeToRefs(useConfigStore())
const result = ref<Teacher[]>([])

async function calculate(): Promise<Teacher[]> {
  return new Promise((resolve) => {
    const output: Teacher[] = []

    for (const teacher of selectedTeacher.value) {
      const firstOccurance = attributes.value.find((attr) => {
        return attr.customData && attr.customData.teacher === teacher;
      })
      console.log(firstOccurance)
    }
    // for (const [index, attribute] of attributes.value.entries()) {
    //   if (attribute.customData)
    //   output.push({
    //     id: index + 1,
    //     user: attribute.customData.teacher,
    //     from: ",20230925,20231127,20240115,20240212,20240318,20240415,20240513,",
    //     to: ",20230925,20231127,20240115,20240212,20240318,20240415,20240513,",
    //   } as Teacher)
    // }

    resolve(output)
  })
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
