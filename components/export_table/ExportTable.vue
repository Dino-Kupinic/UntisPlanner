<script setup lang="ts">
import {useTableExportStore} from "~/stores/tableExportStore"

const {teachers} = storeToRefs(useTableExportStore())
const teacher = [
  {
    id: 1,
    user: "romo",
    from: "20230925,20231127,20240115,20240212,20240318,20240415,20240513,",
    to: "20231015,20231224,20240204,20240310,20240331,20240505,20240609,",
  },
  {
    id: 2,
    user: "heinz",
    from: "20230925,20231023,20231204,20240129,20240304,20240408,20240506,",
    to: "20231015,20231126,20240114,20240225,20240331,20240428,20240609,",
  },
  {
    id: 3,
    user: "ratp",
    from: "20230925,20231023,20231204,20240129,20240304,20240408,20240506,",
    to: "20231015,20231126,20240114,20240225,20240331,20240428,20240609,",
  },
  {
    id: 4,
    user: "prag",
    from: "20230925,20231023,20231204,20240129,20240304,20240408,20240506,",
    to: "20231015,20231126,20240114,20240225,20240331,20240428,20240609,",
  },
]

const selected = ref([teacher[0]])
watch(selected, () => {
  teachers.value = selected.value
})

const columns = [{
  key: "id",
  label: "Id",
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
  <div class="flex justify-around mr-3 ml-3">
    <UTable
      @select="select"
      v-model="selected"
      class=""
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
