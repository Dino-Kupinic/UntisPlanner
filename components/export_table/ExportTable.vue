<script setup lang="ts">
import {useTableExportStore} from "~/stores/tableExportStore"
import type {Teacher} from "~/model/teacher"

defineProps<{
  teacher: Teacher[]
}>()

const tableExportStore = useTableExportStore()
// const teacher = [
//   {
//     id: 1,
//     user: "romo",
//     from: ",20230925,20231127,20240115,20240212,20240318,20240415,20240513,",
//     to: "20231015,20231224,20240204,20240310,20240331,20240505,20240609,",
//   },
//   {
//     id: 2,
//     user: "heinz",
//     from: "20230925,20231023,20231204,20240129,20240304,20240408,20240506,",
//     to: "20231015,20231126,20240114,20240225,20240331,20240428,20240609,",
//   },
//   {
//     id: 3,
//     user: "ratp",
//     from: "20230925,20231023,20231204,20240129,20240304,20240408,20240506,",
//     to: "20231015,20231126,20240114,20240225,20240331,20240428,20240609,",
//   },
//   {
//     id: 4,
//     user: "prag",
//     from: "20230925,20231023,20231204,20240129,20240304,20240408,20240506,",
//     to: "20231015,20231126,20240114,20240225,20240331,20240428,20240609,",
//   },
// ]

const selected = ref<Teacher[]>([])

watch(selected.value, () => {
  tableExportStore.loadSelections(selected.value)
})

// TODO: add i18n
const columns = [{
  key: "id",
  label: "id",
}, {
  key: "user",
  label: "User",
}, {
  key: "from",
  label: "From",
  class: "w-1/2",
}, {
  key: "to",
  label: "To",
}]

function select(row: any) {
  const index = selected.value.findIndex((item) => item.id === row.id)
  if (index === -1) {
    selected.value.push(row)
  } else {
    selected.value.splice(index, 1)
  }
}

</script>

<template>
  <div class="m-auto flex flex-col w-full sm:w-[520px] md:w-[775px] lg:w-[1034px] sm:h-auto sm:min-h-28 dark:bg-gray-900 border h-auto p-1 sm:rounded-lg border-neutral-300 dark:border-gray-700">
    <UTable
      @select="select"
      v-model="selected"
      :rows="teacher"
      :columns="columns"
      :ui="{
          'td':{
            'width': '20%'
          }
        }"
    >
    </UTable>
  </div>
</template>
