<script setup lang="ts">
import {format} from "date-fns"
import type {ExportHoliday, ViewHoliday} from "~/model/holiday"

const prop = defineProps<{
  holiday: ExportHoliday[]
}>()

const viewHoliday = ref<ViewHoliday[]>([])
watch(prop.holiday, () => {
  viewHoliday.value = []
  prop.holiday.forEach((item) => {
    const temp: ViewHoliday = {
      name: item.name,
      start: format(item.start, "dd.MM.yyyy"),
      end: format(item.end, "dd.MM.yyyy"),
    }
    viewHoliday.value.push(temp)
  })
})

</script>

<template>
  <UTable :rows="viewHoliday"/>
</template>
