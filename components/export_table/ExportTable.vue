<script setup lang="ts">

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
]

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

const selected = ref([])
</script>

<template>
  <div class="flex justify-around mr-3 ml-3 rounded">
    <UTable
      v-model="selected"
      class=""
      :rows="teacher"
      :columns="columns"
      :ui="{
          'td':{
            'width': '20%'
          }
      }">
    </UTable>
  </div>
</template>
