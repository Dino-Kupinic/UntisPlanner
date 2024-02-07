<script setup lang="ts">
import {format} from "date-fns"
import type {ExportHoliday, ViewHoliday} from "~/model/holiday"
import {useHolidayExportStore} from "~/stores/holidayExportStore"

const {holidays} = storeToRefs(useHolidayExportStore())

const viewHoliday = ref<ViewHoliday[]>([])
watch(holidays.value, () => {
  viewHoliday.value = []
  holidays.value.forEach((item: ExportHoliday) => {
    try {
      // TODO: Fix this
      const temp: ViewHoliday = {
        name: item.name,
        start: format(item.start as string, "dd.MM.yyyy"),
        end: format(item.end as string, "dd.MM.yyyy"),
      };
      viewHoliday.value.push(temp);
    } catch (error) {
      console.error("Error formatting date:", error);
    }
  })
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

watch(viewHoliday, () => {
  console.log(viewHoliday.value)
})
</script>

<template>
  <UTable :rows="viewHoliday" :columns="columns">
    <template #actions-data="{row}">
      <UButton @click="remove(row)" variant="ghost" icon="i-heroicons-trash"/>
    </template>
  </UTable>
</template>
