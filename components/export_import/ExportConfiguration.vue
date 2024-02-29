<script setup lang="ts">



import type {Configuration} from "~/model/configuration"

const {holidays} = storeToRefs(useHolidayExportStore())
const {teacherGroups} = storeToRefs(useTeacherGroupStore())
const {teachers} = storeToRefs(useTeacherStore())
const isHidden = ref<boolean>(true);

const configuration : Configuration = {
  teacher: [],
  teacherGroup: [],
  customHolidays: []
}

function exportToFile() {
  console.log("here")
  configuration.teacher = teachers.value
  configuration.teacherGroup = teacherGroups.value
  configuration.customHolidays = holidays.value
  download()
}

function importFromFile() {
  isHidden.value = !isHidden.value
}

function download() {
  const file = createFile(configuration)

  if (file != null) {
    const link = document.createElement("a")
    const url = URL.createObjectURL(file)

    link.href = url
    link.download = file.name
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }
}

function createFile(configuration: Configuration): File | null {
  const blob = new Blob([JSON.stringify(configuration, null, 2)], {
    type: "application/json",
  })
  console.log(blob)

  return new File([blob], "untisPlanner.json", {
    type: "application/json",
  })
}
</script>

<template>
  <div class="w-full flex max-sm:flex-col gap-2 justify-evenly items-center">
    <UButton class="w-full justify-center sm:w-24" @click="exportToFile">Export</UButton>

    <UButton class="w-full justify-center sm:w-24" @click="isHidden=!isHidden" v-if="isHidden">Import</UButton>


    <UInput v-if="!isHidden" type="file" name="Import" :ui="{icon: {trailing: {pointer: 'pointer-events-auto'}}}" >
      <template #trailing>
        <UButton @click="importFromFile" icon="i-material-symbols:check"/>
      </template>
    </UInput>
  </div>

</template>