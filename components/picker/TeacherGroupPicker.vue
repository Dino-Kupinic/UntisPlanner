<script setup lang="ts">
import type {FormError, FormSubmitEvent} from "#ui/types"
import {useTeacherGroupStore} from "~/stores/teacherGroupStore"

const teacherGroup = reactive({
  name: "",
})

const MIN_TEACHERS = 2
const showErrorModal = ref<boolean>(false)
const {teacherGroups} = storeToRefs(useTeacherGroupStore())

async function onSubmit() {
  teacherGroups.value.push(teacherGroup.name)
  teacherGroup.name = ""
}

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) errors.push({path: "name", message: "Required"})
  return errors
}
</script>

<template>
  <p class="text-xl my-3"> {{ $t("addTeacherGroupTitle") }}</p>
  <UModal v-model="showErrorModal">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <p class="text-base font-semibold text-red-600 leading-6 dark:text-white">
            {{ $t("addTeacherGroupErrorTitle") }}
          </p>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                   @click="showErrorModal = false"/>
        </div>
      </template>
      {{ $t("addTeacherGroupErrorBody") }}
    </UCard>
  </UModal>
  <UForm :state="teacherGroup" :validate="validate" @submit="onSubmit" class="mb-5">
    <UFormGroup label="Name" name="name">
      <UInput v-model="teacherGroup.name" size="sm" color="primary" variant="outline" :placeholder="$t('teacherPlaceholder')"/>
    </UFormGroup>
    <UButton class="mt-3 w-full sm:w-24 justify-center" type="submit">{{ $t("submitTeacherGroup") }}</UButton>
  </UForm>
  <TeacherTable class="mt-3"/>
</template>