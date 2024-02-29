<script setup lang="ts">
import {useTeacherGroupStore} from "~/stores/teacherGroupStore"

const {teacherGroups} = storeToRefs(useTeacherGroupStore())

// TODO: Add i18n
const columns = [{
  key: "name",
  label: "Name",
}, {
  key: "actions",
}]

function remove(row: string) {
  const index = teacherGroups.value.indexOf(row)
  teacherGroups.value.splice(index, 1)
}

const viewTeacherGroups = computed(() => {
  const temp = []
  for (const teacherGroup of teacherGroups.value) {
    temp.push({name: teacherGroup})
  }
  return temp
})

</script>

<template>
  <UTable :rows="viewTeacherGroups" :columns="columns">
    <template #actions-data="{row}">
      <UButton @click="remove(row)" variant="ghost" icon="i-heroicons-trash"/>
    </template>
  </UTable>
</template>
