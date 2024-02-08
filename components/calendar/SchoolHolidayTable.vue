<script setup lang="ts">
import {format} from "date-fns"
import type {ExportHoliday, ViewHoliday} from "~/model/holiday"
import {useHolidayExportStore} from "~/stores/holidayExportStore"

const {holidays} = storeToRefs(useHolidayExportStore())
const viewHoliday = ref<ViewHoliday[]>([])

onMounted(() => importData())
watch(holidays.value, () => {
  importData()
})

const columns = [{
  key: "name",
  label: "Name",
}, {
  key: "start",
  label: "Start",
}, {
  key: "end",
  label: "End",
}, {
  key: "actions",
}]

function remove(row: ViewHoliday) {
  const index = viewHoliday.value.indexOf(row)
  holidays.value.splice(index, 1)
}

function importData(): void {
  viewHoliday.value = []
  holidays.value.forEach((item: ExportHoliday) => {
    try {
      const temp: ViewHoliday = {
        name: item.name,
        start: format(new Date(item.start), "dd.MM.yyyy"),
        end: format(new Date(item.end), "dd.MM.yyyy"),
      }
      viewHoliday.value.push(temp)
    } catch (error) {
      console.error("Error formatting date:", error)
    }
  })
}
</script>

<template>
  <UTable :rows="viewHoliday" :columns="columns">
    <template #actions-data="{row}">
      <UButton @click="remove(row)" variant="ghost" icon="i-heroicons-trash"/>
    </template>
  </UTable>
</template>
