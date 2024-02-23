<script setup lang="ts">
const {teachers} = storeToRefs(useTeacherStore())

// TODO: Add i18n
const columns = [{
  key: "name",
  label: "Name",
}, {
  key: "actions",
}]

function remove(row: string) {
  const index = teachers.value.indexOf(row)
  teachers.value.splice(index, 1)
}

const viewTeachers = computed(() => {
  const temp = []
  for (const teacher of teachers.value) {
    temp.push({name: teacher})
  }
  return temp
})

</script>

<template>
  <UTable :rows="viewTeachers" :columns="columns">
    <template #actions-data="{row}">
      <UButton @click="remove(row)" variant="ghost" icon="i-heroicons-trash"/>
    </template>
  </UTable>
</template>
